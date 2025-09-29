import express from "express";
import  { protect }  from "../middleware/authMiddleware.js";
import Group from "../models/group.js";
import User from "../models/user.js";

const router = express.Router();

// Create group
router.post("/", protect, async (req, res) => {
  try {
    const { name, goal } = req.body;
    if (!name) return res.status(400).json({ message: "Name required" });

    const group = await Group.create({
      name,
      owner: req.user._id,
      members: [{ user: req.user._id, savings: 0 }],
      goal: goal || 0,
      totalSavings: 0,
      invitations: [],
    });

    res.json(group);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error1" });
  }
});

// Get groups relevant to user
router.get("/", protect, async (req, res) => {
  try {
    const groups = await Group.find({
      $or: [
        { owner: req.user._id },
        { "members.user": req.user._id },
        { "invitations.user": req.user._id },
      ],
    })
      .populate("owner", "name email")
      .populate("members.user", "name email")
      .populate("invitations.user", "name email")
      .lean();

      // Add totalSavings field dynamically
    const updatedGroups = groups.map(group => ({
      ...group,
      totalSavings: group.members.reduce((sum, m) => sum + (m.savings || 0), 0)
    }));

    res.json(updatedGroups);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// Invite a user (owner only)
router.post("/:groupId/invite/:userId", protect, async (req, res) => {
  try {
    const { groupId, userId } = req.params;
    const group = await Group.findById(groupId);
    if (!group) return res.status(404).json({ message: "Group not found" });
    if (group.owner.toString() !== req.user._id.toString())
      return res.status(403).json({ message: "Not owner" });

    if (group.members.some((m) => m.user.toString() === userId))
      return res.status(400).json({ message: "Already member" });

    if (group.invitations.some((i) => i.user.toString() === userId && i.status === "pending"))
      return res.status(400).json({ message: "Already invited" });

    group.invitations.push({ user: userId, status: "pending" });
    await group.save();

    const invitedUser = await User.findById(userId).select("name email");

    // Emit socket event
    req.io.to(userId).emit("group-invitation", {
      groupId: group._id,
      groupName: group.name,
      invitedBy: { _id: req.user._id, name: req.user.name },
    });

    res.json({ message: "Invitation sent", invitedUser });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// Accept invitation
router.post("/:groupId/accept", protect, async (req, res) => {
  try {
    const { groupId } = req.params;
    const group = await Group.findById(groupId);
    if (!group) return res.status(404).json({ message: "Group not found" });

    const inv = group.invitations.find(
      (i) => i.user.toString() === req.user._id.toString() && i.status === "pending"
    );
    if (!inv) return res.status(400).json({ message: "No pending invite" });

    inv.status = "accepted";
    if (!group.members.some((m) => m.user.toString() === req.user._id.toString())) {
      group.members.push({ user: req.user._id, savings: 0 });
    }
    await group.save();

    req.io.to(group.owner.toString()).emit("invitation-accepted", {
      groupId: group._id,
      user: { _id: req.user._id, name: req.user.name },
    });

    res.json({ message: "Accepted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// Reject invitation
router.post("/:groupId/reject", protect, async (req, res) => {
  try {
    const { groupId } = req.params;
    const group = await Group.findById(groupId);
    if (!group) return res.status(404).json({ message: "Group not found" });

    const inv = group.invitations.find(
      (i) => i.user.toString() === req.user._id.toString() && i.status === "pending"
    );
    if (!inv) return res.status(400).json({ message: "No pending invite" });

    inv.status = "rejected";
    await group.save();

    req.io.to(group.owner.toString()).emit("invitation-rejected", {
      groupId: group._id,
      user: { _id: req.user._id, name: req.user.name },
    });

    res.json({ message: "Rejected" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// Search users
router.get("/search", async (req, res) => {
  try {
    const { q } = req.query;
    if (!q) return res.json([]);

    // Search by name or email (case-insensitive)
    const users = await User.find({
      $or: [
        { name: { $regex: q, $options: "i" } },
        { email: { $regex: q, $options: "i" } },
      ],
    }).select("_id name email"); // only return required fields

    res.json(users);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// Update group (owner only)
router.put("/:groupId", protect, async (req, res) => {
  try {
    const { groupId } = req.params;
    const { name, goal } = req.body;

    const group = await Group.findById(groupId);
    if (!group) return res.status(404).json({ message: "Group not found" });

    if (group.owner.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Only owner can update group" });
    }

    group.name = name || group.name;
    group.goal = goal ?? group.goal;

    await group.save();
    res.json(group);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// Delete group (owner only)
router.delete("/:groupId", protect, async (req, res) => {
  try {
    const { groupId } = req.params;

    const group = await Group.findById(groupId);
    if (!group) return res.status(404).json({ message: "Group not found" });

    if (group.owner.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Only owner can delete group" });
    }

    await group.deleteOne();
    res.json({ message: "Group deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// Add savings (any member can add their savings)
router.post("/:groupId/savings", protect, async (req, res) => {
  try {
    const { groupId } = req.params;
    const { amount } = req.body;

    if (!amount || amount <= 0) {
      return res.status(400).json({ message: "Invalid amount" });
    }

    const group = await Group.findById(groupId);
    if (!group) return res.status(404).json({ message: "Group not found" });

    // check if user is a member
    const member = group.members.find(
      (m) => m.user.toString() === req.user._id.toString()
    );
    if (!member) {
      return res.status(403).json({ message: "You are not a member of this group" });
    }

    // update member savings and group total
    member.savings += amount;
    group.totalSavings = group.members.reduce((sum, m) => sum + m.savings, 0);

    await group.save();

    res.json({ message: "Savings added", group });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});


// POST /api/v1/groups/:groupId/contribute
router.post("/:groupId/contribute", protect, async (req, res) => {
  const { groupId } = req.params;
  const { amount } = req.body;
  const userId = req.user.id;

  if (!amount || amount <= 0) return res.status(400).json({ message: "Invalid amount" });

  try {
    const group = await Group.findById(groupId);
    if (!group) return res.status(404).json({ message: "Group not found" });

    // Find member
    const memberIndex = group.members.findIndex(m => m.user.toString() === userId);
    if (memberIndex === -1) return res.status(403).json({ message: "You are not a member of this group" });

    // Initialize savings if undefined
    group.members[memberIndex].savings = group.members[memberIndex].savings || 0;

    // Add contribution
    group.members[memberIndex].savings += parseFloat(amount);

    // Optional: update totalSavings
    group.totalSavings = group.members.reduce((sum, m) => sum + (m.savings || 0), 0);

    // Mark array modified if needed
    group.markModified("members");

    await group.save();

    res.json({ message: "Contribution added successfully", group });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error adding contribution" });
  }
});





export default router;

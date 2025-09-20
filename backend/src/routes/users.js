import express from "express";
import Group from "../models/friends.js"; 
import User from "../models/user.js"; 


const router = express.Router();

// GET all groups
router.get("/", async (req, res) => {
  try {
    const groups = await Group.find()
      .populate("owner", "name email")
      .populate("members.user", "name email")
      .populate("invitations.user", "name email");

    const groupsWithSavings = groups.map(g => ({
      ...g.toObject(),
      totalSavings: g.members.reduce((sum, m) => sum + (m.savings || 0), 0)
    }));

    res.json(groupsWithSavings);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create a group
router.post("/", async (req, res) => {
  try {
    const { name, goal, ownerId } = req.body;
    const group = new Group({
      name,
      goal,
      owner: ownerId,
      members: [{ user: ownerId, savings: 0 }],
      invitations: []
    });
    await group.save();
    res.json(group);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Invite user
router.post("/:groupId/invite/:userId", async (req, res) => {
  try {
    const { groupId, userId } = req.params;
    const group = await Group.findById(groupId);
    if (!group) return res.status(404).json({ message: "Group not found" });

    if (group.invitations.find(inv => inv.user.toString() === userId))
      return res.status(400).json({ message: "User already invited" });

    group.invitations.push({ user: userId, status: "pending" });
    await group.save();
    res.json({ message: "Invitation sent" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Accept invitation
router.post("/:groupId/accept", async (req, res) => {
  try {
    const { groupId } = req.params;
    const { userId } = req.body;
    const group = await Group.findById(groupId);
    if (!group) return res.status(404).json({ message: "Group not found" });

    const invitation = group.invitations.find(
      inv => inv.user.toString() === userId && inv.status === "pending"
    );
    if (!invitation) return res.status(400).json({ message: "No pending invitation" });

    invitation.status = "accepted";
    group.members.push({ user: userId, savings: 0 });
    await group.save();
    res.json({ message: "Invitation accepted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Reject invitation
router.post("/:groupId/reject", async (req, res) => {
  try {
    const { groupId } = req.params;
    const { userId } = req.body;
    const group = await Group.findById(groupId);
    if (!group) return res.status(404).json({ message: "Group not found" });

    group.invitations = group.invitations.filter(
      inv => !(inv.user.toString() === userId && inv.status === "pending")
    );
    await group.save();
    res.json({ message: "Invitation rejected" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

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
{/*
// Contribute via Stripe
router.post("/:groupId/contribute", async (req, res) => {
  try {
    const { groupId } = req.params;
    const { userId, amount } = req.body;
    const group = await Group.findById(groupId);
    if (!group) return res.status(404).json({ message: "Group not found" });

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: { name: `Contribution to ${group.name}` },
            unit_amount: Math.round(amount * 100),
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${process.env.CLIENT_URL}/groups?success=true`,
      cancel_url: `${process.env.CLIENT_URL}/groups?cancel=true`,
    });

    res.json({ url: session.url });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});*/}

router.post("/:groupId/invite/:userId", async (req, res) => {
  console.log("Invite route hit", req.params);
  try {
    const { groupId, userId } = req.params;
    const group = await Group.findById(groupId);
    if (!group) return res.status(404).json({ message: "Group not found" });

    if (group.invitations.find(inv => inv.user.toString() === userId))
      return res.status(400).json({ message: "User already invited" });

    group.invitations.push({ user: userId, status: "pending" });
    await group.save();
    res.json({ message: "Invitation sent" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
});

export default router;

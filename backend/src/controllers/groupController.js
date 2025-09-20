import Group from "../models/group.js";

// GET /api/groups
export const getGroups = async (req, res) => {
  try {
    const groups = await Group.find({});
    res.json(groups);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};

// POST /api/groups
export const createGroup = async (req, res) => {
  const { name, goal } = req.body;
  try {
    const group = new Group({ name, goal, members: [], challenges: [] });
    await group.save();
    res.json(group);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};

// POST /api/groups/:groupId/member
export const addMember = async (req, res) => {
  const { groupId } = req.params;
  const { name, savings } = req.body;
  try {
    const group = await Group.findById(groupId);
    group.members.push({ name, savings });
    await group.save();
    res.json(group);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};

// POST /api/challenges/:challengeId/join
export const joinChallenge = async (req, res) => {
  const { challengeId } = req.params;
  try {
    const group = await Group.findOne({ "challenges._id": challengeId });
    if (!group) return res.status(404).json({ error: "Challenge not found" });

    const challenge = group.challenges.id(challengeId);
    challenge.progress = 0; // mark as joined (custom logic)
    await group.save();

    res.json(challenge);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};

// Update Group
export const updateGroup = async (req, res) => {
  try {
    const group = await Group.findByIdAndUpdate(
      req.params.groupId,
      { name: req.body.name, goal: req.body.goal },
      { new: true }
    );
    res.json(group);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete Group
export const deleteGroup = async (req, res) => {
  try {
    await Group.findByIdAndDelete(req.params.groupId);
    res.json({ message: "Group deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update Member
export const updateMember = async (req, res) => {
  try {
    const group = await Group.findById(req.params.groupId);
    const member = group.members.id(req.params.memberId);
    member.name = req.body.name;
    member.savings = req.body.savings;
    await group.save();
    res.json(group);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete Member
export const deleteMember = async (req, res) => {
  try {
    const group = await Group.findById(req.params.groupId);
    group.members.id(req.params.memberId).remove();
    await group.save();
    res.json(group);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

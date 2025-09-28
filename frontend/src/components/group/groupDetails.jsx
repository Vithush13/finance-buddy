import React, { useState } from "react";
import Modal from "../layouts/modal";
import axios from "axios";

export default function GroupDetailModal({
  group,
  user,
  onClose,
  onDelete,
  onEdit,
  onContribute,
  onAcceptInvite,
  onRejectInvite,
  inviteUser,
  fetchGroups,
}) {
  const [searchQuery, setSearchQuery] = useState("");
  const [contributionAmount, setContributionAmount] = useState("");

  if (!group) return null;

  const handleInvite = async () => {
    if (!searchQuery) return alert("Enter an email");

    try {
      const res = await axios.get(`/api/v1/users/search?q=${encodeURIComponent(searchQuery)}`);
        console.log("Search query:", searchQuery);
       console.log("API response:", res.data);
       const users = Array.isArray(res.data)
      ? res.data
      : res.data.user
      ? [res.data.user]
      : [];
const foundUser = users.find(u => u.email.toLowerCase() === searchQuery.toLowerCase());

      
      if (!foundUser?._id) return alert("User not found");

      const alreadyInvited = group.invitations?.some(
        (inv) => inv.user._id === foundUser._id
      );
      if (alreadyInvited) return alert("User already invited");
   
      await inviteUser(group._id, foundUser._id);
      setSearchQuery("");
      
    } catch (err) {
      console.error(err);
      alert("Error searching user or sending invite 2");
    }
  };

  const handleContribute = async () => {
    if (!contributionAmount || isNaN(contributionAmount) || contributionAmount <= 0)
      return alert("Enter a valid contribution amount");

    await onContribute(group._id, parseFloat(contributionAmount));
    setContributionAmount("");
    onClose();
  };

  const handleAccept = async () => {
    await onAcceptInvite(group._id);
    
    onClose();
    
  };

  const handleReject = async () => {
    await onRejectInvite(group._id);
    alert("Invitation rejected");
    
    onClose();
    
  };

  return (
    <Modal isOpen={!!group} onClose={onClose} title={group.name}>
      <div className="space-y-4">
        <p className="text-sm text-gray-600">Created: {new Date(group.createdAt).toLocaleDateString()}</p>
        <p className="text-sm">Goal: <b>{group.goal}</b></p>
        <p className="text-sm">Members: <b>{group.members?.length || 0}</b></p>
        <p className="text-sm">Total Saved: <b>Rs.{group.totalSavings || 0}</b></p>

        {/* Owner Actions */}
        {user?._id === group.owner?._id && (
          <div className="flex gap-2">
            <button
              className="flex-1 border border-gray-300 rounded-lg py-2 px-4 hover:bg-gray-100"
              onClick={() => onEdit(group._id, group.name, group.goal)}
            >
              Edit
            </button>
            <button
              className="flex-1 bg-red-500 hover:bg-red-600 text-white rounded-lg py-2 px-4"
              onClick={() => onDelete(group._id)}
            >
              Delete
            </button>
          </div>
        )}

        {/* Invite Users */}
        {user?._id === group.owner?._id && (
          <div>
            <h2 className="text-xl font-semibold mb-4 text-indigo-600">Invite User by Email</h2>
            <div className="flex mb-4">
              <input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Enter user email"
                className="flex-1 p-2 border rounded-lg mr-2"
              />
              <button
                onClick={handleInvite}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-700 transition"
              >
                Send Invite
              </button>
            </div>
          </div>
        )}

        {/* Contribution */}
        {group.members?.some((m) => m.user._id === user._id) && (
          <div className="mt-3 flex items-center space-x-2">
            <input
              type="number"
              placeholder="Add contribution"
              value={contributionAmount}
              onChange={(e) => setContributionAmount(e.target.value)}
              className="p-2 border rounded-lg flex-1"
            />
            <button
              onClick={handleContribute}
              className="px-3 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
            >
              Contribute
            </button>
          </div>
        )}

        {/* Accept/Reject Invitations */}
        {group.invitations?.some((inv) => inv.user?._id === user._id && inv.status === "pending") && (
          <div className="flex gap-2 mt-3">
            <button
              className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg"
              onClick={handleAccept}
            >
              Accept
            </button>
            <button
              className="flex-1 border border-gray-300 rounded-lg py-2 px-4 hover:bg-gray-100"
              onClick={handleReject}
            >
              Reject
            </button>
          </div>
        )}
      </div>
    </Modal>
  );
}


import React, { useEffect, useState, useContext } from "react";
import DashboardLayout from "../components/layouts/dashboardLayout";
import axios from "../utils/axios";
import { UserContext } from "../context/userContext";
import { API_PATHS } from "../utils/apiPath";
import useUserAuth from "../hooks/useUserAuth";
import GroupSavingOverview from "../components/group/groupOverView";
import Modal from "../components/layouts/modal";
import AddGroupForm from "../components/group/groupForm";
import GroupList from "../components/group/groupList";
import { LuUserPlus } from "react-icons/lu";

export default function Friends() {
  useUserAuth();
  const { user } = useContext(UserContext);
  const [groups, setGroups] = useState([]);
  const [openAddGroup, setOpenAddGroup] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedGroupId, setSelectedGroupId] = useState(null);
  const [contributionAmounts, setContributionAmounts] = useState({});

  const fetchGroups = async () => {
  try {
    const res = await axios.get(API_PATHS.GROUP.GET_ALL);
    // Optionally filter out groups where the user has rejected invitation
    const updatedGroups = res.data.filter(
      g => !g.invitations?.some(
        inv => inv.user?._id === user._id && inv.status === "rejected"
      )
    );
    setGroups(updatedGroups);
    if (!selectedGroupId && updatedGroups.length) setSelectedGroupId(updatedGroups[0]._id);
  } catch (err) {
    console.error("Error fetching groups:", err.response || err);
  }
};


  useEffect(() => {
    fetchGroups();
  }, []);

    const handleCreateGroup = async (group) => {
    try {
      await axios.post(API_PATHS.GROUP.CREATE, {
        ...group,
        goal: parseFloat(group.goal),
        ownerId: user._id,
      });
      fetchGroups();
      setOpenAddGroup(false);
    } catch (err) {
      alert(err.response?.data?.message || "Error creating group");
    }
  };

   const createGroup = async () => {
    const name = prompt("Group name?");
    const goalStr = prompt("Goal amount?");
    if (!name || !goalStr) return;
    try {
      await axios.post(API_PATHS.GROUP.CREATE, {
        name,
        goal: parseFloat(goalStr),
        ownerId: user._id,
      });
      fetchGroups();
    } catch (err) {
      alert(err.response?.data?.message || "Error creating group");
    }
  };
  const editGroup = async (groupId, currentName, currentGoal) => {
    const newName = prompt("Enter new group name:", currentName);
    const newGoal = prompt("Enter new goal amount:", currentGoal);
    if (!newName || !newGoal) return;
    try {
      await axios.put(`${API_PATHS.GROUP.UPDATE}/${groupId}`, {
        name: newName,
        goal: parseFloat(newGoal),
      });
      alert("Group updated successfully");
      fetchGroups();
    } catch (err) {
      alert(err.response?.data?.message || "Error updating group");
    }
  };

  const deleteGroup = async (groupId) => {
    if (!window.confirm("Are you sure you want to delete this group?")) return;
    try {
      await axios.delete(`${API_PATHS.GROUP.DELETE}/${groupId}`);
      alert("Group deleted successfully");
      fetchGroups();
    } catch (err) {
      alert(err.response?.data?.message || "Error deleting group");
    }
  };

  const inviteUser = async (groupId, userId) => {
    try {
      await axios.post(API_PATHS.GROUP.INVITE(groupId, userId));
      alert("Invitation sent");
      fetchGroups();
    } catch (err) {
      alert(err.response?.data?.message || "Error sending invite");
    }
  };

  const acceptInvite = async (groupId) => {
    try {
      await axios.post(API_PATHS.GROUP.ACCEPT(groupId));
      alert("Invitation accepted");
      fetchGroups();
    } catch (err) {
      alert(err.response?.data?.message || "Error accepting invite");
    }
  };

  const rejectInvite = async (groupId) => {
    try {
      await axios.post(API_PATHS.GROUP.REJECT(groupId));
      alert("Invitation rejected");
      fetchGroups();
    } catch (err) {
      alert(err.response?.data?.message || "Error rejecting invite");
    }
  };

  const contribute = async (groupId, amount) => {
    if (!amount || isNaN(amount) || amount <= 0) return alert("Enter a valid amount");
    try {
      await axios.post(API_PATHS.GROUP.CONTRIBUTE(groupId), { amount: parseFloat(amount) });
      alert("Contribution added successfully");
      setContributionAmounts({ ...contributionAmounts, [groupId]: "" });
      fetchGroups();
    } catch (err) {
      alert(err.response?.data?.message || "Error adding contribution");
    }
  };

  return (
    <DashboardLayout activeMenu="Friends">
       <div className="my-5 mx-auto">
              <div className="grid grid-cols-1 gap-6">
                <div className="">
                  <GroupSavingOverview  onAddGroup={() => setOpenAddGroup(true)} />
                  <div className="bg-white p-6 rounded-2xl shadow-md shadow-gray-100 border border-gray-200/50">
  <h2 className="text-lg font-semibold mb-2">
    {selectedGroupId
      ? <>
      Invite User to{" "}
      <span className="text-blue-500">
        "{groups.find(g => g._id === selectedGroupId)?.name}"
      </span>
    </>
      : "Invite User by Email"}
  </h2>

  <div className="flex mb-4">
    <input
      value={searchQuery}
      onChange={(e) => setSearchQuery(e.target.value)}
      placeholder="Enter email to invite"
      className="flex-1 p-2 border rounded-lg mr-2 mt-4"
    />
    <button
      onClick={async () => {
        if (!searchQuery) return alert("Enter an email");
        try {
          const res = await axios.get(
            `/api/v1/users/search?q=${encodeURIComponent(searchQuery)}`
          );
          const foundUser = res.data.find((u) => u.email === searchQuery);
          if (!foundUser) return alert("User not found");

          const group = groups.find((g) => g._id === selectedGroupId);
          if (!group) return alert("Select a group first");

          const alreadyInvited = group.invitations?.some(
            (inv) => inv.user._id === foundUser._id
          );
          if (alreadyInvited) return alert("User already invited");

          await inviteUser(selectedGroupId, foundUser._id);
          setSearchQuery("");
        } catch (err) {
          console.error(err);
          alert("Error searching user or sending invite");
        }
      }}
      className="flex items-center gap-3 text-[12px] font-medium text-gray-700 hover:text-blue-500 bg-gray-50 hover:bg-blue-50 px-4 py-2 rounded-lg border border-gray-200/50 cursor-pointer transition duration-200"
    >
      <LuUserPlus className="text-lg" />
      Send Invite
    </button>
  </div>
</div>
 
            <GroupList
              groups={groups}
              onDelete={deleteGroup}
              onEdit={editGroup}
              onContribute={contribute}
              inviteUser={inviteUser}
              onAcceptInvite={acceptInvite}
              onRejectInvite={rejectInvite}
              selectedGroupId={selectedGroupId}          // ✅ pass down
             setSelectedGroupId={setSelectedGroupId}
            />
             
                   
                </div>
              </div>
               <Modal isOpen={openAddGroup} onClose={()=> setOpenAddGroup(false)} title="Create Group">
                        <AddGroupForm onAddGroup={handleCreateGroup}/>
                      </Modal>
              
            </div>
      
      <div className="p-6 max-w-6xl mx-auto">
        
    

        <div className="grid md:grid-cols-2 gap-6">
          {/* Groups List */}
          <div>
            <h2 className="text-xl font-semibold mb-4 text-indigo-600">Your Groups / Invitations</h2>
            {groups.map((g) => (
              <div
                key={g._id}
                className={`p-4 border rounded-xl shadow-md mb-4 cursor-pointer transition transform hover:scale-105 ${
                  selectedGroupId === g._id ? "bg-indigo-100 border-blue-300" : "bg-white border-none"
                }`}
                onClick={() => setSelectedGroupId(g._id)}
              >
                <h3 className="text-lg font-bold text-gray-800">{g.name}</h3>
                <div className="text-sm text-gray-600">Owner: {g.owner?.name}</div>
                <div className="text-sm text-gray-600">Members: {g.members?.length || 0}</div>
                <div className="text-sm font-semibold text-gray-700">
                  Goal: Rs.{g.goal} | Saved: Rs.{g.totalSavings || 0}
                </div>

                {/* Edit/Delete (Owner Only) */}
                {user?._id === g.owner?._id && (
                  <div className="mt-3 flex space-x-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        editGroup(g._id, g.name, g.goal);
                      }}
                      className="px-3 py-1 bg-yellow-400 text-white rounded-lg hover:bg-yellow-500 transition"
                    >
                      Edit
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteGroup(g._id);
                      }}
                      className="px-3 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
                    >
                      Delete
                    </button>
                  </div>
                )}

                {/* Accept/Reject Invite */}
                {g.invitations?.some(
                  (inv) => inv.user._id === user?._id && inv.status === "pending"
                ) && (
                  <div className="mt-3 flex space-x-2">
                    <button
                      onClick={() => acceptInvite(g._id)}
                      className="px-3 py-1 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
                    >
                      Accept
                    </button>
                    <button
                      onClick={() => rejectInvite(g._id)}
                      className="px-3 py-1 bg-red-300 text-white rounded-lg hover:bg-red-400 transition"
                    >
                      Reject
                    </button>
                  </div>
                )}

                {/* Contribute for Members */}
                {g.members?.some((m) => m.user._id === user._id) && (
                  <div className="mt-3 flex items-center space-x-2">
                    <input
                      type="number"
                      placeholder="Add saving"
                      value={contributionAmounts[g._id] || ""}
                      onChange={(e) =>
                        setContributionAmounts({
                          ...contributionAmounts,
                          [g._id]: e.target.value,
                        })
                      }
                      className="p-2 border rounded-lg flex-1"
                    />
                    <button
                      onClick={() => contribute(g._id, contributionAmounts[g._id])}
                      className="px-3 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
                    >
                      Contribute
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>

          
        </div>
      </div> 
    </DashboardLayout>
  );
}

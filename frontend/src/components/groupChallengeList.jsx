import { useState } from "react";

export default function GroupLeaderboard() {
  // Initial groups with members (mock data)
  const [groups, setGroups] = useState([
    {
      id: 1,
      name: "Family Savings",
      members: [
        { id: 1, name: "Alice", savings: 120 },
        { id: 2, name: "Bob", savings: 95 },
        { id: 3, name: "You", savings: 80 },
      ],
      goal: 500,
    },
  ]);

  // State for new member inputs
  const [selectedGroupId, setSelectedGroupId] = useState(groups[0].id);
  const [newFriendName, setNewFriendName] = useState("");
  const [newFriendSavings, setNewFriendSavings] = useState("");

  // Add a new member dynamically to selected group
  const handleAddFriend = () => {
    if (!newFriendName || !newFriendSavings) return;

    setGroups((prevGroups) =>
      prevGroups.map((group) => {
        if (group.id === selectedGroupId) {
          const newMember = {
            id: group.members.length + 1,
            name: newFriendName,
            savings: parseFloat(newFriendSavings),
          };
          return { ...group, members: [...group.members, newMember] };
        }
        return group;
      })
    );

    // Reset input fields
    setNewFriendName("");
    setNewFriendSavings("");
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Finance-Buddy Groups</h2>

      {/* Group Selection */}
      <div className="mb-4">
        <label className="block mb-1 font-semibold">Select Group:</label>
        <select
          value={selectedGroupId}
          onChange={(e) => setSelectedGroupId(parseInt(e.target.value))}
          className="border px-3 py-1 rounded w-full"
        >
          {groups.map((group) => (
            <option key={group.id} value={group.id}>
              {group.name}
            </option>
          ))}
        </select>
      </div>

      {/* Add Friend */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2">Add Friend</h3>
        <div className="flex space-x-2">
          <input
            type="text"
            placeholder="Friend Name"
            value={newFriendName}
            onChange={(e) => setNewFriendName(e.target.value)}
            className="border rounded px-3 py-1 flex-1"
          />
          <input
            type="number"
            placeholder="Savings"
            value={newFriendSavings}
            onChange={(e) => setNewFriendSavings(e.target.value)}
            className="border rounded px-3 py-1 w-24"
          />
          <button
            onClick={handleAddFriend}
            className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
          >
            Add
          </button>
        </div>
      </div>

      {/* Groups and Leaderboards */}
      {groups.map((group) => {
        const totalSavings = group.members.reduce(
          (sum, member) => sum + member.savings,
          0
        );
        const progress = Math.min((totalSavings / group.goal) * 100, 100);

        return (
          <div key={group.id} className="mb-6">
            <h3 className="text-xl font-bold mb-2">{group.name}</h3>

            {/* Progress Bar */}
            <div className="bg-gray-200 rounded-full h-4 mb-2">
              <div
                className="bg-green-500 h-4 rounded-full"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
            <p className="text-gray-700 mb-2">
              Total Savings: ${totalSavings} / ${group.goal}
            </p>

            {/* Member Leaderboard */}
            <ul>
              {group.members
                .sort((a, b) => b.savings - a.savings)
                .map((member, index) => (
                  <li
                    key={member.id}
                    className={`flex justify-between py-2 px-3 rounded mb-1 ${
                      member.name === "You" ? "bg-green-100 font-semibold" : "hover:bg-gray-100"
                    }`}
                  >
                    <span>
                      {index + 1}. {member.name}
                    </span>
                    <span>${member.savings}</span>
                  </li>
                ))}
            </ul>
          </div>
        );
      })}
    </div>
  );
}

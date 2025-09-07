import { useState } from "react";

const initialFriends = [
  { id: 1, name: "Alice", savings: 120 },
  { id: 2, name: "Bob", savings: 95 },
  { id: 3, name: "You", savings: 80 },
];

export default function Leaderboard() {
  const [friends, setFriends] = useState(initialFriends);
  const [newFriendName, setNewFriendName] = useState("");
  const [newFriendSavings, setNewFriendSavings] = useState("");

  // Add a new friend
  const handleAddFriend = () => {
    if (!newFriendName || !newFriendSavings) return;

    const newFriend = {
      id: friends.length + 1,
      name: newFriendName,
      savings: parseFloat(newFriendSavings),
    };

    setFriends([...friends, newFriend]);
    setNewFriendName("");
    setNewFriendSavings("");
  };

  return (
    <div className="bg-white p-6 shadow-lg rounded-lg w-full max-w-md mx-auto">
      <h3 className="text-2xl font-bold mb-4 text-gray-800">Leaderboard</h3>

      {/* Friends List */}
      <ul>
        {friends
          .sort((a, b) => b.savings - a.savings)
          .map((friend, index) => (
            <li
              key={friend.id}
              className={`flex justify-between items-center py-3 px-4 rounded-lg mb-2
              ${friend.name === "You" ? "bg-green-100 font-semibold" : "hover:bg-gray-100"}`}
            >
              <div className="flex items-center space-x-3">
                <span
                  className={`w-6 h-6 flex items-center justify-center rounded-full text-white text-sm
                  ${index === 0 ? "bg-yellow-400" : index === 1 ? "bg-gray-400" : "bg-orange-400"}`}
                >
                  {index + 1}
                </span>
                <span>{friend.name}</span>
              </div>
              <span className="text-gray-700 font-medium">${friend.savings}</span>
            </li>
          ))}
      </ul>

      {/* Add Friend Form */}
      <div className="mt-6">
        <h4 className="text-lg font-semibold mb-2">Add a Friend</h4>
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
    </div>
  );
}

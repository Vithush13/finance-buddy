const mockFriends = [
  { id: 1, name: "Alice", savings: 120 },
  { id: 2, name: "Bob", savings: 95 },
  { id: 3, name: "You", savings: 80 },
];

export default function Leaderboard() {
  return (
    <div className="bg-white p-4 shadow rounded">
      <h3 className="text-lg font-bold mb-2">Leaderboard</h3>
      <ul>
        {mockFriends.map((friend) => (
          <li key={friend.id} className="flex justify-between py-2 border-b">
            <span>{friend.name}</span>
            <span>${friend.savings}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

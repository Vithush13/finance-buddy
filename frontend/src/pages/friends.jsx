
import Leaderboard from "../components/leaderboard";

import GroupLeaderboard from "../components/groupChallengeList";
export default function Friends() {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Friends & Leaderboards</h2>
      <GroupLeaderboard/>
      <Leaderboard/>
    </div>
  );
}

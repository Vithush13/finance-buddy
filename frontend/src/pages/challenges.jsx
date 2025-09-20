import { useEffect, useState, useContext } from "react";
import DashboardLayout from "../components/layouts/dashboardLayout";
import axiosInstance from "../utils/axios";
import { API_PATHS } from "../utils/apiPath";
import { FaMedal, FaUserFriends, FaFlag } from "react-icons/fa";
import { UserContext } from "../context/userContext";

export default function ChallengesPage() {
  const { user } = useContext(UserContext);
  const [groups, setGroups] = useState([]);
  const [selectedGroupId, setSelectedGroupId] = useState(null);

  const fetchGroups = async () => {
    try {
      const res = await axiosInstance.get(API_PATHS.GROUP.GET_ALL);
      setGroups(res.data);
      if (!selectedGroupId && res.data.length) setSelectedGroupId(res.data[0]._id);
    } catch (err) {
      console.error("Error fetching groups:", err);
    }
  };

  useEffect(() => {
    fetchGroups();
  }, []);

  const selectedGroup = groups.find((g) => g._id === selectedGroupId);

  const getTotalSavings = (group) => {
    return group?.members?.reduce((sum, m) => sum + m.savings, 0) || 0;
  };

  const getProgressPercent = (group) => {
    if (!group || !group.goal || group.goal === 0) return 0;
    return Math.min((getTotalSavings(group) / group.goal) * 100, 100);
  };

  

  return (
    <DashboardLayout activeMenu="Challenges">
      <div className="max-w-4xl mx-auto p-6">
        <h2 className="text-3xl font-bold mb-6 text-blue-700 flex items-center space-x-3">
          <FaFlag className="text-blue-500" /> <span>Challenges</span>
        </h2>

        {/* Select Group */}
        <select
          value={selectedGroupId || ""}
          onChange={(e) => setSelectedGroupId(e.target.value)}
          className="border rounded px-3 py-2 mb-6 w-full bg-white shadow focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          {groups.map((g) => (
            <option key={g._id} value={g._id}>
              {g.name}
            </option>
          ))}
        </select>

        {/* Goal Progress */}
        {selectedGroup && (
          <div className="mb-6 p-4 bg-white rounded-lg shadow flex flex-col items-start">
            <h3 className="font-bold mb-2 text-lg flex items-center space-x-2 ">
              <FaMedal className="text-yellow-500 mr-2 text-2xl" /> Goal Progress
            </h3>
            <div className="w-full bg-blue-100 h-5 rounded-full overflow-hidden">
              <div
                className="bg-blue-500 h-5 text-white font-semibold flex items-center justify-center"
                style={{ width: `${getProgressPercent(selectedGroup)}%` }}
              >
                {Math.floor(getProgressPercent(selectedGroup))}%
              </div>
            </div>
            {getTotalSavings(selectedGroup) >= selectedGroup.goal ? (
              <p className="text-blue-800 font-bold mt-2">🎉 Goal Achieved!</p>
            ) : (
              <p className="text-blue-700 font-medium mt-2">
                Rs.{getTotalSavings(selectedGroup)} / Rs.{selectedGroup.goal}
              </p>
            )}
          </div>
        )}

        {/* Members Ranking */}
        {selectedGroup?.members?.length > 0 && (
          <div className="mb-6">
            <h3 className="font-bold mb-3 text-lg flex items-center space-x-2 ">
              <FaUserFriends className="text-blue-500 mr-3 text-2xl" /> Friends Ranking
            </h3>
            <ul>
              {selectedGroup.members
                .slice()
                .sort((a, b) => b.savings - a.savings)
                .map((member, index) => {
                  let rankColor = "text-gray-800";
                  if (index === 0) rankColor = "text-yellow-500";
                  else if (index === 1) rankColor = "text-gray-500";
                  else if (index === 2) rankColor = "text-amber-700";

                  const isYou = member.user?._id === user._id;

                  return (
                    <li
                      key={member._id}
                      className={`flex justify-between items-center py-3 px-4 mb-2 rounded-lg shadow-sm ${
                        isYou ? "bg-blue-50 font-semibold" : "bg-white hover:bg-blue-50"
                      }`}
                    >
                      <div className="flex flex-col">
                        <div className="flex items-center space-x-2 mb-1">
                          <span className={`font-bold ${rankColor}`}>{index + 1}</span>
                          <span>{member.user?.name || member.name}</span>
                          {isYou && <span className=" font-medium">(You)</span>}
                        </div>
                        <div className="text-sm text-blue-700">
                          Email: {member.user?.email || member.email}
                        </div>
                      </div>
                      <span className="font-semibold ">Rs.{member.savings}</span>
                    </li>
                  );
                })}
            </ul>
          </div>
        )}

       
      </div>
    </DashboardLayout>
  );
}

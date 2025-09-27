import React, { useContext, useState, useEffect } from "react";
import GroupInfoCard from "../card/groupCard";
import moment from "moment";
import { UserContext } from "../../context/userContext";
import GroupDetailModal from "./groupDetails";
import axios from "axios";
import { API_PATHS } from "../../utils/apiPath";
import { LuCheck, LuUsers, } from "react-icons/lu";
import {FaCheckCircle,FaArrowRight} from "react-icons/fa"
export default function GroupList({
  groups,
  onDelete,
  onEdit,
  onContribute,
  onAcceptInvite,
  onRejectInvite,
  inviteUser,
  selectedGroupId,
  setSelectedGroupId,
}) {
  const { user } = useContext(UserContext);
  const [openGroup, setOpenGroup] = useState(null);
  const [groupList, setGroupList] = useState(groups || []);

  useEffect(() => {
    setGroupList(groups);
  }, [groups]);

  return (
    <div className="bg-white p-6 rounded-2xl shadow-md shadow-gray-100 border border-gray-200/50 mt-4">
      <h5 className="text-lg font-medium mb-4">Group List</h5>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {groupList?.map((group) => {
          // Check if current user has a pending invitation
          const myInvite = group.invitations?.find(
            (inv) => inv.user?._id === user?._id
          );

          return (
            <div
              key={group._id}
              className={`p-2 rounded-xl border cursor-pointer transition 
                ${selectedGroupId === group._id 
                  ? "bg-indigo-100 border-blue-400" 
                  : "bg-white border-gray-200"}`}
            >
              <GroupInfoCard
                title={group.name}
                date={moment(group.createdAt).format("MMM D, YYYY")}
                goalAmount={group.goal}
                membersCount={group.members?.length || 0}
              />
               
              <div className="mt-3 flex space-x-2">
                {myInvite?.status === "pending" ? (
                  <>
                    <button
                      className="w-1/2 bg-green-500 hover:bg-green-600 text-white py-2 px-3 rounded-lg transition"
                      onClick={() => onAcceptInvite(group._id)}
                    >
                      Accept
                    </button>
                    <button
                      className="w-1/2 bg-red-500 hover:bg-red-600 text-white py-2 px-3 rounded-lg transition"
                      onClick={() => onRejectInvite(group._id)}
                    >
                      Reject
                    </button>
                  </>
                ) : (
                  <>
                   <button
                         className={`w-1/2 py-2 px-3 rounded-lg transition flex items-center justify-center gap-2
                        ${selectedGroupId === group._id 
                        ? "bg-green-500 text-white hover:bg-green-600" 
                          : "bg-gray-200 text-gray-700 hover:bg-gray-300"}`}
                         onClick={() => setSelectedGroupId(group._id)}>
  <FaCheckCircle className="text-lg" /> Select
</button>
                    <button
                      className="w-1/2 bg-blue-400 hover:bg-blue-600 text-gray-700 py-2 px-3 rounded-lg transition flex items-center justify-center gap-2 "
                      onClick={() => setOpenGroup(group)}
                    >
                     <FaArrowRight className="text-lg" />  Go to Group
                    </button>
                  </>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {openGroup && (
        <GroupDetailModal
          group={openGroup}
          user={user}
          onClose={() => setOpenGroup(null)}
          onDelete={onDelete}
          onEdit={onEdit}
          onContribute={onContribute}
          onAcceptInvite={onAcceptInvite}
          onRejectInvite={onRejectInvite}
          inviteUser={inviteUser}
          fetchGroups={async () => {
            try {
              const res = await axios.get(API_PATHS.GROUP.GET_ALL);
              setGroupList(res.data);
            } catch (err) {
              console.error("Error fetching groups:", err);
            }
          }}
        />
      )}
    </div>
  );
}

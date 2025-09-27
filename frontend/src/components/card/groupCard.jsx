import { LuTrash2, LuUsers, LuTarget, LuUserPlus, LuCheck, LuX } from "react-icons/lu";
import { useState } from "react";

export default function GroupInfoCard({ 
  title, 
  icon, 
  date, 
  goalAmount, 
  membersCount, 
  onDelete, 
  onEdit,
  onContribute,
  onInvite,
  onAcceptInvite,
  onRejectInvite,
  hideDeleteBtn
}) {
  const [amount, setAmount] = useState("");
  const [inviteEmail, setInviteEmail] = useState("");
 const [searchQuery, setSearchQuery] = useState("");
  const handleContribute = () => {
    if (onContribute) onContribute(amount);
    setAmount("");
  };

  const handleInvite = async () => {
    if (!inviteEmail) return alert("Enter a valid email");
    if (onInvite) await onInvite(inviteEmail);
    setInviteEmail("");
  };

  return (
    <div className="group relative flex flex-col gap-4 p-4 rounded-xl bg-white border border-gray-100 shadow-sm hover:shadow-md hover:scale-[1.04] transition-all duration-200 ease-in-out">
      
      {/* Header */}
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 flex items-center justify-center text-xl text-gray-800 bg-gray-100 rounded-full">
          {icon ? <img src={icon} alt={title} className="w-6 h-6" /> : <LuUsers />}
        </div>

        <div className="flex-1">
          <p className="text-sm text-gray-700 font-medium">{title}</p>
          <p className="text-xs text-gray-400 mt-1">Created {date}</p>
          <p className="text-xs text-gray-500 mt-1 flex items-center gap-1">
            <LuUsers size={14} /> {membersCount || 0} members
          </p>
        </div>

        <div className="flex items-center gap-2">
          {!hideDeleteBtn && (
            <button
              className="text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
              onClick={onDelete}
            >
              <LuTrash2 size={18} />
            </button>
          )}

          <div className="flex items-center gap-2 px-3 py-1.5 rounded-md bg-gradient-to-r from-blue-50 to-blue-100 text-blue-600">
            <h6 className="text-xs font-medium">Goal: Rs.{goalAmount}</h6>
            <LuTarget />
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex flex-col gap-2 mt-2">

        {/* Edit Button */}
        {onEdit && (
          <button
            className="text-sm text-white bg-green-500 px-3 py-1 rounded-md hover:bg-green-600"
            onClick={onEdit}
          >
            Edit Group
          </button>
        )}

        {/* Contribute */}
        {onContribute && (
          <div className="flex gap-2">
            <input
              type="number"
              placeholder="Amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="flex-1 px-2 py-1 border rounded-md"
            />
            <button
              className="px-3 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600"
              onClick={handleContribute}
            >
              Contribute
            </button>
          </div>
        )}

      {/* Invite Users (Owner Only) */}
{onInvite && (
  <div className="flex gap-2">
    <input
      type="email"
      placeholder="User email to invite"
      value={inviteEmail}
      onChange={(e) => setInviteEmail(e.target.value)}
      className="flex-1 px-2 py-1 border rounded-md"
    />
    <button
      className="px-3 py-1 bg-purple-500 text-white rounded-md hover:bg-purple-600 flex items-center gap-1"
      onClick={async ({handleInvite}) => {
        if (!inviteEmail) return alert("Enter a valid email");
        try {
          // Search user by email
          const res = await fetch(`/api/v1/users/search?q=${encodeURIComponent(inviteEmail)}`);
          const users = await res.json();
          const foundUser = users.find((u) => u.email === inviteEmail);
          if (!foundUser) return alert("User not found");

          await onInvite(foundUser._id); // pass userId
          setInviteEmail("");
        } catch (err) {
          console.error(err);
          alert("Error inviting user");
        }
      }}
    >
      <LuUserPlus /> Invite
    </button>
  </div>
)}

        
          
        {/* Accept/Reject Invitations */}
        <div className="flex gap-2">
          {onAcceptInvite && (
            <button
              className="px-3 py-1 bg-green-500 text-white rounded-md hover:bg-green-600 flex items-center gap-1"
              onClick={onAcceptInvite}
            >
              <LuCheck /> Accept
            </button>
          )}
          {onRejectInvite && (
            <button
              className="px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600 flex items-center gap-1"
              onClick={onRejectInvite}
            >
              <LuX /> Reject
            </button>
          )}
        </div>

      </div>
    </div>
  );
}

import { useState } from "react";
import Input from "../input/input";

export default function AddGroupForm({ onAddGroup }) {
  const [group, setGroup] = useState({
    name: "",
    goal: "",
  });

  const handleChange = (key, value) => setGroup({ ...group, [key]: value });

  const handleSubmit = () => {
    if (!group.name.trim()) {
      alert("Group name is required");
      return;
    }
    if (!group.goal || isNaN(group.goal) || Number(group.goal) <= 0) {
      alert("Goal amount must be a valid number");
      return;
    }
    onAddGroup(group);
  };

  return (
    <div>
      <Input
        value={group.name}
        onChange={({ target }) => handleChange("name", target.value)}
        label="Group Name"
        placeholder="Group Name"
        type="text"
      />

      <Input
        value={group.goal}
        onChange={({ target }) => handleChange("goal", target.value)}
        label="Goal Amount"
        placeholder="0"
        type="number"
      />

      <div className="flex justify-end mt-6">
        <button
          type="button"
          className="flex items-center gap-3 text-[12px] font-medium text-white bg-blue-500 hover:bg-blue-700 px-4 py-2 rounded-lg transition duration-200"
          onClick={handleSubmit}
        >
          Add Group
        </button>
      </div>
    </div>
  );
}

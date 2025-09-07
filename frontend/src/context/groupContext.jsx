import { createContext, useState, useEffect } from "react";

export const GroupContext = createContext();

export const GroupProvider = ({ children }) => {
  const [groups, setGroups] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/groups")
      .then((res) => res.json())
      .then((data) => setGroups(data));
  }, []);

  const updateSavings = (groupId, userId, newAmount) => {
    fetch(`http://localhost:5000/api/groups/${groupId}/update-savings`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId, savings: newAmount }),
    }).then(() => {
      setGroups((prev) =>
        prev.map((group) =>
          group._id === groupId
            ? {
                ...group,
                members: group.members.map((m) =>
                  m.userId === userId ? { ...m, savings: newAmount } : m
                ),
              }
            : group
        )
      );
    });
  };

  return (
    <GroupContext.Provider value={{ groups, setGroups, updateSavings }}>
      {children}
    </GroupContext.Provider>
  );
};

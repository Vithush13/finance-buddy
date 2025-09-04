const mockExpenses = [
  { id: 1, name: "Starbucks", amount: 5, category: "Food" },
  { id: 2, name: "Uber", amount: 12, category: "Transport" },
];

export default function ExpenseList() {
  return (
    <div className="bg-white p-4 shadow rounded">
      <h3 className="text-lg font-bold mb-2">Recent Expenses</h3>
      <ul>
        {mockExpenses.map((exp) => (
          <li key={exp.id} className="flex justify-between border-b py-2">
            <span>{exp.name} - {exp.category}</span>
            <span>${exp.amount}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

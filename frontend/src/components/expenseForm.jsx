import { useState } from "react";

export default function ExpenseForm() {
  const [form, setForm] = useState({ name: "", amount: "", category: "" });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Expense Added:", form);
    setForm({ name: "", amount: "", category: "" });
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-4 shadow rounded mb-4">
      <div className="grid gap-2">
        <input
          type="text"
          placeholder="Expense Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          className="border p-2 rounded"
        />
        <input
          type="number"
          placeholder="Amount"
          value={form.amount}
          onChange={(e) => setForm({ ...form, amount: e.target.value })}
          className="border p-2 rounded"
        />
        <input
          type="text"
          placeholder="Category"
          value={form.category}
          onChange={(e) => setForm({ ...form, category: e.target.value })}
          className="border p-2 rounded"
        />
        <button type="submit" className="bg-indigo-600 text-white p-2 rounded">
          Add Expense
        </button>
      </div>
    </form>
  );
}

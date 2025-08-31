import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid
} from "recharts";

export default function Dashboard() {
  // Sample data (replace later with DB/API data)
  const categoryData = [
    { name: "Food & Drinks", value: 400 },
    { name: "Transport", value: 300 },
    { name: "Entertainment", value: 200 },
    { name: "Shopping", value: 250 },
    { name: "Bills", value: 350 },
  ];

  const monthlyData = [
    { month: "Jan", expenses: 1200 },
    { month: "Feb", expenses: 900 },
    { month: "Mar", expenses: 1400 },
    { month: "Apr", expenses: 1100 },
  ];

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#a855f7"];

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">📊 Spending Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Pie Chart */}
        <div className="bg-white shadow-md rounded-xl p-4">
          <h2 className="text-xl font-semibold mb-4">Spending by Category</h2>
          <PieChart width={350} height={300}>
            <Pie
              data={categoryData}
              cx="50%"
              cy="50%"
              labelLine={false}
              outerRadius={100}
              fill="#8884d8"
              dataKey="value"
            >
              {categoryData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </div>

        {/* Bar Chart */}
        <div className="bg-white shadow-md rounded-xl p-4">
          <h2 className="text-xl font-semibold mb-4">Monthly Expenses</h2>
          <BarChart width={400} height={300} data={monthlyData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="expenses" fill="#4ade80" />
          </BarChart>
        </div>
      </div>
    </div>
  );
}

import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";

const data = [
  { name: "Food", value: 200 },
  { name: "Transport", value: 150 },
  { name: "Entertainment", value: 100 },
  { name: "Shopping", value: 80 },
];

const COLORS = ["#6366F1", "#22C55E", "#F97316", "#EF4444"];

export default function AnalyticsChart() {
  return (
    <div className="bg-white p-6 rounded-xl shadow-lg max-w-lg">
      <h3 className="text-xl font-semibold mb-4 text-gray-700">
        Spending Breakdown
      </h3>
      <PieChart width={400} height={300}>
        <Pie
          data={data}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="50%"
          outerRadius={100}
          label
        >
          {data.map((entry, index) => (
            <Cell key={index} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </div>
  );
}

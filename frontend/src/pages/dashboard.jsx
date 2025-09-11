import DashboardLayout from "../components/layouts/dashboardLayout";
import useUserAuth from "../hooks/useUserAuth";

export default function Dashboard() {
  useUserAuth();
  return (
    <DashboardLayout activeMenu="Dashboard">
    <div className="my-5 mx-auto">
      <h2 className="text-2xl font-bold mb-4">Dashboard</h2>
      
    </div>
    </DashboardLayout>
  );
}

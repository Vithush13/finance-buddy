import { useNavigate } from "react-router-dom";
import DashboardLayout from "../components/layouts/dashboardLayout";
import useUserAuth from "../hooks/useUserAuth";
import { useEffect, useState } from "react";
import axiosInstance from "../utils/axios";
import { API_PATHS } from "../utils/apiPath";
import InfoCard from "../components/card/infoCard";
import { IoMdCard } from "react-icons/io";
import { LuHandCoins, LuWalletMinimal } from "react-icons/lu";
import { addThousandsSeparator } from "../utils/helper";
import RecentTranaction from "../components/dashboard/recentTransaction";
import FinanceOverview from "../components/dashboard/financeOverview";
import ExpenseTransactions from "../components/dashboard/expenseTransaction";
import Last30DaysExpenses from "../components/dashboard/last30DaysExpenses";
import RecentIncomeWithChart from "../components/dashboard/recentIncomeChart";
import IncomeTransactions from "../components/dashboard/recentIncome";
import Last60DaysIncomes from "../components/dashboard/last60DaysIncome";

export default function Dashboard() {
  useUserAuth();
  const navigate = useNavigate();

  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchDashboardData = async () => {
    if (loading) return;

    setLoading(true);

    try {
      const response = await axiosInstance.get(`${API_PATHS.DASHBOARD.GET_DATA}`);
      if (response.data) {
        setDashboardData(response.data);
      }
    } catch (error) {
      console.log("Something went wrong", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  return (
    <DashboardLayout activeMenu="Dashboard">
      <div className="my-5 mx-auto max-w-6xl">
        <h1 className="text-3xl font-bold mb-6 text-purple-700">💼 Dashboard</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <InfoCard
            icon={<IoMdCard className="text-3xl text-white" />}
            label="Total Balance"
            value={` ${addThousandsSeparator(dashboardData?.totalBalance || 0)}`}
            color="bg-gradient-to-r from-blue-500 to-blue-700"
          />

          <InfoCard
            icon={<LuHandCoins className="text-3xl text-white" />}
            label="Total Income"
            value={` ${addThousandsSeparator(dashboardData?.totalIncome || 0)}`}
            color="bg-gradient-to-r from-green-500 to-green-700"
          />

          <InfoCard
            icon={<LuWalletMinimal className="text-3xl text-white" />}
            label="Total Expense"
            value={` ${addThousandsSeparator(dashboardData?.totalExpense || 0)}`}
            color="bg-gradient-to-r from-red-500 to-red-700"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          <RecentTranaction
              transactions ={dashboardData?.recentTransactions}
              onSeeMore= {()=> navigate("/expense")} />
              
        <FinanceOverview 
            totalBalance={dashboardData?. totalBalance || 0}
            totalIncome ={dashboardData?.totalIncome || 0}
            totalExpense={dashboardData?.totalExpense || 0}/>

            <ExpenseTransactions 
              transactions ={dashboardData?.last30daysExpenses?.transactions || []}
              onSeeMore={()=> navigate("/expense")}/>

            <Last30DaysExpenses 
              data ={dashboardData?.last30daysExpenses?.transactions || []} />
        
            {/*<RecentIncomeWithChart 
              data ={dashboardData?.last60DaysIncome?.transactions?.slice(0,5) || []}
              totalIncome={dashboardData?.totalIncome || 0} />*/}
             <Last60DaysIncomes 
              data ={dashboardData?.last60DaysIncome?.transactions || []} />

            <IncomeTransactions
              transactions ={dashboardData?.last60DaysIncome?.transactions || []}
              onSeeMore={()=> navigate("/income")} />


        </div>
      </div>
    </DashboardLayout>
  );
}

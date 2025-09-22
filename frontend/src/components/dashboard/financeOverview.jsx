import CustomPieChart from "../chart/customPieChart";
const COLORS =["#4951f5ff","#2cfa3dff","#ff3300ff" ];

export default function FinanceOverview({totalBalance,totalIncome,totalExpense}){

    const balanceData =[
        {name:"Total Balance", amount: totalBalance},
        {name:"Total Incomes", amount: totalIncome},
        {name:"Total Expenses", amount: totalExpense},
    ]
    return(
        <div className="bg-white p-6 rounded-2xl shadow-md shadow-gray-100 border border-gray-200/50">
           <div className="flex items-center justify-between">
                <h5 className="text-lg">Finance Overview</h5>
            </div>
            <CustomPieChart data={balanceData}
              label="Total Balance"
              totalAmount={`Rs.${totalBalance}`}
              colors={COLORS}
              showTextAnchor/>
        </div>
    )
}
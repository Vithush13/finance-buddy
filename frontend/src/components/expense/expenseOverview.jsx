import { useEffect, useState } from "react";
import { prepareExpenseLineChart } from "../../utils/helper";
import CustomBaLineChart from "../chart/customLineChart";
import {LuPlus} from "react-icons/lu"

export default function ExpenseOverview({transactions,onExpenseIncome}){

     const [chartData,setChartData] = useState([]);

    useEffect(()=>{
        const result = prepareExpenseLineChart(transactions);
        setChartData(result);

        return ()=>{};
    },[transactions]);
    return(
         <div className=" bg-white p-6 rounded-2xl shadow-md shadow-gray-100 border border-gray-200/50">
                     <div className="flex items-center justify-between">
                         <div className="">
                         <h5 className="text-lg">Expense Overview</h5>
                         <p className="text-xs text-gray-400 mt-1">
                             Track your earnings over time and gain insights into whereyour money goes .
                         </p>
                         </div>
         
                         <button className="flex items-center gap-3 text-[12px] font-medium text-gray-700 hover:text-blue-500 bg-gray-50 hover:bg-blue-50 px-4 py-2 rounded-lg border border-gray-200/50 cursor-pointer transition duration-200" onClick={onExpenseIncome}>
                             <LuPlus className="text-lg"/> Add Expense
                         </button>
                     </div>
         
                     <div className="mt-10">
                          <CustomBaLineChart data={chartData}/>
                     </div>
                     
                   
                 </div>
    )
}
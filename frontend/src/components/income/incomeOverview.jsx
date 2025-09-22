import { useEffect, useState } from "react";
import { prepareincomeBarChartallData } from "../../utils/helper";
import CustomBarChart from "../card/customBarChart";
import {LuPlus} from "react-icons/lu"


export default function IncomeOverview({transactions,onAddIncome}){

    const [chartData,setChartData] = useState([]);

    useEffect(()=>{
        const result = prepareincomeBarChartallData(transactions);
        setChartData(result);

        return ()=>{};
    },[transactions]);
    return(
        <div className=" bg-white p-6 rounded-2xl shadow-md shadow-gray-100 border border-gray-200/50">
            <div className="flex items-center justify-between">
                <div className="">
                <h5 className="text-lg">Income Overview</h5>
                <p className="text-xs text-gray-400 mt-1">
                    Track your earnings over time and analyze your income trends.
                </p>
                </div>

                <button className="flex items-center gap-3 text-[12px] font-medium text-gray-700 hover:text-blue-500 bg-gray-50 hover:bg-blue-50 px-4 py-2 rounded-lg border border-gray-200/50 cursor-pointer transition duration-200" onClick={onAddIncome}>
                    <LuPlus className="text-lg"/> Add Income
                </button>
            </div>

            <div className="mt-10">
                 <CustomBarChart data={chartData}/>
            </div>
            
          
        </div>  
    )
}
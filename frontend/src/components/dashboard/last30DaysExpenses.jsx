import { useEffect, useState } from "react";
import { prepareExpenseBarChartData } from "../../utils/helper";
import CustomBarChart from "../card/customBarChart";


export default function Last30DaysExpenses({data}){

    const [chartData,setChartData] = useState([]);

    useEffect(()=>{
        const result = prepareExpenseBarChartData(data);
        setChartData(result);

        return ()=>{};
    },[data]);
    return(
        <div className="col-span-1 bg-white p-6 rounded-2xl shadow-md shadow-gray-100 border border-gray-200/50">
            <div className="flex items-center justify-between">
                <h5 className="text-lg">Last 30days Expenses</h5>
            </div>

          <CustomBarChart data={chartData}/>
        </div>  
    )
}
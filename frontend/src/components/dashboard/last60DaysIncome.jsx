import { useEffect, useState } from "react";
import { prepareincomeBarChartData } from "../../utils/helper";
import CustomBarChart from "../card/customBarChart";


export default function Last60DaysIncomes({data}){

    const [chartData,setChartData] = useState([]);

    useEffect(()=>{
        const result = prepareincomeBarChartData(data);
        setChartData(result);

        return ()=>{};
    },[data]);
    return(
        <div className="col-span-1 bg-white p-6 rounded-2xl shadow-md shadow-gray-100 border border-gray-200/50">
            <div className="flex items-center justify-between">
                <h5 className="text-lg">Last 60days Incomes</h5>
            </div>

          <CustomBarChart data={chartData}/>
        </div>  
    )
}
import { useEffect,useState } from "react";
import CustomPieChart from "../chart/customPieChart";
const COLORS =["#de5cf5ff", "#FA2C37","#FF6900","#4F39F6"]

export default function RecentIncomeWithChart({data,totalIncome}) {
      const [chartData,setChartData] = useState([]);
    
       const prepareChartData =()=>{
        const dataArr = data?.map((item)=>({
            name:item?.source,
            amount:item?.amount,
        }));
        setChartData(dataArr);
       };

        useEffect(()=>{
               prepareChartData();
       
               return ()=>{};
           },[data]);
           
    return(
        <div className=" bg-white p-6 rounded-2xl shadow-md shadow-gray-100 border border-gray-200/50">
            <div className="flex items-center justify-between">
                <h5 className="text-lg">Last 60 Days Income</h5>
            </div>

            <CustomPieChart data={chartData} label="Total Income"
                totalAmount={`Rs.${totalIncome}`} colors={COLORS} showTextAnchor/>

          
        </div>  
    )
}


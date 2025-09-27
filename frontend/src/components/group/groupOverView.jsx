import { useEffect, useState } from "react";
import { prepareincomeBarChartallData } from "../../utils/helper";
import CustomBarChart from "../card/customBarChart";
import {LuPlus} from "react-icons/lu"


export default function GroupSavingOverview({ onAddGroup }){

   
    return(
        <div className=" bg-white p-6 rounded-2xl shadow-md shadow-gray-100 border border-gray-200/50">
            <div className="flex items-center justify-between">
                <div className="">
                <h5 className="text-lg">Group Saving Overview</h5>
                <p className="text-xs text-gray-400 mt-1">
                   Work together with your group to reach shared financial goals faster.
                </p>
                </div>

                <button className="flex items-center gap-3 text-[12px] font-medium text-gray-700 hover:text-blue-500 bg-gray-50 hover:bg-blue-50 px-4 py-2 rounded-lg border border-gray-200/50 cursor-pointer transition duration-200" onClick={onAddGroup}>
                    <LuPlus className="text-lg"/> Create Group
                </button>
            </div>

            
            
          
        </div>  
    )
}
import { LuDownload } from "react-icons/lu";
import TransactionInfoCard from "../card/transactionInfoCard";
import moment from "moment";
export default function IncomeList({transactions,onDelete, OnDownload}){
    return(
         <div className=" bg-white p-6 rounded-2xl shadow-md shadow-gray-100 border border-gray-200/50">
                    <div className="flex items-center justify-between">
                        
                        <h5 className="text-lg">Income List</h5>
                      
        
                        <button className="flex items-center gap-3 text-[12px] font-medium text-gray-700 hover:text-blue-500 bg-gray-50 hover:bg-blue-50 px-4 py-2 rounded-lg border border-gray-200/50 cursor-pointer transition duration-200" onClick={OnDownload}>
                            <LuDownload className="text-base"/> Download
                        </button>
                    </div>
        
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                    {transactions?.map((income)=>(
                                            <TransactionInfoCard key={income._id}
                                                         title={ income.source}
                                                         icon={income.icon}  date={moment(income.date).format("Do MMM YYYY")}
                                                        amount ={income.amount}  type="income" 
                                                        onDelete={()=> onDelete(income._id)} hideDeleteBtn />
                                                    ))}                  
                     </div>    
                </div> 
    )
}
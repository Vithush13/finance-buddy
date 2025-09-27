import { LuDownload } from "react-icons/lu";
import TransactionInfoCard from "../card/transactionInfoCard";
import moment from "moment";
export default function ExpenseList({transactions,onDelete, onDownload}){
    return(
         <div className=" bg-white p-6 rounded-2xl shadow-md shadow-gray-100 border border-gray-200/50">
                    <div className="flex items-center justify-between">
                        
                        <h5 className="text-lg">All Expenses</h5>
                      
        
                        <button className="flex items-center gap-3 text-[12px] font-medium text-gray-700 hover:text-blue-500 bg-gray-50 hover:bg-blue-50 px-4 py-2 rounded-lg border border-gray-200/50 cursor-pointer transition duration-200" onClick={onDownload}>
                            <LuDownload className="text-base"/> Download
                        </button>
                    </div>
        
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                    {transactions?.map((expense)=>(
                                            <TransactionInfoCard key={expense._id}
                                                         title={ expense.category}
                                                         icon={expense.icon}  date={moment(expense.date).format("Do MMM YYYY")}
                                                        amount ={expense.amount}  type="expense" 
                                                        onDelete={()=> onDelete(expense._id)} hideDeleteBtn />
                                                    ))}                  
                     </div>    
                </div> 
    )
}
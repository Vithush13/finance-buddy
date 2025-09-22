import {LuArrowRight} from "react-icons/lu"
import TransactionInfoCard from "../card/transactionInfoCard"
import moment from "moment"

export default function IncomeTransactions({transactions,onSeeMore}){
    return(
        <div className="bg-white p-6 rounded-2xl shadow-md shadow-gray-100 border border-gray-200/50">
            <div className="flex items-center justify-between">
                <h5 className="text-lg">Income</h5>

                
                <button className=" flex items-center gap-3 text-[12px] font-medium text-gray-700 hover:text-blue-500 bg-gray-50 hover:bg-blue-50 px-4 py-2 rounded-lg border border-gray-200/50 cursor-pointer transition duration-200" 
                    onClick={onSeeMore}>
                    See All <LuArrowRight className="text-base"/>
                 </button>
            </div>
             
              <div className="mt-6">
                   {transactions?.slice(0,5)?.map((item)=>(
                           <TransactionInfoCard key={item._id}
                                     title={ item.source}
                                     icon={item.icon}  date={moment(item.date).format("Do MMM YYYY")}
                                    amount ={item.amount}  type="income" hideDeleteBtn />
                                ))}                  
                </div>
                  
        </div>
        
    )
}
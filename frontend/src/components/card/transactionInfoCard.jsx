import { LuTrash2, LuTrendingDown, LuTrendingUp,LuUtensils } from "react-icons/lu";


export default function TransactionInfoCard({ title, icon, date, amount, type, hideDeleteBtn,onDelete }) {

  const getAmountStyles = () =>
    type === "income"
      ? "bg-gradient-to-r from-green-50 to-green-100 text-green-600"
      : "bg-gradient-to-r from-red-50 to-red-100 text-red-600";


  return (
    <div className="group relative flex items-center gap-4 mt-3 p-4 rounded-xl bg-white border border-gray-100 shadow-sm hover:shadow-md hover:scale-[1.04] transition-all duration-200 ease-in-out">
      <div className="w-12 h-12 flex items-center justify-center text-xl text-gray-800 bg-gray-100 rounded-full">
         {icon ? ( <img src={icon} alt ={title} className="w-6 h-6"/> ) : ( <LuUtensils/> )}
      </div>

      <div className="flex-1 flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-700 font-medium">{title}</p>
          <p className="text-xs text-gray-400 mt-1">{date}</p>
        </div>

        <div className="flex items-center gap-2">
          {hideDeleteBtn && (
            <button
              className="text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
              onClick={onDelete}
            >
              <LuTrash2 size={18} />
            </button>
          )}

          <div className={`flex items-center gap-2 px-3 py-1.5 rounded-md ${getAmountStyles()}`}>
            <h6 className="text-xs font-medium">
              {type === "income" ? "+" : "-"} Rs.{amount}
            </h6>
            {type === "income" ? <LuTrendingUp /> : <LuTrendingDown />}
          </div>
        </div>
      </div>
    </div>
  );
}

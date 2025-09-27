import { useState } from "react"
import Input from "../input/input";
import EmojiPickerPopup from "../layouts/emojiPicker";
export default function AddExpenseForm({onAddExpense}){
    const [income,setIncome] = useState({
        category:"",
        amount:"",
        date:"",
        icon:"",
    });

    const handleChange = (key,value) => setIncome({...income, [key]:value});
    return(
        <div>
            <EmojiPickerPopup icon={income.icon}
                        onSelect={(selectedIcon)=>handleChange("icon",selectedIcon)}/>
            <Input value={income.category}
                   onChange={({target})=> handleChange("category",target.value)}
                   label="Income Source"
                   placeholder="Rent,Groceries, ect"
                   type="text" />

            <Input value={income.amount}
                   onChange={({target})=> handleChange("amount",target.value)}
                   label="Amount"
                   placeholder=""
                   type="number" />

            <Input value={income.date}
                   onChange={({target})=> handleChange("date",target.value)}
                   label="Date"
                   placeholder=""
                   type="date" />

            <div className="flex justify-end mt-6">
                <button type="button"
                        className="flex items-center gap-3 text-[12px] font-medium  text-white  bg-blue-500  hover:bg-blue-700 px-4 py-2 rounded-lg border border-gray-200/50 cursor-pointer transition duration-200 "
                        onClick={()=> onAddExpense(income)}>
                            Add Expense
                        </button>
            </div>
        </div>
    )
}
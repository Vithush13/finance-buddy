import { useState } from "react"
import Input from "../input/input";
import EmojiPickerPopup from "../layouts/emojiPicker";
export default function AddIncomeForm({onAddIncome}){
    const [income,setIncome] = useState({
        source:"",
        amount:"",
        date:"",
        icon:"",
    });

    const handleChange = (key,value) => setIncome({...income, [key]:value});
    return(
        <div>
            <EmojiPickerPopup icon={income.icon}
                        onSelect={(selectedIcon)=>handleChange("icon",selectedIcon)}/>
            <Input value={income.source}
                   onChange={({target})=> handleChange("source",target.value)}
                   label="Income Source"
                   placeholder="Freelance,salary, ect"
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
                        onClick={()=> onAddIncome(income)}>
                            Add Income
                        </button>
            </div>
        </div>
    )
}
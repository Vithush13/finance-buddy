import xlsx from "xlsx";
import Expense from "../models/expense.js";

export const addExpense = async (req, res) => {
    const userId = req.user.id;

    try{
        const {icon,category, amount,date} = req.body;

        //validation check for missing fileds
        if(!category || !amount || !date){
             return res.status(400).json({message:"All fields are require"});
        }

        const newExpense = new Expense({ userId,icon,category,amount,date: new Date(date)});
        await newExpense.save();
        res.status(200).json(newExpense);
    } catch (error) {
        res.status(500).json({ message: "Server Error"});
    }
};

export const getAllExpense = async (req, res) => {
     const userId = req.user.id;

    try{
        const expense = await Expense.find({ userId}).sort({ date: -1});
        res.status(200).json(expense);
    } catch (error) {
        res.status(500).json({ message: "Server Error"});
    }

};

export const deleteExpense = async (req, res) => {
    try{
         await Expense.findByIdAndDelete(req.params.id);
        res.status(200).json({message: "Expense deleted successfully"});
    } catch (error) {
        res.status(500).json({ message: "Server Error"});
    }
};

export const downloadExpenseExcel = async (req, res) => {
         const userId = req.user.id;

    try{
        const expense = await Expense.find({ userId}).sort({ date: -1});

        const data = income.map((item) => ({
            Category: item.category,
            Amount: item.amount,
            Date: item.date,
        }));

        const wb = xlsx.utils.book_new();
        const ws = xlsx.utils.json_to_sheet(data);
        xlsx.utils.book_append_sheet(wb, ws,"Expense");
        xlsx.writeFile(wb, "expense_details.xlsx");
        res.download("expense_details.xlsx");
    } catch (error) {
        res.status(500).json({ message: "Server Error"});
    }

};

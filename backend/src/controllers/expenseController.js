import xlsx from "xlsx";
import Expense from "../models/expense.js";
import OpenAI from "openai";
import fetch from "node-fetch";
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
        const expenses = await Expense.find({ userId}).sort({ date: -1});

        const data = expenses.map((item) => ({
            Category: item.category,
            Amount: item.amount,
            Date: item.date,
        }));

        const wb = xlsx.utils.book_new();
        const ws = xlsx.utils.json_to_sheet(data);
        xlsx.utils.book_append_sheet(wb, ws,"Expenses");
        xlsx.writeFile(wb, "expense_details.xlsx");
        res.download("expense_details.xlsx");
    } catch (error) {
        res.status(500).json({ message: "Server Error"});
    }

};



export const getExpenseInsights = async (req, res) => {
  try {
    const userId = req.user.id;

    const expenses = await Expense.find({ userId }).sort({ date: -1 }).limit(50);
    if (!expenses.length) return res.json({ insights: "No expenses found to analyze." });
    

    const summary = expenses
      .map(e => `${e.category} - Rs.${e.amount} on ${new Date(e.date).toDateString()}`)
      .join("\n");

    // 🔹 Short summary style prompt
    const prompt = `You are a financial assistant. 
    Analyze these expenses and provide a VERY SHORT summary with key insights and 2-3 saving tips. 
    Keep it under 100 words, concise and easy to read:\n\n${summary}`;

    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "deepseek/deepseek-chat-v3.1:free",
        messages: [{ role: "user", content: prompt }],
      }),
    });

    const data = await response.json();
    console.log("OpenRouter full response:", JSON.stringify(data, null, 2));

    const insights = data?.choices?.[0]?.message?.content || "No insights returned";
    res.json({ insights });

  } catch (error) {
    console.error("AI Insights Error:", error);
    res.status(500).json({ message: "Failed to generate AI insights" });
  }
};




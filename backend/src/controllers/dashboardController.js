import { isValidObjectId,Types } from "mongoose";
import Expense from "../models/expense.js";
import Income from "../models/income.js";

export const getDashboarddata = async (req, res) => {

    try{
        const userId = req.user.id;
        const userObjectId = new Types.ObjectId(String(userId));

        const totalIncome = await Income.aggregate([
            { $match: {userId: userObjectId}},
            { $group: {_id:null, total: {$sum: "$amount"}}}
        ]);

        const totalExpense = await Expense.aggregate([
            { $match: {userId: userObjectId}},
            { $group: {_id:null, total: {$sum: "$amount"}}}
        ]);
        
        //get income transaction in last 60days
        const last60daysIncome = await Income.find({
            userId,
            date: {$gte: new Date(Date.now()- 60 * 24 *60*60*1000)}
        }).sort({date: -1});
        
        //get total income for last 60days
        const incomeLast60days = last60daysIncome.reduce(
            (sum, transaction) => sum+ transaction.amount, 0
        );

        //get expense transaction in last 30days
        const last30daysExpenses = await Expense.find({
            userId,
            date: {$gte: new Date(Date.now()- 30 * 24 *60*60*1000)}
        }).sort({date: -1});
        
        //get total expense for last 30days
        const expenseLast30days = last30daysExpenses.reduce(
            (sum, transaction) => sum + transaction.amount, 0
        );

        //fetch last 5 transactions income+expense
        const lastTransactions =[...(await Income.find({ userId}).sort({date:-1}).limit(5)).map(
            (txn) =>({
                ...txn.toObject(),
                type:"income",
            })
        ),
        ...(await Expense.find({ userId}).sort({date:-1}).limit(5)).map(
            (txn) =>({
                ...txn.toObject(),
                type:"expense",
            })
        ),].sort((a,b) => b.date - a.date); //sort latest first

        res.json({
            totalBalance:
             (totalIncome[0]?.total || 0) -(totalExpense[0]?.total || 0),
             totalIncome:totalIncome[0]?.total || 0,
             totalExpense: totalExpense[0]?.total || 0,
             last30daysExpenses:{
                total: expenseLast30days,
                transactions:last30daysExpenses,
             },
             totalIncome: totalIncome[0]?.total || 0,
             last60DaysIncome:{
                total: incomeLast60days,
                transactions:last60daysIncome,
             },
             recentTransactions:lastTransactions,

        })
    } catch (error) {
        res.status(500).json({ message: "Server Error..."});
    }
};
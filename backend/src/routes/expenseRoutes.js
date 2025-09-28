import express from "express";
import {addExpense,getAllExpense,deleteExpense,downloadExpenseExcel,getExpenseInsights} from "../controllers/expenseController.js";
import {protect} from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/addExpense",protect ,addExpense);
router.get("/getExpense",protect ,getAllExpense);
router.get("/download",protect ,downloadExpenseExcel);
router.delete("/:id",protect ,deleteExpense);
router.get("/ai-insights", protect, getExpenseInsights);

export default router;
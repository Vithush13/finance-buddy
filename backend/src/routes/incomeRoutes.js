import express from "express";
import {addIncome,getAllIncome,deleteIncome,downloadIncomeExcel} from "../controllers/incomeController.js";
import {protect} from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/addIncome",protect ,addIncome);
router.get("/getIncome",protect ,getAllIncome);
router.get("/download",protect ,downloadIncomeExcel);
router.delete("/:id",protect ,deleteIncome);

export default router;
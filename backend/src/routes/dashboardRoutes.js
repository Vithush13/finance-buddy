import express from "express";
import { getDashboarddata } from "../controllers/dashboardController.js";
import {protect} from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/",protect ,getDashboarddata);


export default router;
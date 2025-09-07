import express from "express";
import {registerUser,loginUser,getUserInfo,uploadImage} from "../controllers/authController.js";
import {protect} from "../middleware/authMiddleware.js";
import upload from "../middleware/uploadMiddleware.js";
const router = express.Router();

router.post("/register",registerUser);
router.post("/login",loginUser);
router.get("/getUser",protect ,getUserInfo);
router.post("/upload-image", upload.single("image"), uploadImage);

export default router;
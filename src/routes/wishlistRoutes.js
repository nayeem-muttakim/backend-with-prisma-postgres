import express from "express";
import { register, login, logout } from "../controllers/wishlistController.js";
const router = express.Router();

router.post("/", addToWishList);
router.post("/login", login);
router.post("/logout", logout);

export default router;

import express from "express";
import { addToWishList } from "../controllers/wishlistController.js";
const router = express.Router();

router.post("/", addToWishList);
// router.post("/login", login);
// router.post("/logout", logout);

export default router;

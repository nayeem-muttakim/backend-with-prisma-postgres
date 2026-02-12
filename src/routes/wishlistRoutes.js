import express from "express";
import {
  addToWishList,
  removeFromWishlist,
  updateWishlistItem,
} from "../controllers/wishlistController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

//middleware
router.use(authMiddleware);

router.post("/", addToWishList);

router.put("/:id", updateWishlistItem);

router.delete("/:id", removeFromWishlist);

export default router;

import { prisma } from "../config/db.js";

const addToWishList = async (req, res) => {
  const { bookId, status, rating, notes } = req.body;

  //verify book exists

  const book = await prisma.book.findUnique({
    where: { id: bookId },
  });

  if (!book) {
    return res.status(404).json({
      error: "Book not found",
    });
  }

  // check if already exist
  const existingInWishlist = await prisma.wishlistItem.findUnique({
    where: {
      userId_bookId: {
        userId: req.user.id,
        bookId: bookId,
      },
    },
  });

  if (existingInWishlist) {
    return res.status(400).json({
      error: "Book already in the wishlist",
    });
  }

  const wishlistItem = await prisma.wishlistItem.create({
    data: {
      userId: req.user.id,
      bookId,
      status: status || "PLANNED",
      rating,
      notes,
    },
  });
  res.status(201).json({
    status: "success",
    data: {
      wishlistItem,
    },
  });
};

const updateWishlistItem = async (req, res) => {
  const { status, rating, notes } = req.body;

  //find item and verify owner
  const wishlistItem = await prisma.wishlistItem.findUnique({
    where: { id: req.params.id },
  });

  if (!wishlistItem) {
    return res.status(404).json({
      error: "Item not found",
    });
  }

  if (wishlistItem.userId !== req.user.id) {
    return res.status(403).json({
      error: "Not allowed to update this item",
    });
  }

  const updateData = {};
  if (status !== undefined) updateData.status = status.toUpperCase();
  if (rating !== undefined) updateData.rating = rating;
  if (notes !== undefined) updateData.notes = notes;

  await prisma.wishlistItem.update({
    where: { id: req.params.id },
    data: updateData,
  });

  res.status(200).json({
    status: "success",
    data: {
      wishlistItem: updateData,
    },
  });
};

const removeFromWishlist = async (req, res) => {
  const wishlistItem = await prisma.wishlistItem.findUnique({
    where: { id: req.params.id },
  });

  if (!wishlistItem) {
    return res.status(404).json({
      error: "wishlist item not found",
    });
  }

  // ensure only owner can delete
  if (wishlistItem.userId !== req.user.id) {
    return res.status(403).json({
      error: "not allowed to update this item",
    });
  }

  await prisma.wishlistItem.delete({
    where: { id: req.params.id },
  });
  res.status(200).json({
    stats: "success",
    message: "Book removed from wishlist",
  });
};

export { addToWishList, removeFromWishlist, updateWishlistItem };

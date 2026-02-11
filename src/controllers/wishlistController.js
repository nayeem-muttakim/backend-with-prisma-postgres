import { prisma } from "../config/db.js";
const addToWishList = async (req, res) => {
  const { bookId, status, rating, notes, userId } = req.body;

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
        userId: userId,
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
      userId,
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

export { addToWishList };

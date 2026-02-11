import {prisma} from '../config/db.js'
const addToWishList = async (req, res) => {
  const { bookId, status, rating, notes } = req.body;

  //verify book exists

  const book = await prisma.book.findUnique({
    where:{id:bookId},
  })

  (!book){
    r
  }
};

export { addToWishList };

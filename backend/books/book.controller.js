const Book = require("./book.model");

const postAbook = async (req, res) => {
   try {
     const newBook = await Book({...req.body});
     await newBook.save();
     res.status(201).send({
       message: "Book posted successfully", book: newBook
     });
   } catch (error) {
     console.error("❌ Error posting book:", error);  // ⬅️ Terminal shows full details
     res.status(500).send({
       message: "Error posting book",
       error: error.message,                          // ⬅️ Postman shows useful info
     });
   }
 }

 //get all books
 const getAllBooks = async (req, res) => {
    try{
        const books = await Book.find().sort({createdAt: -1}); 
        res.status(200).send({books});
    }
    catch(error) {
        console.error("❌ Error getting books:", error);
        res.status(500).send({
            message: "Error getting books",
            error: error.message,
        });
    }
}

// get single book by ID
const getSingleBook = async (req, res) => {
    const { id } = req.params;
    try {
        const book = await Book.findById(id);
        if (!book) {
            return res.status(404).send({ message: "Book not found" });
        }
        res.status(200).send({ book });
    } catch (error) {
        console.error("❌ Error getting book:", error);
        res.status(500).send({
            message: "Error getting book",
            error: error.message,
        });
    }
}

//update a book
const updateBook = async (req, res) => {
    const { id } = req.params;
    try {
        const updatedBook = await Book.findByIdAndUpdate(id, req.body, { new: true });
        if (!updatedBook) {
            return res.status(404).send({ message: "Book not found" });
        }
        res.status(200).send({ book: updatedBook });
    } catch (error) {
        console.error("❌ Error updating book:", error);
        res.status(500).send({
            message: "Error updating book",
            error: error.message,
        });
    }
}


//delete a book
const deleteBook = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedBook = await Book.findByIdAndDelete(id);
        if (!deletedBook) {
            return res.status(404).send({ message: "Book not found" });
        }
        res.status(200).send({ message: "Book deleted successfully" });
    } catch (error) {
        console.error("❌ Error deleting book:", error);
        res.status(500).send({
            message: "Error deleting book",
            error: error.message,
        });
    }
};
module.exports = {
  postAbook,
  getAllBooks,
  getSingleBook,
    updateBook,
    deleteBook
};

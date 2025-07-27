const express = require('express');
const router = express.Router();
const Book = require('./book.model.js'); // Adjust path if needed
const { postAbook, getAllBooks, getSingleBook, updateBook, deleteBook } = require('./book.controller.js');

//frontend => backend server
//backend server => controller
//controller => schema
//schema => database
//send to server ok message
//back to frontend


//post a book
//post = when submit smth from frontend to db
//get = when get smth from db
//put/patch = when update smth in db
//delete = when delete somthing

//post a book
router.post("/create-book",postAbook);


//get all books
router.get("/",getAllBooks); 

router.get("/:id", getSingleBook); 

//update a book
router.put("/edit/:id", updateBook);

//delete a book
router.delete("/:id", deleteBook);

module.exports = router;
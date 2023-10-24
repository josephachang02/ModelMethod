const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const helmet = require('helmet'); // adds a bunch of standard security to server
const Book = require('./models/Book.js');
require('dotenv').config();
require('./config/db.js');
const PORT = 3200;


const app = express();


// START MIDDLEWARE //
app.use(express.json());
app.use(cors({
    origin: "*"
}));
app.use(morgan('dev'));
app.use(helmet());
// END MIDDLEWARE //

// START ROUTES //

// insert one
app.post('/books/insert', async (req,res) => {
    let books = req.body.books;
    let addBook = await Book.create(books);
    res.send(addBook);
})
// insertMany
app.post('/books/insertMany', async (req, res) => {
    // in the request there should be an array of books objects.
    let books = req.body.books;

    let dbResponse =  await  Book.insertMany(books);
    res.send(dbResponse);
})

// .findById
// rereview params 
app.get('/books/findID:id', async (req,res) => {

    let bookId = req.params.id;

    let findBooks = await Book.findById(bookId);
    res.send(findBooks);
})

// .findByIdAndDelete
app.delete('/books/deleteByID:id', async (req,res) => {

    let bookId = req.params.id;

    let deleteBook = await Book.findByIdAndDelete(bookId);
    res.send(deleteBook);
})

// END ROUTES //

app.listen(PORT, () => {
    console.log(`Server LIVE on port ${PORT}`);
});



const express = require('express');
const router = express.Router();

const db = require('./../../database/mongodb');

router.get('/', async(req,res) =>{
    const books= await db.getBooks();

    res.send(books)
});

router.get('/:id', async(req, res) =>{
    const id = req.params.id;
    const book = await db.getBookById(id);

    res.send(book)
});

router.post('/', async(req, res) =>{
    const newBook = {
        title: req.body.title,
        genre: req.body.genre,
        year: req.body.year,
    };

    await db.insertBook(newBook);

    res.sendStatus(201);
});

router.put('/:id', async(req, res) =>{
    const updatedBook = {
        title: req.body.title,
        genre: req.body.genre,
        year: req.body.year
    };

    const id = req.params.id;
    await db.updateBookById(id, updatedBook);

    res.sendStatus(200);
});

router.delete('/:id', async(req, res) =>{
    const id = req.params.id;

    await db.deleteBookById(id);

    res.sendStatus(200);
});

// GET: /books/:id/games -> return all games owned by person with ID //

router.get('/:id/games', async(req, res) =>{
    const id = req.params.id;
    const games = await db.getGamesByBookId(id);

    res.send(games);
});

module.exports = router;
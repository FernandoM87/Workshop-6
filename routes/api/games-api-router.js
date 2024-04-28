const express = require('express');
const { ObjectId } = require('mongodb');
const router = express.Router();

const db = require('./../../database/mongodb');

router.get('/', async(req,res) =>{
    /* const games= await db.getGames(); */

    console.log(res)

    res.send("logged")
});

router.get('/:id', async(req, res) =>{
    const id = req.params.id;
    const game = await db.getGameById(id);

    res.send(game)
});

router.post('/', async(req, res) =>{
    const newGame = {
        title: req.body.title,
        genre: req.body.genre,
        description: req.body.description,
        bookId: new ObjectId(req.body.bookId)
    };

    await db.insertGame(newGame);

    res.sendStatus(201);
});

router.put('/:id', async(req, res) =>{
    const updatedGame = {
        title: req.body.title,
        genre: req.body.genre,
        description: req.body.description,
        bookId: new ObjectId(req.body.bookId)
    };

    const id = req.params.id;
    await db.updatedgameById(id, updatedGame);

    res.sendStatus(200);
});

router.delete('/:id', async(req, res) =>{
    const id = req.params.id;

    await db.deleteGameById(id);

    res.sendStatus(200);
});

module.exports = router;
const express = require('express');
const router = express.Router();

const db = require ('./../database/mongodb');

router.get('/', async (req, res) => {
    const games = await db.getGames();

    res.render('home', { games });
});

router.get('/new-game', (req, res) => {
    res.render('new-game');
});

router.post('/new-game', async (req, res) => {
    const newGame = {
        title: req.body.title,
        genre: req.body.genre,
        description: req.body.description,
    };

    await db.insertGame(newGame);

    res.redirect('/');
});

router.get("/games/:id", async (req, res) => {
    const id = req.params.id;
    const game = await db.getGameById(id); 

    res.render('edit-game', { game });  
});

router.post("/edit-game/:id", async (req, res) => {
    const updatedGame = {
        title: req.body.title,
        genre: req.body.genre,
        description: req.body.description,
    };

    const id = req.params.id;
    await db.updatedgameById(id, updatedGame);

    res.redirect('/');  
});

router.post("/delete-game/:id", async (req, res) => {
    const id = req.params.id;
    await db.deleteGameById(id);

    res.redirect('/');  
});

module.exports = router;
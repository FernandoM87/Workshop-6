const { MongoClient, ObjectId } = require('mongodb');

const connectionUrl = process.env.MONGODB_URL;
const client = new MongoClient(connectionUrl);

const dbName = process.env.MONGODB_DATABASE;



/*----- GAMES -----*/

async function getGamesCollection(){
    await client.connect();
    const db = client.db(dbName);
    const collection = db.collection("games");
    return collection;
}

module.exports.getGames = async () => {
    const collection = await getGamesCollection();
    const findResult = await collection.find({}).toArray(); 

    return findResult;  
}

module.exports.insertGame = async (newGame) => {
    const collection = await getGamesCollection();  
    await collection.insertOne(newGame);
}

module.exports.getGameById = async (id) => {
    const objectId = new ObjectId(id);
    const collection = await getGamesCollection();
    const game = await collection.findOne({ _id: objectId });
    return game;
}

module.exports.updatedgameById = async (id, updatedGame) => {
    const objectId = new ObjectId(id);
    const collection = await getGamesCollection();
    await collection.updateOne({ _id: objectId }, { $set: updatedGame });
};

module.exports.deleteGameById = async (id) => {
    const objectId = new ObjectId(id);
    const collection = await getGamesCollection();
    await collection.deleteOne({ _id: objectId });
};

module.exports.getGamesByBookId = async (bookId) => {
    const objectId = new ObjectId(bookId);
    const collection = await getGamesCollection();
    const findResult = await collection.find({ bookId: objectId }).toArray(); 

    return findResult;  
};

/*----- / GAMES -----*/

/*----- BOOKS -----*/

async function getBooksCollection(){
    await client.connect();
    const db = client.db(dbName);
    const collection = db.collection("books");
    return collection;
}

module.exports.insertBook = async (newBook) => {
    const collection = await getBooksCollection();  
    await collection.insertOne(newBook);
};

module.exports.getBooks = async () => {
    const collection = await getBooksCollection();
    const findResult = await collection.find({}).toArray(); 

    return findResult;  
};

module.exports.getBookById = async (id) => {
    const objectId = new ObjectId(id);
    const collection = await getBooksCollection();
    const book = await collection.findOne({ _id: objectId });

    return book;
};

module.exports.updateBookById = async (id, updatedBook) => {
    const objectId = new ObjectId(id);
    const collection = await getBooksCollection();
    await collection.updateOne({ _id: objectId }, { $set: updatedBook });
};

module.exports.deleteBookById = async (id) => {
    const objectId = new ObjectId(id);
    const collection = await getBooksCollection();
    await collection.deleteOne({ _id: objectId });
};

module.exports.getGamesByBookId = async (id) => {
    const collection = await getGamesCollection();
    const findResult = await collection.find({ bookId: new ObjectId(id) }).toArray(); 

    return findResult;  
};
/*----- / BOOKS ----*/
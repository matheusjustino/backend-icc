const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

mongoose.connect("mongodb://localhost:27017/dbicc", { useNewUrlParser: true }).then(() => {
    console.log("Banco de dados local ON!");
}).catch(err => console.log(err));

module.exports = mongoose;

/*const MongoClient = require("mongodb").MongoClient;
const ObjectId = require("mongodb").ObjectID;

const url = "mongodb+srv://deploy:dbicc321@cluster0-r58uk.mongodb.net/test?retryWrites=true&w=majority";
const db_n = "dbicc";

MongoClient.connect(url, { useNewUrlParser: true }, (error, client) => {
    if (error) {throw error;}
    database = client.db(db_n);
    collection = database.collection('aulas');
    console.log("Connected to :" + db_n + "!");
});

module.exports = MongoClient;*/
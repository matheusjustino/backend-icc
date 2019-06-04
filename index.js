const express = require('express');

const MongoClient = require("mongodb").MongoClient;
//const ObjectId = require("mongodb").ObjectID;

const app = express();
const bodyParser = require('body-parser');
const cors = require("cors");

const url = "mongodb+srv://deploy:dbicc321@cluster0-r58uk.mongodb.net/test?retryWrites=true&w=majority";
const db_n = "dbicc";

let database, collection;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json(), function (req, res, next) {

    res.header("Allow", "OPTIONS, GET, POST");
    
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
    res.header("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Access-Control-Allow-Origin, X-Requested-With, Content-Type, Accept, Authorization");
    res.setHeader('Access-Control-Allow-Credentials', true)
    next();

});


app.post('/salvaValores', (req, res) => {
    console.log(req.body);
    collection.insert(req.body, (error, result) => {
        if (error) {
            console.log(error);
        }
        res.send(result.result);
    });
});


app.get('/pegaValores', (req, res1) => {
    console.log("Dados recuperados");
    const t = req.query.data;
    console.log(t);

    collection.find({ data: t }).toArray().then(itens => {
        let a = [0, 0, 0, 0];
        if (itens.length > 0) {
            for (let i = 0; i < itens.length; i++) {
                for (let j = 0; j < itens[i].values.length; j++) {
                    a[j] += itens[i].values[j];
                }
            }
            console.log(a);
        }
        res1.send(a);
    });
});


app.listen((process.env.PORT || 9000), () => {
    MongoClient.connect(url, { useNewUrlParser: true }, (error, client) => {
        if (error) {throw error;}
        database = client.db(db_n);
        collection = database.collection('aulas');
        console.log("Conectado ao banco de dados: " + db_n + ".");
    });
    console.log("SERVER ON");
});

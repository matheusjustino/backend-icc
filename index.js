const express = require('express');

const MongoClient = require("mongodb").MongoClient;

const app = express();
const bodyParser = require('body-parser');
const cors = require("cors");

const url = "mongodb+srv://deploy:dbicc321@cluster0-r58uk.mongodb.net/test?retryWrites=true&w=majority";
const db_n = "dbicc";

let database, collectionAulas, collectionMatriculas;

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
    collectionAulas.insert(req.body, (error, result) => {
        if (error) {
            console.log(error);
        }
        res.send(result.result);
    });
});


app.get('/pegaValores', (req, res) => {
    console.log("Dados recuperados");
    const t = req.query.data;
    console.log(t);

    collectionAulas.find({ data: t }).toArray().then(itens => {
        const a = solve(itens)
        res.send(a);
    });
});

app.get('/pegaMatricula', (req, res) => {
    const x = req.query.matricula;
    console.log(req.query);
    
    collectionMatriculas.find({ matricula: x }).toArray().then(item => {
        console.log(item);
        const contemMatricula = item.length > 0 ? true : false;
        res.send(contemMatricula);
    });
});


//"mongodb://localhost:27017/"
app.listen((process.env.PORT || 9000), () => {
    MongoClient.connect(url, { useNewUrlParser: true }, (error, client) => {
        if (error) {throw error;}
        database = client.db(db_n);
        collectionAulas = database.collection('aulas');
        collectionMatriculas = database.collection('matriculas');
        console.log("Conectado ao banco de dados: " + db_n + ".");
    });
    console.log("SERVER ON");
});



function solve(itens) {
    
    let obj = [
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        []
    ]

    if (itens.length > 0) {
        for (let i = 0; i < itens.length; i++) {
            if (itens[i].textArea.length > 0) {
                let coments = {
                    id: 0,
                    matricula: '',
                    comentario: ''
                };
                coments.id = i; coments.matricula = itens[i].matricula; coments.comentario = itens[i].textArea;
                obj[5].push(coments);
            }
            for (let j = 0; j < itens[i].values.length; j++) {
                if (itens[i].values[j] === 1) {
                    obj[0][j] += 1;
                } else if (itens[i].values[j] === 2) {
                    obj[1][j] += 1;
                } else if (itens[i].values[j] === 3) {
                    obj[2][j] += 1;
                } else if (itens[i].values[j] === 4) {
                    obj[3][j] += 1;
                } else if (itens[i].values[j] === 5) {
                    obj[4][j] += 1;
                }
            }
        }
    }
    return obj;
}
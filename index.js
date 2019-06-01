const express = require('express');

const MongoClient = require("mongodb").MongoClient;
const ObjectId = require("mongodb").ObjectID;

const aulas = require('./models/Aula');
const app = express();
const PORT = 9000;
const bodyParser = require('body-parser');
const funcao = require('./Funcoes');
const cors = require("cors");

const url = "mongodb+srv://deploy:dbicc321@cluster0-r58uk.mongodb.net/test?retryWrites=true&w=majority";
const db_n = "dbicc";

let database, collection;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json(), function (req, res, next) {

    res.header("Allow", "OPTIONS, GET, POST");
    //res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Access-Control-Allow-Origin, X-Requested-With, Content-Type, Accept");
    next();

});


app.post('/salvaValores', (req, res) => {
    //res.json(req.body.values);
    console.log(req.body);
    collection.insert(req.body, (error, result) => {
        if (error) {
            console.log(error);
        }
        res.send(result.result);
    });
    //await funcao.updateAvaliacoes(req.body.values, req.body.matricula, req.body.textArea);
});


app.get('/pegaValores', (req, res1) => {
    console.log("Dados recuperados");
    const t = req.query.data;
    console.log(t);
    //let d = new Date();
    //let dataAtual = (d.getDate() < 9 ? "0" + d.getDate() : d.getDate()) + "/" + (d.getMonth() < 9 ? "0"+ (d.getMonth() + 1) : (d.getMonth() + 1)) + "/" + d.getFullYear();
    /*aulas.find( { data : t } ).then(res => {
        let a = [0, 0, 0, 0];
        let arr = res.map((obj) => {return { notas: obj.avaliacoes }});
        for (let i = 0; i < arr.length; i++) {
            for (let j = 0; j < arr[i].notas.length; j++) {
                a[j] += arr[i].notas[j];
            }
        }
        res1.send(a);
    });*/

    collection.find({ data: t }).toArray().then(itens => {
        //console.log(itens);
        let a = [0, 0, 0, 0];
        //console.log(itens[0].values);
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

(error, result) => {
    if (error) {return res1.status(500).send(error);}
    const reducer = (acum, atual) => acum + atual;
    let a = [0, 0, 0, 0];
    //let arr = result.map((obj) => {return { notas: obj.avaliacoes }});
    let arr = result[0];
    if (!(arr === undefined)) {
        console.log(arr["values"]);
        console.log(arr["values"].reduce(reducer));
    }
}


app.listen(PORT || process.env.PORT, () => {
    MongoClient.connect(url, { useNewUrlParser: true }, (error, client) => {
        if (error) {throw error;}
        database = client.db(db_n);
        collection = database.collection('aulas');
        console.log("Conectado ao banco de dados: " + db_n + ".");
    });
    console.log("SERVER ON");
});

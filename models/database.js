const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

mongoose.connect("mongodb://127.0.0.1:27017/dbicc", { useNewUrlParser: true }).then(() => {
    console.log("Banco de dados ON!");
}).catch(err => console.log(err));

module.exports = mongoose;
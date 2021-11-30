const mongoose = require('mongoose');

const url = 'mongodb://localhost:27017/todo';


//TIRAR O r do user e colocar apenas use, mostrar para a turma e salvar novamente
mongoose.connect(url, {useNewUrlParser: true});

module.exports = mongoose;



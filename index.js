


// config inicial
require('dotenv').config()
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();



const port = 3000;


// forma de ler json

app.use(
    express.urlencoded({
        extended: true,
    }),
)

app.use(express.json())
app.use((req, res, next) =>{
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", 'GET, PUT, POST, DELETE')
    app.use(cors());
    next();
})


// rotas da api
const personRoutes = require('./routes/personRoutes') // está puxando as rotas do arquivo personRoutes.js 
app.use('/person', personRoutes)

// rota inicial
app.get('/', (req, res) => {  //recebe uma requisiçção get e retorna o que ta no send embaixo, no caso vai retornar no proprio browser
    res.json({message: 'Hello world'});
})


const DB_USER = process.env.DB_USER
const DB_PASSWORD = process.env.DB_PASSWORD

mongoose.connect(`mongodb+srv://${DB_USER}:${DB_PASSWORD}@apicluster.ugf8i7u.mongodb.net/bancodaapi?retryWrites=true&w=majority`)

// .then serve para mostrar caso de certo o codigo, tipo o try do python
.then(() =>{
    app.listen(port, () => {   //faz o app rodar e vai retornar no terminal o local que esta rodando 
        console.log(`App listening on port http://localhost:${port}`);
        console.log('Database connected');
    })
})

// .catch é caso der errado, ele vai logar o erro no console 
.catch((err) => console.log(err))
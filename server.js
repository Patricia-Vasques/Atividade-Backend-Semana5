const express = require ("express");
const rotas = require('./routes')
const app = express();


app.use(express.json());
app.use(rotas);

app.listen(8086, ()=> {
    console.log("Servidor rodando na porta http://localhost:8086")
})
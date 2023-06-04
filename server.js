const express = require ("express");
const app = express();


app.get("/", (req, res) =>{
    res.send("Bem vindo a minha API");
})

app.listen(8086, ()=> {
    console.log("Servidor rodando na porta http://localhost:8086")
})
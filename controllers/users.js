const express = require("express");

const app = express();


app.use(express.json());

module.exports = class UsersController {
    //Exercício 2 - Criando o método PATCH (atualiza alguns campos juntos de uma vez)

    static async retorneUsers(req, res){
        let lista  = ['Pedro', 'José', 'Aderbal', 'Danilo', 'Luisa', 'Vitoria']

        //Extrai o valor do parâmetro e atribui uma variável
        const {name} = req.params;
        const moverNome = name;

        //verifica se o nome está na lista 
        if (!lista.includes(moverNome)) {
            return res.status(400).send(`O nome ${moverNome} não está na lista`);
        }

        //Verificar se o nome está na posição 0, ou seja, se é o primeiro da lista
        if(lista.indexOf(moverNome) === 0){
            //Se estiver na primeira posição retorna uma resposta Ok e envia a lista completa
            return res.status(200).send(lista);
        } else{
            //salva a posição do nome na lista em uma variável
            let posicao = lista.indexOf(moverNome);

        //remove o elemento da lista que está na posição indicada pela variável chamada "posicao"
        lista.splice(posicao, 1);

        //adicionar o nome removido na primeira posição da lista
        lista.unshift(moverNome);

        //retonar uma resposta HTTP com status 200 e envia a lista como resposta
        return res.status(200).send(lista)
    }
}}
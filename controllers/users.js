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
}

// Exercício 3 - criando o endpoint GET (faz listagem de dados), para listar datas a partir de um mês informado
    static listarDatas(req, res) {
        //Extrair o valor do parâmetro de mês e atribuir em uma variável chamada mes
        const { mes } = req.params;

        //Verificando se o mês está entre 1 a 12 para ser válido
        if(mes < 1 || mes > 12 ){
            return res.status(400).send(`O mês ${mes} não existe`)
        }

        // Criar um objeto de data com o mês e ano atual
        const atualData = new Date();
        const atualAno = atualData.getFullYear();

        //Define o mês e o ano com base nos parâmetros fornecidos
        const dataSelecionada = new Date(atualAno, mes -1);

        //Verifica se o mês é válido (aqui considera possíveis datas que não existem como por exemplo 30 de fevereiro)
        if (dataSelecionada.getMonth() !== parseInt(mes) - 1) {
            return res.status(400).send(`O mês ${mes} não existe`);
        }

        //Criar um array para armazenar as datas do mês
        const datas = [];

        //Loop para criar as datas do mês
        while (dataSelecionada.getMonth() === parseInt(mes) - 1) {
            const formatoData = `${dataSelecionada.getDate()}/${parseInt(mes)}/${atualAno}`;
            datas.push(formatoData);
            dataSelecionada.setDate(dataSelecionada.getDate() + 1);
        }

        //Retorna a lista de datas como resposta
        return res.status(200).send(datas);
    }
}
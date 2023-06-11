const express = require("express");
const app = express();
const fs = require('fs');
const path = require ('path');
const { fileURLToPath } = require("url");



app.use(express.json());

module.exports = class UsersController {
    /**
     * Exercício 2 - Criando o método PATCH (atualiza alguns campos juntos de uma vez), para receber uma lista de strings, e
     * retorne a resposta da aquisição dada no exercício
     */

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

    /**
     * Exercício 4 - Criar um endpoint POST(criar novas informações) para enviar um JSON qualquer e 
     * salvar em um arquivo utilizando FileSystem, se o arquivo já existir, criar o novo dado na sequência
     */

    static salvarData(req, res) {
        try{
            const { item } = req.body;

            //Definindo o caminho para o arquivo de dado JSON
            const filePath = path.join(__dirname, 'dados.json');

            //Lendo o conteúdo atual, se ele for existente
            let dados = [];
            if (fs.existsSync(filePath)) {
                const fileContent = fs.readFileSync (filePath, 'utf-8')
                dados = JSON.parse(fileContent);
            }

            //Adicioana o novo item ao array de dados
            dados.push({ item });

            //Salva o array atualizado no arquivo
            fs.writeFileSync(filePath, JSON.stringify(dados));
            return res.status(200).send(dados);
        } catch (error) {
            console.error('Erro ao salvar os dados:', error);
            return res.status(500).send ('Erro ao salvar dados');
        }
    }

    /** Exercício 5 - Utilizando o arquivo user.json fornecido, criar um endpoint GET que deverá
     * retornar s dados de acordo com o filtro aplicado na Query da requisição
    */

    static filtrarDados (req, res) {
        const { ageMin, ageMax, state, job } = req.query;

        //Ler dados do arquivo user.json
        const filePath = path.join(__dirname, "../database/dados.json");
        const fileContent = fs.readFileSync(filePath, 'utf-8');
        const users = JSON.parse(fileContent);

        //Usando os critérios para filtrar os usuários
        const filteredUsers = users.filter(user => {
            const isAgeInRange = (ageMin && user.age >= ageMin) || (ageMax && user.age <= ageMax);
            const isStateMatched = state ? user.state.toLowerCase() === state.toLowerCase() : true;
            const isJobMatched = job ? user.job.toLowerCase() === job.toLowerCase() : true;

            return isAgeInRange && isStateMatched && isJobMatched;
        });

        //Retornando os usuários filtrados como resposta
        return res.status(200).json(filteredUsers);
    }

    /**Exercício 6 - Criar um endpoint PUT (atualiza todos os campos de uma vez) para alterar o arquivo JSON */

    static alterarDados (req, res) {
        try{
            const { id } = req.params;
            const novosValores = req.body;

            //Definir o caminho para o arquivo de dados JSON
            const filePath = path.join(__dirname, './user.json');

            //Lendo o conteúdo atual do arquivo JSON
            let dadosJson = [];
            if(fs.existsSync(filePath)) {
                const fileContent = fs.readFileSync(filePath, 'utf-8');
                dadosJson = JSON.parse(fileContent);
            }
        
        //Encontrando o índice do item com o ID fornecido
        const indiceItem = dadosJson.findIndex(item => item.id === id);

        //Verificando se o item com ID existe
        if(indiceItem === -1) {
            return res.status(400).send(`Item com o ID ${id} não existe`);
        }

        //Obtendo os valores atuais do item
        const valoresAtuais = dados[indiceItem];
        
        //Verificando se os valores atuais são diferentes dos já existentes
        if(JSON.stringify(valoresAtuais) === JSON.stringify(novosValores)) {
            return res.status(200).send('Não há alterações a serem feitas');
        }

        dadosJson[indiceItem] = { id, ...novosValores };

        //salvando o array atualizado no arquivo
        fs.writeFileSync(filePath, JSON.stringify(dadosJson));
        return res.status(200).send(dadosJson);
    } catch (error) {
        console.error('Erro ao alterar os dados:', error);
        return res.status(500).send ('Erro ao alterar os dados');
    }
}

/**Exerício 7 - Crie um endpoint que no parâmetro da requisição seja informado um ID. 
 * Leia o JSON do roteiro previamente cadastrado e delete o item referente ao ID informado. 
 * Caso o ID não exista, devolva uma mensagem de erro apropriada, informando o motivo.
 */

static removerItem(req, res) {
    try{
        const {id} = req.params;

        //Definir o caminho para o arquivo de dados do JSON
        const filePath = path.join(__dirname, './user.json');

        //Lendo o conteúdo atual do arquivo JSON
        let dadosJson = [];
        if (fs.existsSync(filePath)) {
          const fileContent = fs.readFileSync(filePath, 'utf-8');
          dadosJson = JSON.parse(fileContent);
    }

    //Encontrando o índice do item com o ID fornecido
    const indiceItem = dadosJson.findIndex((item) => item.id === id);

    // Verificando se o item com ID existe
    if (indiceItem === -1) {
        return res.status(400).send(`Item com o ID ${id} não existe`);
      }
  
      // Removendo o item do array
      dadosJson.splice(indiceItem, 1);
  
      // Salvando o array atualizado no arquivo
      fs.writeFileSync(filePath, JSON.stringify(dadosJson));
  
      return res.status(200).send(dadosJson);
    } catch (error) {
      console.error('Erro ao remover o item:', error);
      return res.status(500).send('Erro ao remover o item');
    }
}

/**Exercício 8 - Utilizando o JSON fornecido no roteiro do exercício, crie um método GET que ao receber um ID no params 
 * retorna o nome do usuário cadastrado. Se o ID não está disponível na lista, apresente o código http apropriado. */

static nomeUsuario(req, res) {
    try {
        const { id } = req.params;

        //Ler dados do arquivo JSON
        const filePath = path.join(__dirname, '/user.json');
        const fileContent = fs.readFileSync(filePath, 'utf-8');
        const dados = JSON.parse(fileContent);
    
        // Procurar o usuário com o ID fornecido
        const usuario = dados.find((item) => item.id === id);
    
        // Verificar se o usuário foi encontrado
        if (!usuario) {
          return res.status(404).send(`Usuário com o ID ${id} não encontrado`);
        }

        // Retornar o nome do usuário
        const { nome } = usuario;
        return res.status(200).json({ nome });
     }     catch (error) {
        console.error('Erro ao obter o nome do usuário:', error);
        return res.status(500).send('Erro ao obter o nome do usuário');
    }
    }
}

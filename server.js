// server.js

// Importar pacotes/bibliotecas
import express from "express";
import dotenv from "dotenv";

// Importar Lista de Array
import dados from "./src/data/dados.js";
const { bruxos } = dados;

// Criar aplicação com Express e configurar para aceitar JSON
const app = express();
app.use(express.json());

// Carregar variáveis de ambiente e definir constante para porta do servidor
dotenv.config();
const serverPort = process.env.PORT || 3001;

// Rota principal GET para "/"
app.get("/", (req, res) => {
    res.send("🚀 Servidor funcionando...");
});

app.get("/bruxos", (req, res) => {
    const { casa, ano, especialidade, nome } = req.query;
    let resultado = bruxos;

    if (casa) {
        resultado = resultado.filter((b) => b.casa.toLowerCase().includes(casa.toLowerCase()));
    }

    if (ano) {
        resultado = resultado.filter((b) => b.ano == ano);
    }

    if (especialidade) {
        resultado = resultado.filter((b) => b.especialidade.toLowerCase().includes(especialidade.toLowerCase()));
    }

    if (nome) {
        resultado = resultado.filter((b) => b.nome.toLowerCase().includes(nome.toLowerCase()));
    }

    res.status(200).json({
        total: resultado.length,
        data: resultado,
    });
});


//Adicionar o bruxo na minha lista
//usar body para capturar informações
//mudar o nodemon para node no package
//verbo:POST

app.post("/bruxos", (req,res) =>{
    const{nome, casa, ano, varinha, mascote, patrono, especialidade, vivo} = req.body

    //quais itens são obrigatorios?
    if(!nome || !casa){
        return res.status(400).json({
            sucess: false,
            message: "Nome e casa são obrigatórios para um bruxo"
        })
    }
//criar bruxo
    const novoBruxo = {
        id: bruxos.length +1,
        nome,
        casa,
        ano: parseInt(ano),
        varinha,
        mascote,
        patrono,
        especialidade: especialidade || "Ainda não atribuido!",
        vivo: vivo
    }

    //adicionar na lista
    bruxos.push(novoBruxo)

    res.status(201).json({
        sucess: true,
        message: "Novo bruxo adicionado em hogwarts",
        data: novoBruxo
    })
})




// Iniciar servidor escutando na porta definida
app.listen(serverPort, () => {
    console.log(`🚀 Servidor rodando em http://localhost:${serverPort} 🚀`);
})

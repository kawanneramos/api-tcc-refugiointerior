require('dotenv').config();
const express = require('express'); 
const cors = require('cors');

const router = require('./src/routes/routes-jamily'); 

const app = express(); 

// Configurar CORS para permitir frontend
app.use(cors({
    origin: 'http://localhost:3000', // Seu frontend Next.js
    credentials: true
})); 

app.use(express.json()); 

// Log de requisições
app.use((req, res, next) => {
    console.log(`🌐 ${new Date().toLocaleTimeString()} - ${req.method} ${req.url}`);
    next();
});

// Usar rotas
app.use(router);

// Servir arquivos estáticos
app.use('/public', express.static('public'));

const porta = process.env.PORT || 3333;

app.listen(porta, () => {
    console.log(`🚀 Servidor API iniciado em http://localhost:${porta}`);
    console.log(`📁 Pasta pública: http://localhost:${porta}/public`);
});

app.get('/', (request, response) => {
    response.json({
        mensagem: 'API Refúgio Interior - Online',
        versao: '1.0.0',
        rotas: {
            publicacoes: 'GET /publicacoes',
            usuarios: 'GET /usuarios',
            agendamentos: 'GET /agendamentos'
        }
    });
});

// Rota de saúde da API
app.get('/health', (request, response) => {
    response.json({
        status: 'online',
        timestamp: new Date().toISOString()
    });
});
// Importa o framework Express para criar a aplicação web do servidor
import express from 'express';
import cors from 'cors';

const corsOptions = {
  origin: 'http://localhost:8000',
  optionsSuccessStatus: 200,
};

// Importa o módulo Multer para lidar com o upload de arquivos
import multer from 'multer';

// Importa funções do controlador de posts de um arquivo separado
import {
  listarPosts, // Função para obter uma lista de posts
  postarNovoPost, // Função para criar um novo post
  uploadImagem,
  atualizarNovoPost,
} from '../controllers/postController.js';

// Configura o armazenamento para arquivos usando o Multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // Define o diretório para salvar os arquivos enviados (crie a pasta 'uploads' se não existir)
    cb(null, './uploads/');
  },
  filename: function (req, file, cb) {
    // Mantém o nome original do arquivo para consistência
    cb(null, file.originalname);
  },
});

// Cria uma instância do Multer usando a configuração de armazenamento definida anteriormente
const upload = multer({ storage });

// Define uma função para configurar as rotas da aplicação
const routes = (app) => {
  // Habilita o parseamento de dados JSON no corpo das requisições
  app.use(express.json());
  app.use(cors(corsOptions));
  // Rota GET para listar posts existentes (acessada em '/posts')
  app.get('/posts', listarPosts);

  // Rota POST para criar um novo post (enviando dados para '/posts')
  app.post('/posts', postarNovoPost);

  // Rota POST para upload de imagem (enviando arquivo para '/upload')
  //   - O middleware `upload.single('imagem')` do Multer lida com um único arquivo de imagem chamado 'imagem'
  //   - Após o upload bem-sucedido, a função `uploadImagem` é chamada para processar a imagem
  app.post('/upload', upload.single('imagem'), uploadImagem);

  app.put('/upload/:id', atualizarNovoPost);
};

// Exporta a função `routes` para ser usada no arquivo principal do servidor
export default routes;

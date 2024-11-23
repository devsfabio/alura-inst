import {
  getTodosPosts,
  criarPost,
  atualizarPost,
} from '../models/postModels.js';
import fs from 'fs';

import gerarDescricaoComGemini from '../services/geminiService.js';

// Importa as funções para obter todos os posts e criar um novo post do módulo 'postModels.js'
// Importa o módulo 'fs' para realizar operações com o sistema de arquivos

export async function listarPosts(req, res) {
  // Define uma função assíncrona para listar todos os posts
  const posts = await getTodosPosts(); // Chama a função para obter todos os posts e aguarda a resposta
  res.status(200).json(posts); // Envia uma resposta HTTP com status 200 (sucesso) e os posts no formato JSON
}

export async function postarNovoPost(req, res) {
  // Define uma função assíncrona para criar um novo post
  const novoPost = req.body; // Obtém os dados do novo post enviados no corpo da requisição
  try {
    // Tenta executar o código dentro do bloco try
    const postCriado = await criarPost(novoPost); // Chama a função para criar um novo post e aguarda a resposta
    res.status(200).json(postCriado); // Envia uma resposta HTTP com status 200 (sucesso) e o post criado no formato JSON
  } catch (erro) {
    // Se ocorrer algum erro, entra nesse bloco
    console.error(erro.message); // Imprime a mensagem de erro no console para facilitar o debug
    res.status(500).json({ Error: 'Falha na requisição' }); // Envia uma resposta HTTP com status 500 (erro interno do servidor) e uma mensagem de erro genérica
  }
}

export async function uploadImagem(req, res) {
  // Define uma função assíncrona para fazer upload de uma imagem e criar um novo post
  const novoPost = {
    descricao: '', // Inicializa a descrição como uma string vazia
    imageUrl: req.file.originalname, // Obtém o nome original do arquivo da imagem enviada na requisição
    alt: '', // Inicializa o texto alternativo como uma string vazia
  };

  try {
    // Tenta executar o código dentro do bloco try
    const postCriado = await criarPost(novoPost); // Chama a função para criar um novo post e aguarda a resposta
    const imagemAtualizado = `uploads/${postCriado.insertedId}.png`; // Cria um novo nome para a imagem com base no ID do post
    fs.renameSync(req.file.path, imagemAtualizado); // Renomeia o arquivo da imagem para o novo nome
    res.status(200).json(postCriado); // Envia uma resposta HTTP com status 200 (sucesso) e o post criado no formato JSON
  } catch (erro) {
    // Se ocorrer algum erro, entra nesse bloco
    console.error(erro.message); // Imprime a mensagem de erro no console para facilitar o debug
    res.status(500).json({ Error: 'Falha na requisição' }); // Envia uma resposta HTTP com status 500 (erro interno do servidor) e uma mensagem de erro genérica
  }
}

export async function atualizarNovoPost(req, res) {
  const id = req.params.id;
  const urlImagem = `http://localhost:3000/${id}.png`;

  try {
    const imageBuffer = fs.readFileSync(`uploads/${id}.png`);
    const descricao = await gerarDescricaoComGemini(imageBuffer);

    const post = {
      imageUrl: urlImagem,
      descricao: descricao,
      alt: req.body.alt,
    };

    const postCriado = await atualizarPost(id, post);

    res.status(200).json(postCriado);
  } catch (erro) {
    console.error(erro.message);
    res.status(500).json({ Error: 'Falha na requisição' }); //
  }
}

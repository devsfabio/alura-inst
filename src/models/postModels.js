import 'dotenv/config';

import { ObjectId } from 'mongodb';
import conectarAoBanco from '../config/dbConfig.js';

// Importa a função 'conectarAoBanco' do arquivo 'dbConfig.js'. Essa função é responsável por estabelecer a conexão com o banco de dados MongoDB.

const conexao = await conectarAoBanco(process.env.STRING_CONEXAO);

// Chama a função 'conectarAoBanco' e passa a string de conexão como argumento. A string de conexão é obtida da variável de ambiente 'STRING_CONEXAO'. A palavra-chave 'await' indica que a função é assíncrona e espera que a conexão seja estabelecida antes de continuar.

export async function getTodosPosts() {
  // Define uma função assíncrona chamada 'getTodosPosts' para obter todos os posts.

  const db = conexao.db('imersao-instabytes');
  // Obtém uma referência ao banco de dados 'imersao-instabytes' a partir da conexão estabelecida.

  const colecao = db.collection('post');
  // Obtém uma referência à coleção 'post' dentro do banco de dados.

  return colecao.find().toArray();
  // Utiliza o método 'find()' para buscar todos os documentos da coleção 'post' e o método 'toArray()' para convertê-los em um array. O resultado é retornado pela função.
}

export async function criarPost(novoPost) {
  // Define uma função assíncrona chamada 'criarPost' para criar um novo post.

  const db = conexao.db('imersao-instabytes');
  // Obtém uma referência ao banco de dados 'imersao-instabytes' a partir da conexão estabelecida.

  const colecao = db.collection('post');
  // Obtém uma referência à coleção 'post' dentro do banco de dados.

  return colecao.insertOne(novoPost);
  // Utiliza o método 'insertOne()' para inserir o novo post na coleção 'post'. O método retorna um objeto com informações sobre o documento inserido, incluindo o ID gerado automaticamente.
}

export async function atualizarPost(id, novoPost) {
  const db = conexao.db('imersao-instabytes');
  const colecao = db.collection('post');
  const objID = ObjectId.createFromHexString(id);
  return colecao.updateOne({ _id: new ObjectId(objID) }, { $set: novoPost });
}

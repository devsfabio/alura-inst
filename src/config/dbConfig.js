import { MongoClient } from 'mongodb';

// Importa a classe MongoClient do pacote 'mongodb'. Essa classe é fundamental para interagir com o banco de dados MongoDB.

export default async function conectarAoBanco(stringConexao) {
  // Define uma função assíncrona chamada 'conectarAoBanco' que recebe como parâmetro a string de conexão com o banco de dados. Essa função será exportada para ser utilizada em outros módulos.

  let mongoClient;
  // Declara uma variável 'mongoClient' para armazenar a instância do cliente MongoDB. Essa variável será inicializada dentro do bloco try.

  try {
    // Inicia um bloco try-catch para tratar possíveis erros durante a conexão.

    mongoClient = new MongoClient(stringConexao);
    // Cria uma nova instância do cliente MongoDB, passando a string de conexão como argumento. Essa instância será usada para realizar operações no banco de dados.

    console.log('Conectando ao cluster do banco de dados...');
    // Imprime uma mensagem no console indicando que a conexão com o banco de dados está sendo estabelecida.

    await mongoClient.connect();
    // Chama o método 'connect()' da instância do cliente MongoDB para estabelecer a conexão com o banco de dados. A palavra-chave 'await' indica que essa operação é assíncrona e a função aguardará até que a conexão seja estabelecida.

    console.log('Conectado ao MongoDB Atlas com sucesso!');
    // Imprime uma mensagem no console indicando que a conexão foi estabelecida com sucesso.

    return mongoClient;
    // Retorna a instância do cliente MongoDB para que possa ser utilizada em outras partes do código para realizar operações no banco de dados.
  } catch (erro) {
    // Se ocorrer algum erro durante a conexão, o código dentro do bloco catch será executado.

    console.error('Falha na conexão com o banco!', erro);
    // Imprime uma mensagem de erro no console, junto com o objeto de erro, para ajudar na identificação do problema.

    process.exit();
    // Encerra a execução do processo, pois a aplicação não pode continuar sem uma conexão com o banco de dados.
  }
}

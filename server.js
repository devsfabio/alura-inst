import express from 'express';
// Importa o módulo 'express', que é a base para criar aplicações web Node.js.

import routes from './src/routes/postRoutes.js';
// Importa o módulo 'routes' do arquivo 'postRoutes.js', que contém as rotas da aplicação. Essas rotas definem as diferentes URLs que a aplicação pode atender e as ações a serem executadas para cada URL.

const app = express();
// Cria uma instância do aplicativo Express, que será usada para configurar e iniciar o servidor.

app.use(express.static('uploads'));

routes(app);
// Chama a função 'routes' passando a instância do aplicativo como argumento. Isso adiciona todas as rotas definidas no arquivo 'postRoutes.js' ao aplicativo.

app.listen(3000, () => {
  console.log('Servidor escutudando...');
});
// Inicia o servidor na porta 3000. A função de callback é executada quando o servidor está pronto para receber requisições. Ela imprime uma mensagem no console indicando que o servidor está ouvindo.

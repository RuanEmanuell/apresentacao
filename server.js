const firebird = require('node-firebird');

// Configuração do banco de dados Firebird
const options = {
  host: 'localhost', // Endereço do servidor Firebird
  port: 3050,        // Porta do servidor Firebird (padrão: 3050)
  database: 'C:\Users\ruanv\OneDrive\Área de Trabalho\apresentacao', // Caminho para o arquivo do banco de dados
  user: 'SYSDBA',    // Usuário do banco de dados
  password: 'masterkey',  // Senha do usuário
  lowercase_keys: false,  // Para manter os nomes das colunas em maiúsculas
  role: null,
  pageSize: 4096
};

// Conectando ao banco de dados
firebird.attach(options, function(err, db) {
  if (err) {
    console.error('Erro ao conectar ao banco de dados:', err.message);
    return;
  }

  console.log('Conexão ao Firebird estabelecida!');

  // Você pode realizar consultas e operações no banco de dados aqui

  // Exemplo de consulta:
  db.query('SELECT * FROM sua_tabela', function(err, result) {
    if (err) {
      console.error('Erro ao executar a consulta:', err.message);
      return;
    }

    console.log('Resultado da consulta:', result);
  });

  // Lembre-se de encerrar a conexão quando não for mais necessária
  db.detach(function(err) {
    if (err) {
      console.error('Erro ao encerrar a conexão:', err.message);
      return;
    }

    console.log('Conexão ao Firebird encerrada!');
  });
});

BACKEND AINDA NÃO FINALIZADO!


Backend da aplicação para avaliação de aula.
O backend foi feito em NodeJs e Express. O banco de dados utilizado foi o MongoDB e o deploy feito no Heroku.


Caso ocorra algum problema ao tentar conectar o banco de dados pode ser que o Mongo da sua máquina esteja desligado,
 neste caso rode o comando ´sudo service mongod start´ e depois teste com o comando ´mongo´.


Para guardar os dados do banco de dados digite no terminal dentro do diretório backend:
´mongodump --db dbicc --collection aulas´

Para recuperar os dados do banco de dados digite no terminal dentro do diretório backend:
´mongorestore --db dbicc dump/dbicc´



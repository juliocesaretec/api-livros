Biblioteca API — Projeto do 3º Bimestre
Sobre o projeto

Este projeto foi desenvolvido durante o 3º bimestre com o objetivo de criar uma aplicação de gerenciamento de livros utilizando uma API conectada a um banco de dados MySQL.

A aplicação permite cadastrar, listar, editar e excluir livros por meio de operações CRUD realizadas através de uma API. Também foi desenvolvida uma interface Front End utilizando HTML, CSS e JavaScript.

O desenvolvimento foi dividido em quatro etapas, começando pela configuração do ambiente e conexão com o banco de dados, passando pela criação do modelo e das rotas da API, até a implementação do CRUD completo e da interface.

Tecnologias utilizadas
Python
FastAPI
MySQL
SQLAlchemy
Pydantic
HTML
CSS
JavaScript
API REST
Etapa 1 — Fundação

Nesta primeira etapa foi realizada a preparação da estrutura do projeto e do ambiente de desenvolvimento.

Atividades realizadas
Configuração do ambiente de desenvolvimento;
Instalação das dependências necessárias;
Criação do banco de dados biblioteca_db;
Configuração da conexão com o MySQL;
Configuração da sessão do banco de dados;
Criação da rota de saúde da API.

A rota de saúde permite verificar se a aplicação está funcionando corretamente.

Rota de saúde
GET /health


Resposta esperada:

{
    "status": "ok"
}

Guia 1

Fundação e configuração do ambiente.

Etapa 2 — Modelo e consultas

Na segunda etapa foi criado o modelo responsável por representar os livros armazenados no banco de dados.

Atividades realizadas
Criação do modelo Livro;
Criação dos schemas;
Configuração da sessão do banco;
Implementação da rota para cadastrar livros;
Implementação da rota para consultar livros.
Principais rotas
Método	Rota	Função
POST	/livros	Cadastrar um livro
GET	/livros	Listar os livros
Exemplo de cadastro
POST /livros

{
    "titulo": "Dom Casmurro",
    "autor": "Machado de Assis",
    "ano": 1899
}

Guia 2

Modelo, schemas e consultas ao banco de dados.

Etapa 3 — CRUD completo

Na terceira etapa foram implementadas todas as operações básicas de um sistema CRUD.

CRUD significa:

Create: criar;
Read: consultar;
Update: atualizar;
Delete: excluir.
Rotas implementadas
Método	Rota	Função
POST	/livros	Cadastrar livro
GET	/livros	Listar livros
GET	/livros/{id}	Buscar um livro
PUT	/livros/{id}	Editar um livro
DELETE	/livros/{id}	Excluir um livro
Tratamento de erros

Também foram implementados tratamentos para situações como:

Livro não encontrado;
ID inválido;
Dados incorretos;
Erros durante operações no banco de dados.

Além disso, foram realizados testes para verificar o funcionamento das operações do CRUD.

Guia 3

Implementação, tratamento de erros e testes do CRUD completo.

Etapa 4 — Front End

Na última etapa foi desenvolvida uma interface para facilitar a utilização da API.

O Front End foi construído utilizando HTML, CSS e JavaScript.

Funcionalidades

A interface permite:

Cadastrar livros;
Visualizar livros cadastrados;
Editar livros;
Excluir livros;
Atualizar a lista de livros;
Consumir os dados disponibilizados pela API.

O JavaScript é responsável por realizar as requisições para a API e atualizar a interface de acordo com as respostas recebidas.

Estrutura do projeto

Uma possível organização dos arquivos é:

biblioteca/
│
├── backend/
│   ├── main.py
│   ├── models.py
│   ├── schemas.py
│   ├── database.py
│   └── routes/
│       └── livros.py
│
├── frontend/
│   ├── index.html
│   ├── style.css
│   └── script.js
│
├── requirements.txt
└── README.md

Banco de dados

O projeto utiliza o MySQL para armazenar os dados dos livros.

Banco utilizado
biblioteca_db


A tabela principal do projeto armazena informações dos livros, como:

id
titulo
autor
ano

Funcionamento da API

O funcionamento da aplicação pode ser representado da seguinte maneira:

┌──────────────┐
│   Front End  │
│ HTML/CSS/JS  │
└──────┬───────┘
       │
       │ Requisições HTTP
       ▼
┌──────────────┐
│     API      │
│   FastAPI    │
└──────┬───────┘
       │
       │ SQLAlchemy
       ▼
┌──────────────┐
│    MySQL     │
│ biblioteca_db│
└──────────────┘


O usuário interage com o Front End, que realiza requisições HTTP para a API. A API processa essas requisições e realiza as operações necessárias no banco de dados MySQL.

Como executar o projeto
1. Clone o projeto
git clone URL_DO_SEU_REPOSITORIO

2. Entre na pasta do projeto
cd biblioteca

3. Crie um ambiente virtual
python -m venv venv

4. Ative o ambiente virtual

No Windows:

venv\Scripts\activate


No Linux ou macOS:

source venv/bin/activate

5. Instale as dependências
pip install -r requirements.txt

6. Configure o banco de dados

Crie o banco de dados no MySQL:

CREATE DATABASE biblioteca_db;


Depois, configure as informações de conexão com o MySQL no projeto.

7. Execute a API
uvicorn main:app --reload


A API ficará disponível localmente.

Documentação da API

Como o projeto utiliza FastAPI, é possível acessar a documentação interativa da API através da rota:

/docs


Exemplo:

http://127.0.0.1:8000/docs


Nessa página é possível visualizar e testar as rotas da API diretamente pelo navegador.

Objetivos alcançados

Durante o desenvolvimento do projeto foram trabalhados conceitos importantes de desenvolvimento de aplicações:

Criação e consumo de APIs;
Operações CRUD;
Integração com banco de dados MySQL;
Utilização do SQLAlchemy;
Criação de modelos e schemas;
Implementação de rotas HTTP;
Tratamento de erros;
Testes da API;
Desenvolvimento de Front End;
Comunicação entre Front End e Back End.
Projeto acadêmico

Este projeto foi desenvolvido como atividade do 3º bimestre, com o objetivo de aplicar na prática os conhecimentos de desenvolvimento Back End, APIs, banco de dados e desenvolvimento Front End.

Sistema de Biblioteca

Funcionalidade principal: gerenciamento de livros através de uma API e de uma interface web.

Conclusão

Ao final das quatro etapas, foi desenvolvido um sistema de biblioteca capaz de realizar operações de cadastro, consulta, edição e exclusão de livros.

O projeto demonstra a integração entre Front End, API e banco de dados, colocando em prática conceitos fundamentais para o desenvolvimento de aplicações web.
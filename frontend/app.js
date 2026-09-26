const URL_API = "http://127.0.0.1:8000";

const formulario = document.querySelector("#book-form");
const campoId = document.querySelector("#book-id");
const campoTitulo = document.querySelector("#title");
const campoAutor = document.querySelector("#author");
const campoAno = document.querySelector("#publication-year");
const campoDisponivel = document.querySelector("#available");

const botaoSalvar = document.querySelector("#submit-button");
const botaoCancelar = document.querySelector("#cancel-button");
const botaoAtualizar = document.querySelector("#refresh-button");

const mensagemFormulario = document.querySelector("#form-message");
const mensagemLista = document.querySelector("#list-message");

const corpoTabela = document.querySelector("#books-table-body");
const estadoVazio = document.querySelector("#empty-state");
const modoFormulario = document.querySelector("#form-mode");


function mostrarMensagem(elemento, mensagem, tipo = "") {
  elemento.textContent = mensagem;
  elemento.className = `message ${tipo}`;
}


function definirCarregamentoFormulario(carregando) {
  botaoSalvar.disabled = carregando;

  if (carregando) {
    botaoSalvar.textContent = "Salvando...";
  } else {
    botaoSalvar.textContent = campoId.value
      ? "Atualizar livro"
      : "Salvar livro";
  }
}


function limparFormulario() {
  formulario.reset();
  campoId.value = "";
  campoDisponivel.checked = true;

  modoFormulario.textContent = "Novo registro";
  botaoSalvar.textContent = "Salvar livro";
  botaoCancelar.hidden = true;

  mostrarMensagem(mensagemFormulario, "");
}


function iniciarEdicao(livro) {
  campoId.value = livro.id;
  campoTitulo.value = livro.titulo;
  campoAutor.value = livro.autor;
  campoAno.value = livro.ano_publicacao;
  campoDisponivel.checked = livro.disponivel;

  modoFormulario.textContent = "Editando registro";
  botaoSalvar.textContent = "Atualizar livro";
  botaoCancelar.hidden = false;

  campoTitulo.focus();

  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
}


function escaparHtml(valor) {
  const div = document.createElement("div");
  div.textContent = valor ?? "";
  return div.innerHTML;
}


function criarLinhaLivro(livro) {
  const linha = document.createElement("tr");

  const status = livro.disponivel
    ? '<span class="status-available">Disponível</span>'
    : '<span class="status-unavailable">Indisponível</span>';

  linha.innerHTML = `
    <td>${escaparHtml(livro.titulo)}</td>
    <td>${escaparHtml(livro.autor)}</td>
    <td>${livro.ano_publicacao}</td>
    <td>${status}</td>
    <td>
      <div class="actions">
        <button
          type="button"
          class="action-button edit"
          data-action="edit"
        >
          Editar
        </button>

        <button
          type="button"
          class="action-button delete"
          data-action="delete"
        >
          Excluir
        </button>
      </div>
    </td>
  `;

  linha.querySelector('[data-action="edit"]').addEventListener("click", () => {
    iniciarEdicao(livro);
  });

  linha.querySelector('[data-action="delete"]').addEventListener("click", () => {
    excluirLivro(livro.id);
  });

  return linha;
}


async function lerErro(resposta) {
  try {
    const dados = await resposta.json();

    if (dados.detail) {
      if (Array.isArray(dados.detail)) {
        return dados.detail
          .map((erro) => erro.msg)
          .join(", ");
      }

      return dados.detail;
    }

    return "Ocorreu um erro na operação.";
  } catch {
    return "Ocorreu um erro na operação.";
  }
}


async function carregarLivros() {
  mostrarMensagem(mensagemLista, "Carregando livros...");

  try {
    const resposta = await fetch(`${URL_API}/livros`);

    if (!resposta.ok) {
      throw new Error(await lerErro(resposta));
    }

    const livros = await resposta.json();

    corpoTabela.innerHTML = "";

    if (livros.length === 0) {
      estadoVazio.hidden = false;
      mostrarMensagem(mensagemLista, "");
      return;
    }

    estadoVazio.hidden = true;

    livros.forEach((livro) => {
      corpoTabela.appendChild(criarLinhaLivro(livro));
    });

    mostrarMensagem(
      mensagemLista,
      `${livros.length} livro(s) encontrado(s).`
    );
  } catch (erro) {
    mostrarMensagem(
      mensagemLista,
      `Erro ao carregar livros: ${erro.message}`,
      "error"
    );
  }
}


async function salvarLivro(evento) {
  evento.preventDefault();

  const livro = {
    titulo: campoTitulo.value.trim(),
    autor: campoAutor.value.trim(),
    ano_publicacao: Number(campoAno.value),
    disponivel: campoDisponivel.checked,
  };

  const id = campoId.value;

  const url = id
    ? `${URL_API}/livros/${id}`
    : `${URL_API}/livros`;

  const metodo = id ? "PUT" : "POST";

  definirCarregamentoFormulario(true);

  try {
    const resposta = await fetch(url, {
      method: metodo,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(livro),
    });

    if (!resposta.ok) {
      throw new Error(await lerErro(resposta));
    }

    mostrarMensagem(
      mensagemFormulario,
      id
        ? "Livro atualizado com sucesso!"
        : "Livro cadastrado com sucesso!"
    );

    limparFormulario();
    await carregarLivros();
  } catch (erro) {
    mostrarMensagem(
      mensagemFormulario,
      `Erro ao salvar livro: ${erro.message}`,
      "error"
    );
  } finally {
    definirCarregamentoFormulario(false);
  }
}


async function excluirLivro(id) {
  const confirmar = window.confirm(
    "Tem certeza que deseja excluir este livro?"
  );

  if (!confirmar) {
    return;
  }

  try {
    const resposta = await fetch(`${URL_API}/livros/${id}`, {
      method: "DELETE",
    });

    if (!resposta.ok) {
      throw new Error(await lerErro(resposta));
    }

    mostrarMensagem(
      mensagemLista,
      "Livro excluído com sucesso!"
    );

    await carregarLivros();
  } catch (erro) {
    mostrarMensagem(
      mensagemLista,
      `Erro ao excluir livro: ${erro.message}`,
      "error"
    );
  }
}


formulario.addEventListener("submit", salvarLivro);

botaoCancelar.addEventListener("click", limparFormulario);

botaoAtualizar.addEventListener("click", carregarLivros);

carregarLivros();
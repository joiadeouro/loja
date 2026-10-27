
/* CONFIGURAÇÃO DA LOJA */

// Coloque o WhatsApp da loja com código do país, DDD e número.
// Exemplo fictício: 5511999999999
const WHATSAPP = "5500000000000";

const produtos = [
    {
        id: 1,
        nome: "Anel Aurora",
        categoria: "Anéis",
        preco: 129.90,
        descricao: "Elegância para todos os momentos.",
        imagem: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=600&q=80"
    },
    {
        id: 2,
        nome: "Colar Serena",
        categoria: "Colares",
        preco: 189.90,
        descricao: "Um brilho delicado e atemporal.",
        imagem: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=600&q=80"
    },
    {
        id: 3,
        nome: "Brincos Luna",
        categoria: "Brincos",
        preco: 89.90,
        descricao: "O toque final para seu visual.",
        imagem: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=600&q=80"
    },
    {
        id: 4,
        nome: "Pulseira Dourada",
        categoria: "Pulseiras",
        preco: 149.90,
        descricao: "Sofisticação em cada detalhe.",
        imagem: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?auto=format&fit=crop&w=600&q=80"
    },
    {
        id: 5,
        nome: "Anel Solitário",
        categoria: "Anéis",
        preco: 219.90,
        descricao: "Uma joia para ocasiões especiais.",
        imagem: "https://images.unsplash.com/photo-1603561591411-07134e71a2a9?auto=format&fit=crop&w=600&q=80"
    },
    {
        id: 6,
        nome: "Colar Encanto",
        categoria: "Colares",
        preco: 169.90,
        descricao: "Delicado, moderno e elegante.",
        imagem: "https://images.unsplash.com/photo-1611652022419-a9419f74343d?auto=format&fit=crop&w=600&q=80"
    },
    {
        id: 7,
        nome: "Argolas Clássicas",
        categoria: "Brincos",
        preco: 99.90,
        descricao: "Um clássico que nunca sai de moda.",
        imagem: "https://images.unsplash.com/photo-1630019852942-f89202989a59?auto=format&fit=crop&w=600&q=80"
    },
    {
        id: 8,
        nome: "Pulseira Elo",
        categoria: "Pulseiras",
        preco: 139.90,
        descricao: "Beleza e personalidade para você.",
        imagem: "https://images.unsplash.com/photo-1573408301185-9146fe634ad0?auto=format&fit=crop&w=600&q=80"
    }
];

// Carrinho mantido durante a utilização da página.
let carrinho = [];

const dinheiro = valor =>
    valor.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
    });

/* MOSTRAR PRODUTOS */

function mostrarProdutos(categoria = "Todos") {
    const lista = document.getElementById("listaProdutos");

    const filtrados = categoria === "Todos"
        ? produtos
        : produtos.filter(p => p.categoria === categoria);

    lista.innerHTML = filtrados.map(produto => `
        <article class="produto">
            <img
                src="${produto.imagem}"
                alt="${produto.nome}"
                loading="lazy"
            >

            <div class="produto-info">
                <small>${produto.categoria}</small>
                <h3>${produto.nome}</h3>
                <p>${produto.descricao}</p>
                <div class="preco">${dinheiro(produto.preco)}</div>

                <button
                    class="botao"
                    style="width:100%"
                    data-adicionar="${produto.id}"
                >
                    Adicionar à sacola
                </button>
            </div>
        </article>
    `).join("");
}

/* ADICIONAR AO CARRINHO */

function adicionarAoCarrinho(id) {
    const produto = produtos.find(p => p.id === Number(id));

    if (!produto) return;

    const item = carrinho.find(p => p.id === produto.id);

    if (item) {
        item.quantidade++;
    } else {
        carrinho.push({
            ...produto,
            quantidade: 1
        });
    }

    atualizarCarrinho();
}

/* ATUALIZAR CARRINHO E VALORES */

function atualizarCarrinho() {
    const lista = document.getElementById("itensCarrinho");
    const quantidade = carrinho.reduce(
        (total, item) => total + item.quantidade,
        0
    );

    const total = carrinho.reduce(
        (soma, item) => soma + item.preco * item.quantidade,
        0
    );

    document.getElementById("quantidadeCarrinho")
        .textContent = quantidade;

    document.getElementById("totalCarrinho")
        .textContent = dinheiro(total);

    if (carrinho.length === 0) {
        lista.innerHTML = `
            <p style="padding:25px 0;line-height:1.8">
                Sua sacola está vazia.
                Que tal escolher uma joia especial? ✨
            </p>
        `;
        return;
    }

    lista.innerHTML = carrinho.map(item => `
        <div class="item-carrinho">
            <div>
                <strong>${item.nome}</strong>
                <p>${dinheiro(item.preco)} cada</p>

                <button data-diminuir="${item.id}">−</button>
                <span>${item.quantidade}</span>
                <button data-aumentar="${item.id}">+</button>

                <button data-remover="${item.id}">
                    Remover
                </button>
            </div>

            <strong>
                ${dinheiro(item.preco * item.quantidade)}
            </strong>
        </div>
    `).join("");
}

/* ALTERAR QUANTIDADES */

function alterarQuantidade(id, alteracao) {
    const item = carrinho.find(p => p.id === Number(id));

    if (!item) return;

    item.quantidade += alteracao;

    if (item.quantidade <= 0) {
        carrinho = carrinho.filter(p => p.id !== Number(id));
    }

    atualizarCarrinho();
}

function removerProduto(id) {
    carrinho = carrinho.filter(p => p.id !== Number(id));
    atualizarCarrinho();
}

/* ABRIR E FECHAR A SACOLA */

function abrirCarrinho() {
    document.getElementById("carrinho").classList.add("aberto");
    document.getElementById("fundoCarrinho").classList.add("aberto");
}

function fecharCarrinho() {
    document.getElementById("carrinho").classList.remove("aberto");
    document.getElementById("fundoCarrinho").classList.remove("aberto");
}

document.getElementById("abrirCarrinho")
    .addEventListener("click", abrirCarrinho);

document.getElementById("fecharCarrinho")
    .addEventListener("click", fecharCarrinho);

document.getElementById("fundoCarrinho")
    .addEventListener("click", fecharCarrinho);

/* BOTÕES DOS PRODUTOS E DO CARRINHO */

document.addEventListener("click", evento => {
    const adicionar = evento.target.closest("[data-adicionar]");

    if (adicionar) {
        adicionarAoCarrinho(adicionar.dataset.adicionar);
        return;
    }

    const aumentar = evento.target.closest("[data-aumentar]");

    if (aumentar) {
        alterarQuantidade(aumentar.dataset.aumentar, 1);
        return;
    }

    const diminuir = evento.target.closest("[data-diminuir]");

    if (diminuir) {
        alterarQuantidade(diminuir.dataset.diminuir, -1);
        return;
    }

    const remover = evento.target.closest("[data-remover]");

    if (remover) {
        removerProduto(remover.dataset.remover);
    }
});

/* FILTRAR CATEGORIAS */

document.querySelectorAll("[data-categoria]").forEach(botao => {
    botao.addEventListener("click", () => {
        mostrarProdutos(botao.dataset.categoria);

        document.getElementById("produtos")
            .scrollIntoView({ behavior: "smooth" });
    });
});

/* MENU PARA CELULARES */

document.getElementById("menuToggle")
    .addEventListener("click", () => {
        document.getElementById("menu").classList.toggle("aberto");
    });

document.querySelectorAll("#menu a").forEach(link => {
    link.addEventListener("click", () => {
        document.getElementById("menu").classList.remove("aberto");
    });
});

/* FINALIZAR PELO WHATSAPP */

document.getElementById("finalizarCompra")
    .addEventListener("click", () => {
        if (carrinho.length === 0) {
            alert("Adicione pelo menos um produto à sacola.");
            return;
        }

        if (WHATSAPP === "5500000000000") {
            alert(
                "Configure o número do WhatsApp no arquivo script.js."
            );
            return;
        }

        const itens = carrinho.map(item =>
            `${item.nome} - ${item.quantidade} x ${dinheiro(item.preco)}`
        );

        const total = carrinho.reduce(
            (soma, item) => soma + item.preco * item.quantidade,
            0
        );

        const mensagem =
            "Olá! Gostaria de fazer um pedido na JoiadeOuro:\n\n" +
            itens.join("\n") +
            "\n\nTotal dos produtos: " + dinheiro(total) +
            "\n\nPoderiam me informar o frete e as formas de pagamento?";

        const url = "https://wa.me/" + WHATSAPP +
            "?text=" + encodeURIComponent(mensagem);

        window.open(url, "_blank", "noopener,noreferrer");
    });

/* RODAPÉ E INICIALIZAÇÃO */

document.getElementById("ano").textContent =
    new Date().getFullYear();

document.getElementById("linkWhatsApp").href =
    WHATSAPP === "5500000000000"
        ? "https://wa.me/"
        : "https://wa.me/" + WHATSAPP;

mostrarProdutos();
atualizarCarrinho();

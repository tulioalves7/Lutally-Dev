// Array de produtos
const Product = [ 
    {
        nome: 'palmilha',
        valor: 40,
        quantidade: 300,
    },
    {
        nome: 'cabedal',
        valor: 400,
        quantidade: 170,
    }    
];

// Função para adicionar produto
function addProduct() {
    const nome = document.getElementById('nome').value.trim();
    const valor = Number(document.getElementById('valor').value);
    const quantidade = Number(document.getElementById('quantidade').value);

    if (!nome || isNaN(valor) || isNaN(quantidade) || valor <= 0 || quantidade < 0) {
        alert('Por favor, insira valores válidos.');
        return;
    }

    const exists = Product.find(item => item.nome.toLowerCase() === nome.toLowerCase());
    if (exists) {
        alert(`O produto ${nome} já existe.`);
        return;
    }

    const value = {
        nome: nome,
        valor: valor, 
        quantidade: quantidade
    }; 
    Product.push(value);  
    alert(`Produto ${nome} adicionado com sucesso.`);
    clearForm();
    seeProducts(); // Atualiza a lista de produtos após adicionar
}

// Função para ver produtos
function seeProducts() {
    const productListDiv = document.getElementById('productList');
    productListDiv.innerHTML = ''; // Limpa a lista anterior

    Product.forEach(produto => {
        const productElement = document.createElement('p');
        productElement.textContent = `Nome: ${produto.nome}, Valor: ${produto.valor}, Quantidade: ${produto.quantidade}`;
        productListDiv.appendChild(productElement);
    });
}

// Função para atualizar produto
function updateProduct() {
    const nome = document.getElementById('nome').value.trim();
    const novoValor = Number(document.getElementById('valor').value);
    const novaQuantidade = Number(document.getElementById('quantidade').value);

    const index = Product.findIndex(item => item.nome.toLowerCase() === nome.toLowerCase());

    if (index === -1) {
        alert(`O produto ${nome} não foi encontrado.`);
        return;
    }

    if (novoValor && novoValor > 0) {
        Product[index].valor = novoValor;
    }
    if (!isNaN(novaQuantidade) && novaQuantidade >= 0) {
        Product[index].quantidade = novaQuantidade;
    } else {
        alert('Por favor, insira uma quantidade válida.');
        return;
    }
    
    alert(`Produto ${nome} atualizado com sucesso.`);
    clearForm();
    seeProducts(); // Atualiza a lista de produtos automaticamente após atualizar
}

// Função para deletar produto
function deleteProduct() {
    const nome = document.getElementById('deleteNome').value.trim();

    const index = Product.findIndex(item => item.nome.toLowerCase() === nome.toLowerCase());

    if (index === -1) {
        alert(`O produto ${nome} não foi encontrado.`);
        return;
    }

    Product.splice(index, 1);
    alert(`Produto ${nome} deletado com sucesso.`);
    seeProducts(); // Atualiza a lista de produtos após deletar
}

// Função para processar compra
function purchaseProduct() {
    const nome = document.getElementById('purchaseNome').value.trim();
    const quantidadeDesejada = Number(document.getElementById('purchaseQuantidade').value);

    if (!nome || isNaN(quantidadeDesejada) || quantidadeDesejada <= 0) {
        alert('Por favor, insira valores válidos.');
        return;
    }

    const produto = Product.find(item => item.nome.toLowerCase() === nome.toLowerCase());

    if (!produto) {
        alert(`O produto ${nome} não foi encontrado.`);
        return;
    }

    if (produto.quantidade < quantidadeDesejada) {
        alert(`Quantidade indisponível. Apenas ${produto.quantidade} unidades estão em estoque.`);
        return;
    }

    produto.quantidade -= quantidadeDesejada; // Reduz a quantidade do produto no estoque
    alert(`Compra de ${quantidadeDesejada} unidades do produto ${nome} realizada com sucesso.`);
    seeProducts(); // Atualiza a lista de produtos após a compra
}

// Função para limpar o formulário após adição/atualização/compra
function clearForm() {
    document.getElementById('nome').value = '';
    document.getElementById('valor').value = '';
    document.getElementById('quantidade').value = '';
    document.getElementById('purchaseNome').value = '';
    document.getElementById('purchaseQuantidade').value = '';
}

// Carrega os produtos automaticamente ao carregar a página
document.addEventListener('DOMContentLoaded', seeProducts);

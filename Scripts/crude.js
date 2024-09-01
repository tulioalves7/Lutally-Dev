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
    const nome = document.getElementById('nome').value;
    const valor = document.getElementById('valor').value;
    const quantidade = document.getElementById('quantidade').value;

    const exists = Product.find(item => item.nome === nome);
    if (exists) {
        alert(`O produto ${nome} já existe.`);
        return;
    }

    const value = {
        nome: nome,
        valor: Number(valor), 
        quantidade: Number(quantidade)
    }; 
    Product.push(value);  
    alert(`Produto ${nome} adicionado com sucesso.`);
    clearForm();
};

// Função para ver produtos
function seeProducts() {
    const productListDiv = document.getElementById('productList');
    productListDiv.innerHTML = ''; // Limpa a lista anterior

    Product.forEach(produto => {
        const productElement = document.createElement('p');
        productElement.textContent = `Nome: ${produto.nome}, Valor: ${produto.valor}, Quantidade: ${produto.quantidade}`;
        productListDiv.appendChild(productElement);
    });
};

// Função para atualizar produto
function updateProduct() {
    const nome = document.getElementById('nome').value;
    const novoValor = document.getElementById('valor').value;
    const novaQuantidade = document.getElementById('quantidade').value;

    const index = Product.findIndex(item => item.nome === nome);

    if (index === -1) {
        alert(`O produto ${nome} não foi encontrado.`);
        return;
    }

    if (novoValor) {
        Product[index].valor = Number(novoValor);
    }
    if (novaQuantidade) {
        Product[index].quantidade = Number(novaQuantidade);
    }
    alert(`Produto ${nome} atualizado com sucesso.`);
    clearForm();
};

// Função para deletar produto
function deleteProduct() {
    const nome = document.getElementById('deleteNome').value;

    const index = Product.findIndex(item => item.nome === nome);

    if (index === -1) {
        alert(`O produto ${nome} não foi encontrado.`);
        return;
    }

    Product.splice(index, 1);
    alert(`Produto ${nome} deletado com sucesso.`);
};

// Função para limpar o formulário após adição/atualização
function clearForm() {
    document.getElementById('nome').value = '';
    document.getElementById('valor').value = '';
    document.getElementById('quantidade').value = '';
}

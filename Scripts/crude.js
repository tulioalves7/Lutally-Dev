// Array de produtos
const Product = [ 
    {
        nome: 'palmilha',
        valor: 40,
        quantidade: 300,
        codigoBarras: '7896843200157',
    },
    {
        nome: 'cabedal',
        valor: 400,
        quantidade: 170,
        codigoBarras: '7894554522222',
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
        quantidade: quantidade,
        codigoBarras: generateBarcode()
    }; 
    Product.push(value);  
    alert(`Produto ${nome} adicionado com sucesso.`);
    clearForm();
    seeProducts(); // Atualiza a lista de produtos após adicionar
}

// Função para gerar código de barras
function generateBarcode() {
    return Math.floor(1000000000000 + Math.random() * 9000000000000).toString(); // Gera um código de barras de 13 dígitos
}

// Função para ver produtos
function seeProducts() {
    const productListDiv = document.getElementById('productList');
    productListDiv.innerHTML = ''; // Limpa a lista anterior

    Product.forEach((produto, index) => {
        const row = document.createElement('tr');

        row.innerHTML = `
            <td>${produto.nome}</td>
            <td>R$ ${produto.valor.toFixed(2)}</td>
            <td>${produto.quantidade}</td>
            <td>${produto.codigoBarras}</td>
            <td>
                <button class="btn-action edit" onclick="editProduct(${index})"><i class="fas fa-edit"></i></button>
                <button class="btn-action delete" onclick="deleteProduct(${index})"><i class="fas fa-trash-alt"></i></button>
            </td>
        `;

        productListDiv.appendChild(row);
    });
}

// Função para editar produto (abrir no formulário para edição)
function editProduct(index) {
    const produto = Product[index];
    document.getElementById('nome').value = produto.nome;
    document.getElementById('valor').value = produto.valor;
    document.getElementById('quantidade').value = produto.quantidade;

    openAddProductForm(); // Abre o formulário para edição
}

// Função para deletar produto (por index)
function deleteProduct(index) {
    const nome = Product[index].nome;
    Product.splice(index, 1);
    alert(`Produto ${nome} deletado com sucesso.`);
    seeProducts(); // Atualiza a lista de produtos após deletar
}

// Função para limpar o formulário após adição/atualização/compra
function clearForm() {
    document.getElementById('nome').value = '';
    document.getElementById('valor').value = '';
    document.getElementById('quantidade').value = '';
}

// Função para abrir o formulário de adicionar/atualizar produtos
function openAddProductForm() {
    document.getElementById('productForm').style.display = 'block';
}

// Função para fechar o formulário de adicionar/atualizar produtos
function closeForm() {
    document.getElementById('productForm').style.display = 'none';
    clearForm();
}

// Função para pesquisar produtos
function searchProduct() {
    const searchValue = document.getElementById('search').value.toLowerCase();
    const filteredProducts = Product.filter(produto => 
        produto.nome.toLowerCase().includes(searchValue) || 
        produto.codigoBarras.includes(searchValue)
    );
    
    const productListDiv = document.getElementById('productList');
    productListDiv.innerHTML = ''; // Limpa a lista anterior

    filteredProducts.forEach((produto, index) => {
        const row = document.createElement('tr');

        row.innerHTML = `
            <td>${produto.nome}</td>
            <td>R$ ${produto.valor.toFixed(2)}</td>
            <td>${produto.quantidade}</td>
            <td>${produto.codigoBarras}</td>
            <td>
                <button class="btn-action edit" onclick="editProduct(${index})"><i class="fas fa-edit"></i></button>
                <button class="btn-action delete" onclick="deleteProduct(${index})"><i class="fas fa-trash-alt"></i></button>
            </td>
        `;

        productListDiv.appendChild(row);
    });
}

// Carrega os produtos automaticamente ao carregar a página
document.addEventListener('DOMContentLoaded', seeProducts);

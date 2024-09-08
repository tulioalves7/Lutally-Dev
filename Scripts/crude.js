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

// Variável global para armazenar o índice do produto em edição
let editIndex = -1;

// Função para adicionar ou atualizar produto
function addProduct() {
    const nome = document.getElementById('nome').value.trim();
    const valor = Number(document.getElementById('valor').value);
    const quantidade = Number(document.getElementById('quantidade').value);

    if (!nome || isNaN(valor) || isNaN(quantidade) || valor <= 0 || quantidade < 0) {
        alert('Por favor, insira valores válidos.');
        return;
    }

    if (editIndex >= 0) {
        // Atualizar produto existente
        const exists = Product.find((item, index) => item.nome.toLowerCase() === nome.toLowerCase() && index !== editIndex);
        if (exists) {
            alert(`O produto ${nome} já existe.`);
            return;
        }

        Product[editIndex] = {
            nome: nome,
            valor: valor,
            quantidade: quantidade,
            codigoBarras: Product[editIndex].codigoBarras // Mantém o mesmo código de barras
        };
        alert(`Produto ${nome} atualizado com sucesso.`);
        editIndex = -1; // Reseta o índice após atualização
    } else {
        // Adicionar novo produto
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
    }

    clearForm();
    seeProducts(); // Atualiza a lista de produtos após adicionar ou atualizar
    closeForm(); // Fecha o formulário após a operação
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
                <button class="btn-action view" onclick="showPopup(${index})"><i class="fas fa-eye"></i></button>
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

    editIndex = index; // Armazena o índice do produto em edição
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
    editIndex = -1; // Reseta o índice do produto em edição
}

// Função para abrir o formulário de adicionar/atualizar produtos
function openAddProductForm() {
    document.getElementById('productPopup').style.display = 'block'; 
}

// Função para fechar o formulário de adicionar/atualizar produtos
function closeForm() {
    document.getElementById('productPopup').style.display = 'none'; 
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

// Função para exibir o popup de visualização do produto
function showPopup(index) {
    const produto = Product[index];
    const popup = document.getElementById('productPopup');
    const popupProductDetails = document.getElementById('popupProductDetails');
    
    popupProductDetails.innerHTML = `
        <p><strong>Nome:</strong> ${produto.nome}</p>
        <p><strong>Valor:</strong> R$ ${produto.valor.toFixed(2)}</p>
        <p><strong>Quantidade:</strong> ${produto.quantidade}</p>
        <p><strong>Código de Barras:</strong> ${produto.codigoBarras}</p>
    `;

    popup.style.display = 'block';
}

function closePopup() {
    document.getElementById('productPopup').style.display = 'none';
}

// Carrega os produtos automaticamente ao carregar a página
document.addEventListener('DOMContentLoaded', seeProducts);

document.getElementById('toggle-theme').addEventListener('click', function () {
    document.body.classList.toggle('dark-mode');
    
    const isDarkMode = document.body.classList.contains('dark-mode');
    this.textContent = isDarkMode ? '☀️' : '🌙';
});

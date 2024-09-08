// Array de fichas técnicas
const fichaTecnica = [
    {
        nomeProduto: 'Tênis Esportivo',
        nomeMaterial: 'Couro Sintético',
        precoCompra: 50.00,
        precoVenda: 100.00,  // Preço de venda
        quantidade: 2,
        metrosPorSapato: 0.5, // Metros de material por sapato
        cor: 'Preto'
    },
    {
        nomeProduto: 'Sandália Feminina',
        nomeMaterial: 'Camurça',
        precoCompra: 30.00,
        precoVenda: 60.00,  // Preço de venda
        quantidade: 1,
        metrosPorSapato: 0.3, // Metros de material por sapato
        cor: 'Vermelho'
    }
];

// Função para adicionar nova ficha técnica
function addFichaTecnica() {
    const nomeProduto = document.getElementById('nomeProduto').value.trim();
    const nomeMaterial = document.getElementById('nomeMaterial').value.trim();
    const precoCompra = parseFloat(document.getElementById('precoCompra').value);
    const precoVenda = parseFloat(document.getElementById('precoVenda').value);
    const quantidade = parseInt(document.getElementById('quantidade').value);
    const metrosPorSapato = parseFloat(document.getElementById('metrosPorSapato').value);
    const cor = document.getElementById('cor').value.trim();

    if (!nomeProduto || !nomeMaterial || isNaN(precoCompra) || isNaN(precoVenda) || isNaN(quantidade) || isNaN(metrosPorSapato) || !cor) {
        alert('Por favor, preencha todos os campos corretamente.');
        return;
    }

    const ficha = {
        nomeProduto,
        nomeMaterial,
        precoCompra,
        precoVenda,
        quantidade,
        metrosPorSapato,
        cor
    };

    fichaTecnica.push(ficha);
    alert('Ficha técnica adicionada com sucesso!');
    clearForm();
    displayFichasTecnicas(); // Atualiza a lista de fichas técnicas
}

// Função para exibir as fichas técnicas
function displayFichasTecnicas() {
    const listaFichas = document.getElementById('listaFichas');
    listaFichas.innerHTML = ''; // Limpa a lista anterior

    fichaTecnica.forEach((ficha, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${ficha.nomeProduto}</td>
            <td>${ficha.nomeMaterial}</td>
            <td>R$ ${ficha.precoCompra.toFixed(2)}</td>
            <td>R$ ${ficha.precoVenda.toFixed(2)}</td>
            <td>${ficha.quantidade}</td>
            <td>${ficha.metrosPorSapato}</td>
            <td>${ficha.cor}</td>
            <td>
                <button onclick="showPopup(${index})">Ver Detalhes</button>
                <button onclick="editFicha(${index})">Editar</button>
                <button onclick="deleteFicha(${index})">Excluir</button>
            </td>
        `;
        listaFichas.appendChild(row);
    });
}

// Função para exibir o pop-up com detalhes da ficha técnica
function showPopup(index) {
    const ficha = fichaTecnica[index];
    document.getElementById('popup-nomeProduto').textContent = ficha.nomeProduto;
    document.getElementById('popup-nomeMaterial').textContent = ficha.nomeMaterial;
    document.getElementById('popup-precoCompra').textContent = ficha.precoCompra.toFixed(2);
    document.getElementById('popup-precoVenda').textContent = ficha.precoVenda.toFixed(2);
    document.getElementById('popup-quantidade').textContent = ficha.quantidade;
    document.getElementById('popup-metrosPorSapato').textContent = ficha.metrosPorSapato;
    document.getElementById('popup-cor').textContent = ficha.cor;

    document.getElementById('popup').style.display = 'flex';
}

// Função para editar uma ficha técnica
function editFicha(index) {
    const ficha = fichaTecnica[index];
    document.getElementById('nomeProduto').value = ficha.nomeProduto;
    document.getElementById('nomeMaterial').value = ficha.nomeMaterial;
    document.getElementById('precoCompra').value = ficha.precoCompra;
    document.getElementById('precoVenda').value = ficha.precoVenda;
    document.getElementById('quantidade').value = ficha.quantidade;
    document.getElementById('metrosPorSapato').value = ficha.metrosPorSapato;
    document.getElementById('cor').value = ficha.cor;
}

// Função para deletar uma ficha técnica
function deleteFicha(index) {
    fichaTecnica.splice(index, 1);
    alert('Ficha técnica excluída com sucesso!');
    displayFichasTecnicas(); // Atualiza a lista de fichas técnicas
}

// Função para limpar o formulário
function clearForm() {
    document.getElementById('nomeProduto').value = '';
    document.getElementById('nomeMaterial').value = '';
    document.getElementById('precoCompra').value = '';
    document.getElementById('precoVenda').value = '';
    document.getElementById('quantidade').value = '';
    document.getElementById('metrosPorSapato').value = '';
    document.getElementById('cor').value = '';
}

// Exibe as fichas técnicas ao carregar a página
document.addEventListener('DOMContentLoaded', displayFichasTecnicas);

// Função para atualizar estoque no CRUD ao adicionar ficha técnica
function updateStock(ficha) {
    // Exemplo de como você pode integrar com o estoque do CRUD
    const produtoNoEstoque = Product.find(produto => produto.nome.toLowerCase() === ficha.nomeProduto.toLowerCase());
    
    if (produtoNoEstoque) {
        produtoNoEstoque.quantidade += ficha.quantidade;
    } else {
        Product.push({
            nome: ficha.nomeProduto,
            valor: ficha.precoVenda, // Usando o preço de venda para o valor no estoque
            quantidade: ficha.quantidade,
            codigoBarras: generateBarcode() // Supondo que a função generateBarcode esteja no seu CRUD
        });
    }
}

// Função para exibir o pop-up com detalhes da ficha técnica
function showPopup(index) {
    const ficha = fichaTecnica[index];
    document.getElementById('popup-nomeProduto').textContent = ficha.nomeProduto;
    document.getElementById('popup-nomeMaterial').textContent = ficha.nomeMaterial;
    document.getElementById('popup-precoCompra').textContent = ficha.precoCompra.toFixed(2);
    document.getElementById('popup-precoVenda').textContent = ficha.precoVenda.toFixed(2);
    document.getElementById('popup-quantidade').textContent = ficha.quantidade;
    document.getElementById('popup-metrosPorSapato').textContent = ficha.metrosPorSapato;
    document.getElementById('popup-cor').textContent = ficha.cor;

    document.getElementById('popup').style.display = 'flex';
}

// Função para fechar o pop-up
function closePopup() {
    document.getElementById('popup').style.display = 'none';
}

// Adiciona evento de clique ao botão de fechar
document.getElementById('close-popup').addEventListener('click', closePopup);

// Fecha o pop-up se clicar fora do conteúdo
document.getElementById('popup').addEventListener('click', function(event) {
    if (event.target === this) {
        closePopup();
    }
});


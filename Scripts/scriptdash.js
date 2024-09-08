document.getElementById('toggle-theme').addEventListener('click', function () {
    document.body.classList.toggle('dark-mode');
    
    const isDarkMode = document.body.classList.contains('dark-mode');
    this.textContent = isDarkMode ? '☀️' : '🌙';
});

function handleOptionClick(option) {
    alert('Você selecionou: ' + option);
}

document.getElementById('user-name').textContent = 'Túlio';

function redirectToCrude() {
    window.location.href = './crude.html'; // Certifique-se de ajustar o caminho corretamente
}

function redirectToCrude() {
    window.location.href = './dossie.html'; // Certifique-se de ajustar o caminho corretamente
}
document.getElementById('toggle-theme').addEventListener('click', function () {
    document.body.classList.toggle('dark-mode');
    
    const isDarkMode = document.body.classList.contains('dark-mode');
    this.textContent = isDarkMode ? '☀️' : '🌙';
});

function handleOptionClick(option) {
    alert('Você selecionou: ' + option);
}

document.getElementById('user-name').textContent = 'Túlio';

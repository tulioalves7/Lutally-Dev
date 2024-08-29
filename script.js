function visibilidadeSenha() {
    const campoSenha = document.getElementById("password");
    if (campoSenha.type === "password") {
        campoSenha.type = "text";
    } else {
        campoSenha.type = "password";
    }
}

document.addEventListener('mousemove', function(e) {
    let body = document.querySelector('body');
    let xPos = e.clientX / window.innerWidth;
    let yPos = e.clientY / window.innerHeight;

    //  fodase
    body.style.backgroundPosition = `${xPos * 50}% ${yPos * 50}%`;
});




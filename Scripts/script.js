function visibilidadeSenha() {
    const campoSenha = document.getElementById("password");
    if (campoSenha.type === "password") {
        campoSenha.type = "text";
    } else {
        campoSenha.type = "password";
    }
}

window.onload = function() {
    const form = document.querySelector('.form');
    setTimeout(() => {
      form.classList.add('visible');
    }, 100); 
  };

// document.addEventListener('mousemove', function(e) {
//     let body = document.querySelector('body');
//     let xPos = e.clientX / window.innerWidth;
//     let yPos = e.clientY / window.innerHeight;

//     //  fodase
//     body.style.backgroundPosition = `${xPos * 50}% ${yPos * 50}%`;
// });
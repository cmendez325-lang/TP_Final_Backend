// URL base de tu backend corriendo en el puerto 4000
const API_URL = 'http://localhost:4000/api/auth';

// Función para cambiar de solapa (Acordeón visual)
function switchTab(tab) {
    const btnLogin = document.getElementById('tab-login');
    const btnRegister = document.getElementById('tab-register');
    const formLogin = document.getElementById('form-login');
    const formRegister = document.getElementById('form-register');
    const mensaje = document.getElementById('mensaje-respuesta');
    
    mensaje.textContent = '';

    if (tab === 'login') {
        btnLogin.classList.add('active');
        btnRegister.classList.remove('active');
        formLogin.classList.add('active');
        formRegister.classList.remove('active');
    } else {
        btnRegister.classList.add('active');
        btnLogin.classList.remove('active');
        formRegister.classList.add('active');
        formLogin.classList.remove('active');
    }
}

// Lógica para el Registro
document.getElementById('form-register').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const nombre = document.getElementById('register-name').value;
    const email = document.getElementById('register-email').value;
    const password = document.getElementById('register-password').value;
    const mensajeDiv = document.getElementById('mensaje-respuesta');

    try {
        const respuesta = await fetch(`${API_URL}/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ nombre, email, password })
        });

        const datos = await respuesta.json();

        if (respuesta.ok) {
            mensajeDiv.style.color = 'green';
            mensajeDiv.textContent = '¡Registro exitoso! Ya podés iniciar sesión.';
            document.getElementById('form-register').reset();
        } else {
            mensajeDiv.style.color = 'red';
            mensajeDiv.textContent = datos.mensaje || 'Error al registrarse.';
        }
    } catch (error) {
        mensajeDiv.style.color = 'red';
        mensajeDiv.textContent = 'No se pudo conectar con el servidor.';
    }
});

// Lógica para el Login
document.getElementById('form-login').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;
    const mensajeDiv = document.getElementById('mensaje-respuesta');

    try {
        const respuesta = await fetch(`${API_URL}/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });

        const datos = await respuesta.json();

        if (respuesta.ok) {
            mensajeDiv.style.color = 'green';
            mensajeDiv.textContent = '¡Inicio de sesión exitoso!';
            // Acá podés guardar el token en localStorage si lo usás:
            // localStorage.setItem('token', datos.token);
        } else {
            mensajeDiv.style.color = 'red';
            mensajeDiv.textContent = datos.mensaje || 'Credenciales incorrectas.';
        }
    } catch (error) {
        mensajeDiv.style.color = 'red';
        mensajeDiv.textContent = 'No se pudo conectar con el servidor.';
    }
});
const tg = window.Telegram.WebApp;

// Expand the Web App to full height
tg.expand();

const form = document.getElementById('registration-form');
const submitBtn = document.getElementById('submit-btn');
const messageDiv = document.getElementById('message');

form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;

    // Get the user ID from Telegram Web App context
    const userId = tg.initDataUnsafe?.user?.id;

    if (!userId) {
        showMessage('Error: No se pudo obtener el ID del usuario de Telegram. Asegúrate de abrir esto como una Mini App en Telegram.', 'error');
        return;
    }

    submitBtn.disabled = true;
    submitBtn.innerText = 'Enviando...';

    try {
        const response = await fetch('/api/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, email, userId })
        });

        const data = await response.json();

        if (data.success) {
            showMessage('¡Registro exitoso! Ya puedes cerrar esta ventana.', 'success');
            // Optionally, tell Telegram to close the app after a short delay
            setTimeout(() => {
                tg.close();
            }, 3000);
        } else {
            showMessage(data.error || 'Ocurrió un error en el registro.', 'error');
            submitBtn.disabled = false;
            submitBtn.innerText = 'Registrar';
        }
    } catch (error) {
        showMessage('Error de conexión con el servidor.', 'error');
        submitBtn.disabled = false;
        submitBtn.innerText = 'Registrar';
    }
});

function showMessage(text, type) {
    messageDiv.innerText = text;
    messageDiv.className = type;
    messageDiv.style.display = 'block';
}

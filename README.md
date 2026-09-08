# Telegram Bot with Express and Mini App

Este repositorio contiene un bot de Telegram integrado con una Mini App (Web App) construida con HTML, CSS, JavaScript y alojada junto a un servidor [Express.js](https://expressjs.com/). El bot utiliza el framework [grammY](https://grammy.dev/) para su desarrollo y se enruta a través de un webhook de Express.

## Características

- **Bot de Telegram**: Desarrollado con grammY. Responde al comando `/start` enviando un botón para abrir la Mini App.
- **Servidor Web Express**: Enruta los webhooks de Telegram de manera eficiente y sirve los archivos estáticos de la Mini App.
- **Telegram Mini App (Web App)**: Un frontend integrado que muestra un formulario para recolectar información del usuario (nombre y correo electrónico).
- **Notificaciones**: Una vez que el usuario envía el formulario con éxito en la Mini App, el servidor notifica al usuario en Telegram enviándole un mensaje de confirmación mediante el bot.

## Requisitos Previos

- Node.js (v14 o superior recomendado)
- Una cuenta de Telegram
- Un Bot de Telegram (creado mediante [@BotFather](https://t.me/botfather) en Telegram)

## Instalación

1. Clona este repositorio o descarga los archivos.
2. Abre una terminal en la raíz del proyecto.
3. Instala las dependencias necesarias ejecutando:

   ```bash
   npm install
   ```

## Configuración del Entorno

1. Crea un archivo `.env` en la raíz de tu proyecto.
2. Configura las siguientes variables de entorno:

   ```env
   BOT_TOKEN=TU_TOKEN_DE_BOT_AQUI
   WEBHOOK_URL=TU_URL_PUBLICA_AQUI (ej. https://tu-dominio.com)
   MINI_APP_URL=TU_URL_PUBLICA_AQUI (ej. https://tu-dominio.com)
   PORT=3000
   ```

   **Nota sobre las URLs**: Telegram requiere HTTPS para los Webhooks y para las Web Apps.
   - `BOT_TOKEN`: El token proporcionado por BotFather.
   - `WEBHOOK_URL`: La URL pública donde tienes desplegado tu servidor Express.
   - `MINI_APP_URL`: La URL pública donde se sirve tu Mini App. Al utilizar Express para servir la carpeta `public`, esta será la misma que tu `WEBHOOK_URL` (la URL base).

## Ejecución Local

Para probar localmente, necesitarás exponer tu puerto local a internet con una URL HTTPS (por ejemplo, usando [ngrok](https://ngrok.com/) o [localtunnel](https://theboroer.github.io/localtunnel-www/)).

1. Inicia ngrok (o herramienta similar):
   ```bash
   ngrok http 3000
   ```
2. Copia la URL `https` que te proporciona ngrok y colócala en tu `.env` bajo `WEBHOOK_URL` y `MINI_APP_URL`.
3. Inicia el servidor:
   ```bash
   node index.js
   ```

El servidor registrará automáticamente el Webhook en Telegram al iniciar si encuentra la variable `WEBHOOK_URL`.

## Despliegue (Deploy)

Puedes desplegar esta aplicación en servicios como Vercel, Render o Heroku.

### Render / Heroku
1. Conecta tu repositorio al servicio de alojamiento.
2. Define el comando de inicio (`start command`): `node index.js`
3. Agrega las variables de entorno (`BOT_TOKEN`, `WEBHOOK_URL`, `MINI_APP_URL`) en la configuración del servicio, usando la URL proporcionada por la plataforma.

### Vercel
Vercel está diseñado principalmente para Serverless Functions. Para desplegar un servidor Express en Vercel, es posible que necesites realizar algunas adaptaciones creando un archivo `api/index.js` y configurando `vercel.json`. Sin embargo, puedes usar un servicio tradicional basado en contenedores (como Render o Railway) para que el servidor y bot en memoria se mantengan de manera más simple.

## Estructura del Proyecto

```
.
├── index.js          # Punto de entrada: Servidor Express, Bot grammY y Webhooks.
├── package.json      # Dependencias del proyecto.
├── .env              # (No incluido en repo) Variables de configuración.
├── public/           # Archivos de la Mini App (Frontend).
│   ├── index.html    # Estructura del formulario.
│   ├── style.css     # Estilos.
│   └── app.js        # Lógica de la Web App (Comunicación con Telegram y Express).
└── README.md         # Documentación.
```

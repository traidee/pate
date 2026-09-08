import 'dotenv/config';
import express from 'express';
import { Bot, webhookCallback } from 'grammy';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Fetch the BOT_TOKEN from the environment
const botToken = process.env.BOT_TOKEN || 'DUMMY_TOKEN'; // fallback for syntax check / tests
const bot = new Bot(botToken);

// Handle the /start command
bot.command('start', (ctx) => {
  const miniAppUrl = process.env.MINI_APP_URL || 'https://google.com'; // User needs to set this in .env
  ctx.reply('¡Bienvenido! Por favor, abre la Mini App para registrarte.', {
    reply_markup: {
      inline_keyboard: [
        [{ text: "Abrir Formulario", web_app: { url: miniAppUrl } }]
      ]
    }
  });
});

// Setup webhook route
app.use('/webhook', webhookCallback(bot, 'express'));

// Endpoint to receive data from the Mini App
app.post('/api/register', async (req, res) => {
  const { name, email, userId } = req.body;

  if (!userId) {
    return res.status(400).json({ success: false, error: "userId is required" });
  }

  try {
    // Notify the user via the bot that registration was successful
    await bot.api.sendMessage(userId, `¡Registro exitoso! Gracias por registrarte, ${name}.`);
    return res.status(200).json({ success: true, message: "Registration successful" });
  } catch (error) {
    console.error("Error sending message to user:", error);
    return res.status(500).json({ success: false, error: "Failed to notify user" });
  }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, async () => {
  console.log(`Server is running on port ${PORT}`);

  if (process.env.WEBHOOK_URL && process.env.BOT_TOKEN) {
    try {
      await bot.api.setWebhook(`${process.env.WEBHOOK_URL}/webhook`);
      console.log(`Webhook set to ${process.env.WEBHOOK_URL}/webhook`);
    } catch (e) {
      console.error("Failed to set webhook:", e.message);
    }
  } else {
    console.log("No WEBHOOK_URL or BOT_TOKEN provided. Webhook not set automatically.");
  }
});

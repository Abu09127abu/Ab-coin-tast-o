const express = require('express');
const { Telegraf } = require('telegraf');
const firebaseAdmin = require('firebase-admin');

// Initialize Firebase
firebaseAdmin.initializeApp({
  credential: firebaseAdmin.credential.cert({
    "type": "service_account",
    "project_id": "your-project-id",
    "private_key_id": "your-private-key-id",
    "private_key": "your-private-key",
    "client_email": "your-client-email",
    "client_id": "your-client-id",
    "auth_uri": "https://accounts.google.com/o/oauth2/auth",
    "token_uri": "https://oauth2.googleapis.com/token",
    "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
    "client_x509_cert_url": "your-client-cert-url"
  }),
  databaseURL: "https://your-database-url.firebaseio.com"
});

const db = firebaseAdmin.database();

// Telegram Bot Token
const bot = new Telegraf('YOUR-TELEGRAM-BOT-TOKEN');

// Express server setup
const app = express();
const port = process.env.PORT || 3000;

// Handle /start command
bot.start((ctx) => {
  const userId = ctx.from.id;
  const username = ctx.from.username || ctx.from.first_name;
  const chatId = ctx.chat.id;

  // Save user to Firebase with their Telegram ID and username
  const userRef = db.ref('users/' + userId);
  userRef.set({
    username: username,
    chatId: chatId,
    coins: 0
  });

  ctx.reply(`Hello ${username}, you have been logged in!`);
});

// Command to view coins
bot.command('coins', (ctx) => {
  const userId = ctx.from.id;
  const userRef = db.ref('users/' + userId);

  userRef.once('value', (snapshot) => {
    const user = snapshot.val();
    ctx.reply(`Your coin count is: ${user.coins}`);
  });
});

// Command to increment coins
bot.command('earn', (ctx) => {
  const userId = ctx.from.id;
  const userRef = db.ref('users/' + userId);

  userRef.once('value', (snapshot) => {
    const user = snapshot.val();
    const newCoinCount = user.coins + 1;
    userRef.update({ coins: newCoinCount });

    ctx.reply(`You earned a coin! Your new coin count is: ${newCoinCount}`);
  });
});

bot.launch();

// Serve home page
app.get('/', (req, res) => {
  res.send('Home Page');
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
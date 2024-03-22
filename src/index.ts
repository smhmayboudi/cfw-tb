import {Ai} from '@cloudflare/ai';
import {Hono} from 'hono';
import {Bot, webhookCallback} from 'grammy';
import {fetch_json, hasResponse, sha256} from './lib';

export type Bindings = {
  AI: unknown;
};

const BOT_TOKEN = '';
const BOT_WEBHOOK_URL = await sha256(BOT_TOKEN);

const app = new Hono<{Bindings: Bindings}>();

app.get('/ai', async ctx => {
  const ai = new Ai(ctx.env?.AI);
  const messages = [
    {role: 'system', content: 'You are a friendly assistant'},
    {role: 'user', content: 'What is the origin of the phrase Hello, World'},
  ];
  const inputs = {messages};
  const response = await ai.run('@cf/meta/llama-2-7b-chat-fp16', inputs).then(response => (hasResponse(response) ? response.response : ''));
  return ctx.json(`Hello World! ${response}`);
});

app.get(`/${BOT_WEBHOOK_URL}/del`, async ctx => {
  const workerURL = ctx.req.url.replace(ctx.req.path, '');
  const url = `https://api.telegram.org/bot${BOT_TOKEN}/deleteWebhook?url=${workerURL}`;
  const response = await fetch_json(url);
  return ctx.json(response);
});

app.get(`/${BOT_WEBHOOK_URL}/get`, async ctx => {
  const workerURL = ctx.req.url.replace(ctx.req.path, '');
  const url = `https://api.telegram.org/bot${BOT_TOKEN}/getWebhookInfo?url=${workerURL}`;
  const response = await fetch_json(url);
  return ctx.json(response);
});

app.get(`/${BOT_WEBHOOK_URL}/set`, async ctx => {
  const workerURL = ctx.req.url.replace(ctx.req.path, '');
  const url = `https://api.telegram.org/bot${BOT_TOKEN}/setWebhook?url=${workerURL}`;
  const response = await fetch_json(url);
  return ctx.json(response);
});

const bot = new Bot(BOT_TOKEN);

bot.command('start', async ctx => {
  await ctx.reply('Hello, world!');
});

app.use(webhookCallback(bot, 'hono'));

export default app;

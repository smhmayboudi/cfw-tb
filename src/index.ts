import {Ai} from '@cloudflare/ai';
import {Hono} from 'hono';
import {Bot, session, webhookCallback} from 'grammy';
import {fetch_json, hasResponse, sha256} from './lib';
import {CustomContext, SessionData} from './types';
import {routers} from './routers';
import {composer} from './composers';
import {hydrateReply} from '@grammyjs/parse-mode';
// import {apiThrottler} from '@grammyjs/transformer-throttler';

export type Bindings = {
  AI: unknown;
  BOT_TOKEN: string;
};

const BOT_TOKEN = '123';
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

// 1. Create a bot with a token (get it from https://t.me/BotFather)
const bot = new Bot<CustomContext>(BOT_TOKEN);

// 2. Attach an api throttler transformer to the bot
// bot.api.config.use(apiThrottler());

bot.use(hydrateReply<CustomContext>);

// 3. Attach a session middleware and specify the initial data
bot.use(
  session({
    initial: (): SessionData => ({
      route: '',
      leftOperand: 0,
      rightOperand: 0,
    }),
    getSessionKey: ctx => `tbs:${ctx.chat?.id.toString()}_${ctx.from?.id?.toString()}`,
  })
);

// 4. Attach all routers to the bot as middleware
bot.use(...routers);

// 5. Attach all composers to the bot as middleware
bot.use(composer);

app.use(webhookCallback(bot, 'hono'));

export default app;

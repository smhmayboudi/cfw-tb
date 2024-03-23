import {Ai} from '@cloudflare/ai';
import {Bot, lazySession, webhookCallback} from 'grammy';
import {CustomContext, SessionData} from './types';
import {routers} from './routers';
import {composer} from './composers';
import {hydrateReply} from '@grammyjs/parse-mode';
import {autoChatAction} from '@grammyjs/auto-chat-action';
import {D1Adapter} from '@grammyjs/storage-cloudflare';

type Bindings = {
  AI: Ai;
  D1: D1Database;
  BOT_TOKEN: string;
};

export default {
  async fetch(request: Request, env: Bindings, ctx: ExecutionContext) {
    const bot = new Bot<CustomContext>(env.BOT_TOKEN);
    const initial = (): SessionData => ({
      route: '',
      leftOperand: 0,
      rightOperand: 0,
    });
    const getSessionKey = (ctx: Omit<CustomContext, 'session'>) =>
      ctx.from === undefined || ctx.chat === undefined ? undefined : `${ctx.chat.id}:${ctx.from.id}`;
    const storage = await D1Adapter.create<SessionData>(env.D1, 'SessionData');

    bot
      .use(hydrateReply<CustomContext>)
      .use(lazySession({initial, getSessionKey, storage}))
      .use(autoChatAction())
      .use(...routers)
      .use(composer);

    return webhookCallback(bot, 'cloudflare-mod')(request);
  },
};

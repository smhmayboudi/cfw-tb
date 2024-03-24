import {Ai} from '@cloudflare/ai';
import {Bot, GrammyError, HttpError, lazySession, webhookCallback} from 'grammy';
import {CustomApi, CustomContext, SessionData} from './types';
import {routers} from './routers';
import {composer} from './composers';
import {autoChatAction} from '@grammyjs/auto-chat-action';
import {D1Adapter} from '@grammyjs/storage-cloudflare';
import {hydrateApi, hydrateContext} from '@grammyjs/hydrate';

type Bindings = {
  AI: Ai;
  D1: D1Database;
  BOT_TOKEN: string;
};

export default {
  async fetch(request: Request, env: Bindings, ctx: ExecutionContext) {
    const bot = new Bot<CustomContext, CustomApi>(env.BOT_TOKEN);
    const initial = (): SessionData => ({
      route: '',
      leftOperand: 0,
      rightOperand: 0,
    });
    const getSessionKey = (ctx: Omit<CustomContext, 'session'>) =>
      ctx.from === undefined || ctx.chat === undefined ? undefined : `${ctx.chat.id}:${ctx.from.id}`;
    const storage = await D1Adapter.create<SessionData>(env.D1, 'SessionData');

    bot
      .use(lazySession({initial, getSessionKey, storage}))
      .use(hydrateContext<CustomContext>())
      .use(autoChatAction<CustomContext>())
      .use(...routers)
      .use(composer);

    bot.api.config.use(hydrateApi());

    bot.catch(err => {
      const ctx = err.ctx;
      console.error(`Error while handling update ${ctx.update.update_id}:`);
      const e = err.error;
      if (e instanceof GrammyError) {
        console.error('Error in request:', e.description);
      } else if (e instanceof HttpError) {
        console.error('Could not contact Telegram:', e);
      } else {
        console.error('Unknown error:', e);
      }
    });

    return webhookCallback(bot, 'cloudflare-mod')(request);
  },
};

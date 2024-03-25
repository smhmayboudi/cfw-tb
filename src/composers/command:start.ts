import {Composer} from 'grammy';
import {CustomContext} from '../types';

const composer = new Composer<CustomContext>();

composer.command('start', async ctx => {
  await ctx.reply(`Hi ${ctx.from?.first_name} ${ctx.from?.last_name}. If you need help, do /help.`, {
    reply_markup: {remove_keyboard: true},
  });
});

export default composer;

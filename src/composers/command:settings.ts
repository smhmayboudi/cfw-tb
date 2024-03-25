import {Composer} from 'grammy';
import {CustomContext} from '../types';
import {initial} from '../libs';

const composer = new Composer<CustomContext>();

composer.command('settings', async ctx => {
  const session = await ctx.session;
  session.add = initial().add;
  session.decor = initial().decor;
  session.multiply = initial().multiply;
  session.route = initial().route;

  await ctx.reply('Default settings has been set.', {
    reply_markup: {remove_keyboard: true},
  });
});

export default composer;

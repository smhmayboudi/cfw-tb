import {Composer} from 'grammy';
import {CustomContext} from '../types';

const composer = new Composer<CustomContext>();

composer.use(async ctx => {
  await ctx.reply('Not a recognised input. If you need help, do /help.');
});

export default composer;

import {Composer} from 'grammy';
import {CustomContext} from '../types';

const composer = new Composer<CustomContext>();

composer.command('add', async ctx => {
  const session = await ctx.session;
  session.route = 'add-left';
  session.leftOperand = 0;
  session.rightOperand = 0;
  await ctx.reply('Send me the first number to add.');
});

export default composer;

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

composer.command('multiply', async ctx => {
  const session = await ctx.session;
  session.route = 'multiply-left';
  session.leftOperand = 0;
  session.rightOperand = 0;
  await ctx.reply('Send me the first number to multiply.');
});

composer.command('help', async ctx => {
  await ctx.reply('To add numbers, do /add. To multiply numbers, do /multiply.');
});

composer.use(async ctx => {
  await ctx.reply('Not a recognised input. If you need help, do /help.');
});

export {composer};

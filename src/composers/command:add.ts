import {Composer} from 'grammy';
import {CustomContext} from '../types';

const composer = new Composer<CustomContext>();

composer.command('add', async ctx => {
  const session = await ctx.session;
  session.route = 'add-left';
  session.add.leftOperand = 0;
  session.add.rightOperand = 0;
  await ctx.reply('Send me the first number to add.', {
    reply_markup: {remove_keyboard: true},
  });
});

const help = 'To add numbers, do /add.';

export default composer;
export {help};

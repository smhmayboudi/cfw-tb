import {Router} from '@grammyjs/router';
import {CustomContext} from '../types';

const router = new Router<CustomContext>(async ctx => (await ctx.session).route);

router.route('add-left', async ctx => {
  const leftOperand = Number(ctx.msg?.text);
  if (isNaN(leftOperand)) {
    await ctx.reply('Please provide a valid number.', {
      reply_markup: {remove_keyboard: true},
    });
    return;
  }

  const session = await ctx.session;
  session.leftOperand = leftOperand;
  session.route = 'add-right';

  await ctx.reply('Please provide the next number to add.', {
    reply_markup: {remove_keyboard: true},
  });
});

router.route('add-right', async ctx => {
  const rightOperand = Number(ctx.msg?.text);
  if (isNaN(rightOperand)) {
    await ctx.reply('Please provide a valid number.', {
      reply_markup: {remove_keyboard: true},
    });
    return;
  }

  const session = await ctx.session;
  session.rightOperand = rightOperand;
  session.route = '';

  await ctx.reply(`The result of adding the numbers is ${session.leftOperand + session.rightOperand}`, {
    reply_markup: {remove_keyboard: true},
  });
});

export default router;

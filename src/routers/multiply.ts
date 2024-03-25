import {Router} from '@grammyjs/router';
import {CustomContext} from '../types';

const router = new Router<CustomContext>(async ctx => (await ctx.session).route);

router.route('multiply-left', async ctx => {
  const leftOperand = Number(ctx.msg?.text);
  if (isNaN(leftOperand)) {
    await ctx.reply('Please provide a valid number.');
    return;
  }

  const session = await ctx.session;
  session.multiply.leftOperand = leftOperand;
  session.route = 'multiply-right';

  await ctx.reply('Please provide the next number to multiply.', {
    reply_markup: {remove_keyboard: true},
  });
});

router.route('multiply-right', async ctx => {
  const rightOperand = Number(ctx.msg?.text);
  if (isNaN(rightOperand)) {
    await ctx.reply('Please provide a valid number.', {
      reply_markup: {remove_keyboard: true},
    });
    return;
  }

  const session = await ctx.session;
  session.multiply.rightOperand = rightOperand;
  session.route = '';

  await ctx.reply(`The result of multiplying the numbers is ${session.multiply.leftOperand * session.multiply.rightOperand}`, {
    reply_markup: {remove_keyboard: true},
  });
});

export default router;

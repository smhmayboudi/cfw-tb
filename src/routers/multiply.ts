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
  session.leftOperand = leftOperand;
  session.route = 'multiply-right';

  await ctx.reply('Please provide the next number to multiply.');
});

router.route('multiply-right', async ctx => {
  const rightOperand = Number(ctx.msg?.text);
  if (isNaN(rightOperand)) {
    await ctx.reply('Please provide a valid number.');
    return;
  }

  const session = await ctx.session;
  session.rightOperand = rightOperand;
  session.route = '';

  await ctx.reply(`The result of multiplying the numbers is ${session.leftOperand * session.rightOperand}`);
});

export default router;

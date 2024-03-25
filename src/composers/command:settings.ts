import {Composer} from 'grammy';
import {CustomContext, SessionData} from '../types';

const composer = new Composer<CustomContext>();

composer.command('settings', async ctx => {
  const initial = (): SessionData => ({
    add: {
      leftOperand: 0,
      rightOperand: 0,
    },
    decor: {
      Q1: '',
      Q2: '',
      Q3: '',
      Q4: '',
      Q5: '',
      Q6: '',
      Q7: '',
      Q8: '',
      Q9: '',
    },
    multiply: {
      leftOperand: 0,
      rightOperand: 0,
    },
    route: '',
  });

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

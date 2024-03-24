import {Composer, Keyboard, InlineKeyboard} from 'grammy';
import {CustomContext} from '../types';
import consts from '../consts';

const composer = new Composer<CustomContext>();

composer.command('decor', async ctx => {
  const session = await ctx.session;
  session.decor.Q1 = '';
  session.decor.Q2 = '';
  session.decor.Q3 = '';
  session.decor.Q4 = '';
  session.decor.Q5 = '';
  session.decor.Q6 = '';
  session.decor.Q7 = '';
  session.decor.Q8 = '';
  session.decor.Q9 = '';

  session.route = 'decor-q1';
  await ctx.reply('لطفا نوع سبک را انتخاب بکن.', {
    reply_markup: {
      one_time_keyboard: true,
      keyboard: new Keyboard()
        .text(consts.styles[0].text)
        .row()
        .text(consts.styles[1].text)
        .text(consts.styles[2].text)
        .row()
        .text(consts.styles[3].text)
        .text(consts.styles[4].text)
        .row()
        .text(consts.styles[5].text)
        .text(consts.styles[6].text)
        .row()
        .build(),
    },
  });
});

const help = 'To decor, do /decor.';

export default composer;
export {help};

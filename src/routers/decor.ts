import {Router} from '@grammyjs/router';
import {CustomContext} from '../types';
import consts from '../consts';
import {InputFile, Keyboard} from 'grammy';
import {Ai} from '@cloudflare/ai';

const router = new Router<CustomContext>(async ctx => (await ctx.session).route);

router.route('decor-q1', async ctx => {
  const metadata = consts.styles.filter(a => a.text === ctx.msg?.text);
  if (metadata.length === 0) {
    await ctx.reply('لطفا یک سبک درست انتخاب کن.', {
      // reply_markup: {remove_keyboard: true},
    });
    return;
  }

  const session = await ctx.session;
  session.decor.Q1 = metadata[0].data;

  session.route = 'decor-q2';
  await ctx.reply('لطفا نوع اتاق را انتخاب بکن.', {
    reply_markup: {
      one_time_keyboard: true,
      keyboard: new Keyboard()
        .text(consts.rooms[0].text)
        .text(consts.rooms[1].text)
        .row()
        .text(consts.rooms[2].text)
        .text(consts.rooms[3].text)
        .row()
        .build(),
    },
  });
});

router.route('decor-q2', async ctx => {
  const metadata = consts.rooms.filter(a => a.text === ctx.msg?.text);
  if (metadata.length === 0) {
    await ctx.reply('لطفا یک اتاق درست انتخاب کن.', {
      // reply_markup: {remove_keyboard: true},
    });
    return;
  }

  const session = await ctx.session;
  session.decor.Q2 = metadata[0].data;

  if (metadata[0].text === 'اتاق آشپزخانه') {
    session.route = 'decor-q3';
    await ctx.reply('لطفا نوع کابینت را انتخاب بکن.', {
      reply_markup: {
        one_time_keyboard: true,
        keyboard: new Keyboard().text(consts.cabinets[0].text).text(consts.cabinets[1].text).row().build(),
      },
    });
  }

  if (metadata[0].text === 'اتاق خواب') {
    session.route = 'decor-q4';
    await ctx.reply('لطفا نوع تخت خواب را انتخاب بکن.', {
      reply_markup: {
        one_time_keyboard: true,
        keyboard: new Keyboard().text(consts.beds[0].text).text(consts.beds[1].text).row().build(),
      },
    });
  }

  if (metadata[0].text === 'اتاق نشیمن') {
    session.route = 'decor-q5';
    await ctx.reply('لطفا نوع مبلمان را انتخاب بکن.', {
      reply_markup: {
        one_time_keyboard: true,
        keyboard: new Keyboard().text(consts.furniture[0].text).text(consts.furniture[1].text).text(consts.furniture[2].text).row().build(),
      },
    });
  }

  if (metadata[0].text === 'اتاق کلوزت') {
    session.route = 'decor-q6';
    await ctx.reply('لطفا نوع کلوزت را انتخاب بکن.', {
      reply_markup: {
        one_time_keyboard: true,
        keyboard: new Keyboard().text(consts.closets[0].text).text(consts.closets[1].text).row().build(),
      },
    });
  }
});

router.route('decor-q3', async ctx => {
  const metadata = consts.cabinets.filter(a => a.text === ctx.msg?.text);
  if (metadata.length === 0) {
    await ctx.reply('لطفا یک کابینت درست انتخاب کن.', {
      // reply_markup: {remove_keyboard: true},
    });
    return;
  }

  const session = await ctx.session;
  session.decor.Q3 = metadata[0].data;

  session.route = 'decor-q7';
  await ctx.reply('لطفا نوع متراژ را انتخاب بکن.', {
    reply_markup: {
      one_time_keyboard: true,
      keyboard: new Keyboard()
        .text(consts.meterage[0].text)
        .text(consts.meterage[1].text)
        .row()
        .text(consts.meterage[2].text)
        .text(consts.meterage[3].text)
        .row()
        .build(),
    },
  });
});

router.route('decor-q4', async ctx => {
  const metadata = consts.beds.filter(a => a.text === ctx.msg?.text);
  if (metadata.length === 0) {
    await ctx.reply('لطفا یک تخت خواب درست انتخاب کن.', {
      // reply_markup: {remove_keyboard: true},
    });
    return;
  }

  const session = await ctx.session;
  session.decor.Q4 = metadata[0].data;

  session.route = 'decor-q7';
  await ctx.reply('لطفا نوع متراژ را انتخاب بکن.', {
    reply_markup: {
      one_time_keyboard: true,
      keyboard: new Keyboard()
        .text(consts.meterage[0].text)
        .text(consts.meterage[1].text)
        .row()
        .text(consts.meterage[2].text)
        .text(consts.meterage[3].text)
        .row()
        .build(),
    },
  });
});

router.route('decor-q5', async ctx => {
  const metadata = consts.furniture.filter(a => a.text === ctx.msg?.text);
  if (metadata.length === 0) {
    await ctx.reply('لطفا یک نشیمن درست انتخاب کن.', {
      // reply_markup: {remove_keyboard: true},
    });
    return;
  }

  const session = await ctx.session;
  session.decor.Q5 = metadata[0].data;

  session.route = 'decor-q7';
  await ctx.reply('لطفا نوع متراژ را انتخاب بکن.', {
    reply_markup: {
      one_time_keyboard: true,
      keyboard: new Keyboard()
        .text(consts.meterage[0].text)
        .text(consts.meterage[1].text)
        .row()
        .text(consts.meterage[2].text)
        .text(consts.meterage[3].text)
        .row()
        .build(),
    },
  });
});

router.route('decor-q6', async ctx => {
  const metadata = consts.closets.filter(a => a.text === ctx.msg?.text);
  if (metadata.length === 0) {
    await ctx.reply('لطفا یک کلوزت درست انتخاب کن.', {
      // reply_markup: {remove_keyboard: true},
    });
    return;
  }

  const session = await ctx.session;
  session.decor.Q6 = metadata[0].data;

  session.route = 'decor-q7';
  await ctx.reply('لطفا نوع متراژ را انتخاب بکن.', {
    reply_markup: {
      one_time_keyboard: true,
      keyboard: new Keyboard()
        .text(consts.meterage[0].text)
        .text(consts.meterage[1].text)
        .row()
        .text(consts.meterage[2].text)
        .text(consts.meterage[3].text)
        .row()
        .build(),
    },
  });
});

router.route('decor-q7', async ctx => {
  const metadata = consts.meterage.filter(a => a.text === ctx.msg?.text);
  if (metadata.length === 0) {
    await ctx.reply('لطفا یک متراژ درست انتخاب کن.', {
      // reply_markup: {remove_keyboard: true},
    });
    return;
  }

  const session = await ctx.session;
  session.decor.Q7 = metadata[0].data;

  session.route = 'decor-q8';
  await ctx.reply('لطفا نوع روشنایی را انتخاب بکن.', {
    reply_markup: {
      one_time_keyboard: true,
      keyboard: new Keyboard().text(consts.lighting[0].text).text(consts.lighting[1].text).text(consts.lighting[2].text).row().build(),
    },
  });
});

router.route('decor-q8', async ctx => {
  const metadata = consts.lighting.filter(a => a.text === ctx.msg?.text);
  if (metadata.length === 0) {
    await ctx.reply('لطفا یک روشنایی درست انتخاب کن.', {
      // reply_markup: {remove_keyboard: true},
    });
    return;
  }

  const session = await ctx.session;
  session.decor.Q8 = metadata[0].data;

  session.route = '';
  ctx.chatAction = 'upload_photo';
  const ai = new Ai(ctx.env?.AI);
  const prompt = Object.entries(session.decor)
    .map(a => a[1])
    .join(' ');
  const inputs = {prompt};
  const response = await ai.run('@cf/stabilityai/stable-diffusion-xl-base-1.0', inputs);
  const inputFile = new InputFile(response);
  await ctx.replyWithPhoto(inputFile, {
    reply_markup: {remove_keyboard: true},
  });
});

export default router;

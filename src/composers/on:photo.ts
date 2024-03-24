import {Composer} from 'grammy';
import {CustomContext} from '../types';

const composer = new Composer<CustomContext>();

composer.on(':photo', async ctx => {
  const statusMessage = await ctx.reply('Processing');
  // await doWork(ctx.msg.photo); // some long image processing
  await statusMessage.editText('Done!'); // so easy!
  setTimeout(() => statusMessage.delete().catch(() => {}), 3000);
});

export default composer;

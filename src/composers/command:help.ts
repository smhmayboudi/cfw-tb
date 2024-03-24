import {Composer} from 'grammy';
import {CustomContext} from '../types';

const composer = new Composer<CustomContext>();

composer.command('help', async ctx => {
  await ctx.reply('To add numbers, do /add. To multiply numbers, do /multiply.');
});

export default composer;

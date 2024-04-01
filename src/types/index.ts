import {Api, Context, LazySessionFlavor} from 'grammy';
import {AutoChatActionFlavor} from '@grammyjs/auto-chat-action';
import {HydrateApiFlavor, HydrateFlavor} from '@grammyjs/hydrate';
import {Ai} from '@cloudflare/ai';

interface Decor {
  Q1: string; // 'سبک روستیک' | 'سبک ساحلی' | 'سبک مدرن' | 'سبک اسکاندیناوی' | 'سبک صنعتی' | 'سبک معاصر' | 'سبک سنتی'
  Q2: string; // 'آشپزخانه' | 'اتاق خواب' | 'اتاق نشیمن' | 'کلوزت'
  Q3: string; // 'کابینت با جزیره' | 'کابینت بدون جزیره'
  Q4: string; // 'تخت خواب یک نفره' | 'تخت خواب دو نفره'
  Q5: string; // 'مبلمان چهار نفره' | 'مبلمان شش نفره' | 'مبلمان هشت نفره'
  Q6: string; // 'کلوزت دارد' | 'کلوزت ندارد'
  Q7: string; // 'متراژ کوچک' | 'متراژ متوسط' | 'متراژ بزرگ' | 'متراژ خیلی بزرگ'
  Q8: string; // 'روشنایی لوستر' | 'روشنایی چراغ سقفی' | 'روشنایی لامپ ال ای دی'
  Q9: string; // 'چیدمان ساده و ارزان' | 'چیدمان گران و تجملاتی'
  Q10: string; // 'رنگ ها'
}

type Env = {
  Bindings: {
    AI: Ai;
    D1: D1Database;
    BOT_TOKEN: string;
  };
  Variables: {};
};

type CustomApi = HydrateApiFlavor<Api>;

type CustomContext = HydrateFlavor<
  {
    env: Env['Bindings'];
  } & Context &
    AutoChatActionFlavor &
    LazySessionFlavor<SessionData>
>;

type Metadata = {
  data: string;
  text: string;
};

type SessionData = {
  add: {
    leftOperand: number;
    rightOperand: number;
  };
  decor: Decor;
  multiply: {
    leftOperand: number;
    rightOperand: number;
  };
  route: string;
};

export type {Env, CustomApi, CustomContext, Metadata, SessionData};

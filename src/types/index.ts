import {Api, Context, LazySessionFlavor} from 'grammy';
import {AutoChatActionFlavor} from '@grammyjs/auto-chat-action';
import {HydrateApiFlavor, HydrateFlavor} from '@grammyjs/hydrate';

interface SessionData {
  leftOperand: number;
  rightOperand: number;
  route: string;
}

type CustomApi = HydrateApiFlavor<Api>;

type CustomContext = HydrateFlavor<Context & AutoChatActionFlavor & LazySessionFlavor<SessionData>>;

export type {CustomApi, CustomContext, SessionData};

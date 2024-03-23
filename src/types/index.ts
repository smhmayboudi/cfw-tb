import {ParseModeFlavor} from '@grammyjs/parse-mode';
import {Context, LazySessionFlavor} from 'grammy';
import {AutoChatActionFlavor} from '@grammyjs/auto-chat-action';
interface SessionData {
  leftOperand: number;
  rightOperand: number;
  route: string;
  user?: {
    __language_code?: string;
  };
}

type CustomContext = ParseModeFlavor<Context & AutoChatActionFlavor & LazySessionFlavor<SessionData>>;

export type {CustomContext, SessionData};

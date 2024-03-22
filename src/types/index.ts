import {ParseModeFlavor} from '@grammyjs/parse-mode';
import {Context, SessionFlavor} from 'grammy';

interface SessionData {
  leftOperand: number;
  rightOperand: number;
  route: string;
  user?: {
    __language_code?: string;
  };
}

type CustomContext = ParseModeFlavor<Context & SessionFlavor<SessionData>>;

export type {CustomContext, SessionData};

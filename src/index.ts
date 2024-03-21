import {Ai} from '@cloudflare/ai';
import {AiTextGenerationOutput} from '@cloudflare/ai/dist/ai/tasks/text-generation';
import {Hono} from 'hono';

export type Bindings = {
  AI: any;
};

const app = new Hono<{Bindings: Bindings}>();

app.get('/', async ctx => {
  const hasResponse = (
    update: AiTextGenerationOutput
  ): update is {
    response: string;
  } => (update as {response: string}).response !== undefined;

  const ai = new Ai(ctx.env?.AI);
  const messages = [
    {role: 'system', content: 'You are a friendly assistant'},
    {role: 'user', content: 'What is the origin of the phrase Hello, World'},
  ];
  const inputs = {messages};
  const response = await ai.run('@cf/meta/llama-2-7b-chat-fp16', inputs).then(response => (hasResponse(response) ? response.response : ''));
  return ctx.json(`Hello World! ${response}`);
});

export default app;

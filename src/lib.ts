import {AiTextGenerationOutput} from '@cloudflare/ai/dist/ai/tasks/text-generation';

const fetch_json = async (requestInfo: RequestInfo): Promise<Record<string, unknown>> =>
  fetch(requestInfo).then(value =>
    value
      .clone()
      .text()
      .then(value => JSON.parse(value))
      .catch(() => console.log({error: 'failed to parse JSON of response.'}))
  );

const hasResponse = (
  update: AiTextGenerationOutput
): update is {
  response: string;
} => (update as {response: string}).response !== undefined;

const sha256 = async (text: string): Promise<string> =>
  crypto.subtle.digest('SHA-256', new TextEncoder().encode(text)).then(array_buffer =>
    Array.from(new Uint8Array(array_buffer))
      .map(b => b.toString(16).padStart(2, '0'))
      .join('')
  );

export {fetch_json, hasResponse, sha256};

import * as Encoding from 'encoding-japanese';

const URL = 'https://www8.cao.go.jp/chosei/shukujitsu/syukujitsu.csv';
const TTL = 60 * 60 * 24;
const KEY = 'holiday';

export default {
  async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
    console.log("fetch");
    
    try {
      let json = await env.KV.get(KEY);

      if (json == null) {
        const buffer = await download();
        const data = convert(buffer);
        json = JSON.stringify(data);

        await env.KV.put(KEY, json, { expirationTtl: TTL });
      }

      return new Response(json, {
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
        },
      });
    } catch (error) {
      console.error(error);
      return new Response('Internal Server Error', { status: 500 });
    }
  },

  async scheduled(event: ScheduledEvent, env: Env, ctx: ExecutionContext) {
    console.log("scheduled" + event.timeStamp)

    try {
      const buffer = await download();
      const data = convert(buffer);

      const json = JSON.stringify(data);
      await env.KV.put(KEY, json, { expirationTtl: TTL });
    } catch (error) {
      console.error(error);
    }


  },
};

async function download() {
  const request = await fetch(URL);
  return await request.arrayBuffer();
}

function convert(buffer: ArrayBuffer) {
  const uintBuffer = new Uint8Array(buffer);
  const fromEncoding = Encoding.detect(uintBuffer);
  console.log('convert Encoding:' + fromEncoding);

  const utf8Buffer = Encoding.convert(uintBuffer, {
    to: 'UNICODE',
    from: fromEncoding as any,
  });

  const text = Encoding.codeToString(utf8Buffer);
  const holidays = [];
  let isHeader = true;

  for (const line of text.split('\r\n')) {
    if (isHeader) {
      isHeader = false;
      continue;
    }

    const sp = line.split(',');
    holidays.push({ date: sp[0], name: sp[1] });
  }

  return holidays;
}

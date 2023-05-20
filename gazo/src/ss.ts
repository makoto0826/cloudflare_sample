import puppeteer from '@cloudflare/puppeteer'

const IMG_RESPONSE_INIT = {
  headers: {
    'content-type': 'image/jpeg',
  },
}

export default {
  async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
    const { searchParams } = new URL(request.url)
    const url = searchParams.get('url')

    if (url == null) {
      return new Response('Url not found')
    }

    const targetUrl = new URL(url).toString()

    try {
      const key = await createKey(targetUrl)
      console.log(`URL:${targetUrl} KEY:${key}`)

      let img = await env.MYBROWSER_KV.get(key, 'arrayBuffer')

      if (img == null) {
        img = await screenshot(targetUrl, env)
        await env.MYBROWSER_KV.put(key, img, {
          metadata: {
            url: targetUrl,
            date: new Date(),
          },
          expirationTtl: 60 * 5,
        })
      }

      return new Response(img, IMG_RESPONSE_INIT)
    } catch (e) {
      console.error(e)
      return new Response('SS Worker error')
    }
  },
}

async function createKey(url: string): Promise<string> {
  const text = new TextEncoder().encode(url)
  const buffer = await crypto.subtle.digest('SHA-256', text)

  return Array.from(new Uint8Array(buffer))
    .map((x) => x.toString(16).padStart(2, '0'))
    .join('')
}

async function screenshot(url: string, env: Env) {
  const browser = await puppeteer.launch(env.MYBROWSER)
  const page = await browser.newPage()
  await page.goto(url)

  const img = (await page.screenshot()) as Buffer
  await browser.close()

  return img
}

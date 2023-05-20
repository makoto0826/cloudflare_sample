import handleScreenshot from './ss'

export default {
  async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
    const url = new URL(request.url)

    switch (url.pathname) {
      case '/ss':
        return handleScreenshot.fetch(request, env, ctx)
    }

    return new Response('Missing handler')
  },
}

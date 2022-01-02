import type { RequestHandler } from '@sveltejs/kit';

interface EmailSignupParams {
  email: string;
  name: string;
}

const wait = (ms = 200) => new Promise<void>((resolve) => setTimeout(resolve, ms));

export const post: RequestHandler = async ({body, }) => {

  const {email = 'nope@wrong.com', name = 'not found'} = (body as unknown) as EmailSignupParams;

  await wait();

  return {
    status: 200,
    body: {
      message: `${name}: ${email}`
    }
  }
}

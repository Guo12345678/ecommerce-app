import { HttpStatus, secureEndpoint } from '@/lib/server';

export default secureEndpoint(async (req, res) => {
  await req.session.destroy();
  return res.status(HttpStatus.noContent).end();
});

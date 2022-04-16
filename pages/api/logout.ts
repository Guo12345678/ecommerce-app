import { HttpStatus, secureEndpoint } from '@/lib/server';

export default secureEndpoint(async (req, res) => {
  req.session.user = null;
  await req.session.save();
  return res.status(HttpStatus.noContent).end();
});

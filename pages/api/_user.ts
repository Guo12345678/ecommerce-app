import { secureEndpoint } from '@/lib/server';

export default secureEndpoint(async (req, res) => {
  return req.session.user ? res.json(req.session.user) : res.send('null');
});

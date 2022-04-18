import { HttpStatus, secureEndpoint } from '@/lib/server';

export default secureEndpoint((req, res) => {
  req.session.destroy();
  return res.status(HttpStatus.noContent).end();
});

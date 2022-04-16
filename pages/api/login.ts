import db, { HttpStatus, secureEndpoint } from '@/lib/server';
import type { Login, UserSession } from '@/lib/types';

/** These statements shoud return a {@link UserSession}. */
const login = db.prepare<[string, string, string]>(
  `--sql
  select buyer_id as userId, username from Buyer
  where (email = ? or username = ?) and password = ?`
);

const vendorLogin = db.prepare<[string, string, string]>(
  `--sql
  select vendor_id as userId, username from Vendor
  where (email = ? or username = ?) and password = ?`
);

export default secureEndpoint(async (req, res) => {
  if (!(req.method === 'POST' && req.body && req.body.identity && req.body.password)) {
    return res.status(HttpStatus.unprocessableEntity).end();
  }
  const stmt = req.query.type == 'vendor' ? vendorLogin : login;
  const { identity, password } = req.body as Login;
  const cred: UserSession | undefined = stmt.get(identity, identity, password);
  if (!cred) {
    return res.status(HttpStatus.unauthorized).send('Invalid username, email or password.');
  }
  req.session.user = cred;
  await req.session.save();
  return res.status(HttpStatus.ok).end();
});

import db, { HttpStatus, secureEndpoint } from '../../lib/server';
import type { UserSession } from '../../lib/types';

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
  if (req.method === 'POST' && req.body && req.body.identity && req.body.password) {
    const stmt = req.query.type == 'vendor' ? vendorLogin : login;
    const { identity, password } = req.body;
    const cred: UserSession | undefined = stmt.get(identity, identity, password);
    if (cred) {
      req.session.user = cred;
      await req.session.save();
      return res.status(HttpStatus.ok).end();
    }
    return res.status(HttpStatus.unauthorized).send('Invalid username, email or password.');
  }
  res.status(HttpStatus.unprocessableEntity).end();
});

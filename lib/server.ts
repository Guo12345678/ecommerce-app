/** Utilities for the server only. */

import 'dotenv/config';
import Database from 'better-sqlite3';
import { openSync, readFileSync, closeSync } from 'fs';
import { IronSessionOptions } from 'iron-session';
import { withIronSessionApiRoute } from 'iron-session/next';
import type {
  GetStaticPaths,
  GetStaticProps,
  GetStaticPropsResult,
  NextApiRequest,
  NextApiResponse,
} from 'next';

const db = process.env.NODE_ENV === 'development' ? prepareDatabase() : Database('database.db');
export default db;

function prepareDatabase(path = 'db/test.db') {
  // Truncate the file to nothing.
  closeSync(openSync(path, 'w'));
  const db = Database(path);
  db.exec(readFileSync('db/schema.sql').toString());
  return db;
}

/** Common HTTP status codes. */
export const enum HttpStatus {
  ok = 200,
  created = 201,
  noContent = 204,
  badRequest = 400,
  unauthorized = 401,
  notFound = 404,
  unprocessableEntity = 422,
  internalError = 500,
  notImplemented = 501,
}

const sessionOptions: IronSessionOptions = {
  password: process.env.SECRET_COOKIE_PASSWORD as string,
  cookieName: 'ecommerce-app',
  cookieOptions: {
    secure: process.env.NODE_ENV === 'production',
  },
};

export function secureEndpoint(fn: (req: NextApiRequest, res: NextApiResponse) => any) {
  return withIronSessionApiRoute(fn, sessionOptions);
}

declare module 'iron-session' {
  interface IronSessionData {
    user?: {
      userId: string;
    };
  }
}

export namespace Queries {
  const homepageStmt = db.prepare<[]>(
    `--sql
    select L.name, L.description, L.price,
           LI.url as link,
           L.listing_id as id
    from Listing L
    -- outer join, so that listings appear even
    -- if there are no images, in which case 'link'
    -- will be null.
    left outer join ListingImages LI
    on
      L.listing_id = LI.listing_id`
  );
  interface Listing {
    id: string;
    name: string;
    description: string;
    price: string;
    link?: string;
  }
  export interface HomepageProps {
    items: Listing[];
  }
  export function getHomepageProps(): GetStaticPropsResult<HomepageProps> {
    const items: Listing[] = homepageStmt.all();
    return {
      props: { items },
    };
  }
  // -------------------------------------------------------
  const listingStmt = db.prepare<[listingId: string]>(
    `--sql
    select *
    from Listing
    where listing_id = ?`
  );
  const listingIdsStmt = db
    .prepare<[]>(
      `--sql
    select listing_id as id
    from Listing`
    )
    .pluck();
  interface ListingInfo {}
  export interface ListingProps {
    info: ListingInfo;
  }
  export const getListingProps: GetStaticProps<ListingProps> = async ({ params }) => {
    const listingId = params?.id;
    if (!listingId) return { notFound: true };
    const row = listingStmt.get(listingId as string);
    if (!row) return { notFound: true };
    return {
      props: { info: row },
    };
  };
  export const getListingPaths: GetStaticPaths = async () => {
    const rows = listingIdsStmt.all();
    return {
      paths: rows.map((row) => ({ params: { id: String(row) } })),
      fallback: false,
    };
  };
}

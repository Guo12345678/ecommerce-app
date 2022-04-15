import type { GetStaticPaths, GetStaticProps } from 'next';
import db from '../../lib/server';

interface ListingInfo {}
interface ListingProps {
  info: ListingInfo;
}

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

export const getStaticProps: GetStaticProps<ListingProps> = async ({ params }) => {
  const listingId = params?.id;
  if (!listingId) return { notFound: true };
  const row = listingStmt.get(listingId as string);
  if (!row) return { notFound: true };
  return {
    props: { info: row },
  };
};
export const getStaticPaths: GetStaticPaths = async () => {
  const rows = listingIdsStmt.all();
  return {
    paths: rows.map((row) => ({ params: { id: String(row) } })),
    fallback: false,
  };
};

export default function Listing({ info }: ListingProps) {
  return <div>{JSON.stringify(info)}</div>;
}

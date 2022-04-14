import { Queries } from '../../lib/server';

export const getStaticProps = Queries.getListingProps;
export const getStaticPaths = Queries.getListingPaths;

export default function Listing({ info }: Queries.ListingProps) {
  return <div>{JSON.stringify(info)}</div>;
}

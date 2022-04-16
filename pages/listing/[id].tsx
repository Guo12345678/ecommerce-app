import { AppShell, Card, Image, Header, Navbar } from '@mantine/core';
import type { GetStaticPaths, GetStaticProps } from 'next';
import { ColorSchemeToggle } from '@/components/ColorSchemeToggle/ColorSchemeToggle';
import { MainLinks } from '@/components/NavBarItems';
import db from '@/lib/server';

interface ListingInfo {
  id: string;
  name: string;
  price: number;
  description: string;
  link?: string;
}
interface ListingProps {
  info: ListingInfo;
}

const listingStmt = db.prepare<[listingId: string]>(
  `--sql
    select L.name, L.description, L.price,
           LI.url as link,
           L.listing_id as id
    from Listing L
    left outer join ListingImages LI
    on
      L.listing_id = LI.listing_id
    where L.listing_id = ?`
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
  return (
    <AppShell
      header={
        <Header height={80}>
          <h2>Listing Information</h2>
          <ColorSchemeToggle />
        </Header>
      }
      navbar={
        <Navbar width={{ base: 300 }}>
          <MainLinks />
        </Navbar>
      }
    >
      <Card shadow="md">
        {info.link && (
          <Card.Section>
            <Image fit="cover" height={600} src={info.link} />
          </Card.Section>
        )}
        <h5>Name</h5>
        <p>{info.name}</p>
        <h5>Description</h5>
        <p>{info.description}</p>
        <h1>${info.price}</h1>
      </Card>
    </AppShell>
  );
}

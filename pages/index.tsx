// import { AppShell, Navbar, Header, Grid, Group } from '@mantine/core';
import { CardItem } from '@/components/Card';
// import { MainLinks } from '../components/NavBarItems';
import db, { secureSession } from '@/lib/server';
import { Grid } from '@mantine/core';
// import { UserSession } from '@/lib/types';

interface Listing {
  id: string;
  name: string;
  description: string;
  price: string;
  link?: string;
}

interface HomepageProps {
  items: Listing[];
  // user: UserSession | null;
}

const placeholder = 'https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png';

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

export const getServerSideProps = secureSession<HomepageProps>(async ({ req }) => {
  const user = req.session.user ?? null;
  const items = homepageStmt.all();
  return { props: { user, items } };
});

export default function HomePage({ items }: HomepageProps) {
  return (
    <Grid>
      {items.map((item) => (
        <Grid.Col key={item.id} lg={3} md={4} sm={6}>
          <CardItem {...{ ...item, link: item.link || placeholder }} />
        </Grid.Col>
      ))}
    </Grid>
  );
}

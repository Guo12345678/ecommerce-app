import { AppShell, Navbar, Header, Grid } from '@mantine/core';
import { CardItem } from '../components/Card';
import { MainLinks } from '../components/NavBarItems';
import { Queries } from '../lib/server';

export const getStaticProps = Queries.getHomepageProps;

const placeholder = 'https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png';

export default function HomePage({ items }: Queries.HomepageProps) {
  return (
    <AppShell
      padding="md"
      navbar={
        <Navbar width={{ base: 300 }} height={500} p="xs">
          <MainLinks />
        </Navbar>
      }
      header={
        <Header height={80} p="xs">
          <h2>Eccommerce App</h2>
        </Header>
      }
      styles={(theme) => ({
        main: {
          backgroundColor:
            theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0],
        },
      })}
    >
      <Grid>
        {items.map((item) => (
          <Grid.Col key={item.name} lg={4} md={12}>
            <CardItem {...{ ...item, link: item.link || placeholder }} />
          </Grid.Col>
        ))}
      </Grid>
    </AppShell>
  );
}

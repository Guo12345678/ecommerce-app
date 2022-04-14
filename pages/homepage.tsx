import { AppShell, Navbar, Header, Grid } from '@mantine/core';
import { CardItem } from '../components/Card';
import { MainLinks } from '../components/NavBarItems';

export default function HomePage() {
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
        main: { backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0] },
      })}
    >
    <Grid>
        <Grid.Col span={4}>
            <CardItem 
                link="https://www.nme.com/wp-content/uploads/2020/06/ps5-credit-sie@2000x1270.jpg"
                description='Sony Playstation 5'
                name="PlayStation 5"
            />
        </Grid.Col>
        <Grid.Col span={4}>
            <CardItem 
                link="https://m.media-amazon.com/images/I/81p83lbc4ML._AC_SX679_.jpg"
                description='Diapers Size 2, 186 Count - Pampers Swaddlers Disposable Baby Diapers, ONE MONTH SUPPLY (Packaging May Vary)'
                name="Diapers Size 2, 186 Count"
            />
        </Grid.Col>
        <Grid.Col span={4}>
            <CardItem 
                link="https://m.media-amazon.com/images/I/61vFO3R5UNL._AC_SX679_.jpg"
                description='2021 Apple MacBook Pro (14-inch, Apple M1 Pro chip with 8‑core CPU and 14‑core GPU, 16GB RAM, 512GB SSD) - Space Gray'
                name="2021 Apple MacBook Proß"
            />
        </Grid.Col>
        <Grid.Col span={4}>
            <CardItem 
                link="https://m.media-amazon.com/images/I/615YaAiA-ML._SX522_.jpg"
                description='Diapers Size 2, 186 Count - Pampers Swaddlers Disposable Baby Diapers, ONE MONTH SUPPLY (Packaging May Vary)'
                name="Oculus Quest 2"
            />
        </Grid.Col>
        <Grid.Col span={4}>
            <CardItem 
                link="https://m.media-amazon.com/images/I/61LKmORUuXL._AC_SX679_.jpg"
                description='Kindle - With a Built-in Front Light - Black - Ad-Supported'
                name="Kindle"
            />
        </Grid.Col>
        <Grid.Col span={4}>
            <CardItem 
                link="https://m.media-amazon.com/images/I/81Eqgg0cvrL._AC_SX679_.jpg"
                description='Echo Dot (4th Gen, 2020 release) | Smart speaker with Alexa | Charcoal'
                name="Echo Dot"
            />
        </Grid.Col>
    </Grid>
    
    </AppShell>
  );
}

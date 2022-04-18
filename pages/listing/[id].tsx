import { Card, Image, Center, Text, Space, Group, Button, Stack } from '@mantine/core';
import type { GetStaticPaths, GetStaticProps } from 'next';
import db from '@/lib/server';
import { PageProps } from '@/lib/types';
import { fetchJson } from '@/lib/client';
import { showNotification } from '@mantine/notifications';

export interface ListingInfo extends PageProps {
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
    fallback: 'blocking',
  };
};

export default function Listing({ info }: ListingProps) {
  async function onClick() {
    const res = await fetchJson('/api/cart', info, { method: 'POST' });
    if (res.status < 400) {
      return showNotification({
        title: 'Item added',
        message: `Added "${info.name}" to cart`,
        color: 'green',
      });
    }
    showNotification({
      title: 'Item coud not be added',
      message: res.statusText,
      color: 'red',
    });
  }
  return (
    <Center>
      <Card shadow="md">
        {info.link && (
          <Card.Section>
            <Image fit="cover" height={300} src={info.link} />
          </Card.Section>
        )}
        <Stack align="flex-start">
          <Space w="md" />
          <Text size="xl" weight="bold">
            {info.name}
          </Text>
          <Text size="md">{info.description}</Text>
          <Text size="xl">${info.price}</Text>
          <Group>
            <Button color="green" disabled>
              Buy now
            </Button>
            <Button onClick={onClick}>Add to cart</Button>
          </Group>
        </Stack>
      </Card>
    </Center>
  );
}

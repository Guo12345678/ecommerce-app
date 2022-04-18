import type { CartItem } from '@/pages/cart';
import { Card, Text, Stack, Group, Image, Badge, Grid } from '@mantine/core';

export default function CartListItem(props: CartItem) {
  return (
    <Card sx={{ width: 800 }}>
      <Card.Section>
        <Group>
          <Image height={120} width={120} fit="cover" src={props.url}></Image>
          <Stack sx={{ padding: '12px 8px 12px 8px' }} align="flex-start" spacing="xs">
            <Text size="lg">{props.name}</Text>
            <Badge>in stock</Badge>
            <Text size="sm">Qty: {props.qty}</Text>
          </Stack>
        </Group>
      </Card.Section>
    </Card>
  );
}

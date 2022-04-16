import { useLoading } from '@/lib/client';
import { LoadingOverlay } from '@mantine/core';

export function GlobalSpinner() {
  const { loading } = useLoading();
  return <LoadingOverlay visible={loading} />;
}

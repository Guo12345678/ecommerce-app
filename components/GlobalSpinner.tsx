import { LoadingOverlay } from '@mantine/core';
import { useGlobalFetch } from '../lib/client';

export function GlobalSpinner() {
  const loading = useGlobalFetch((state) => state.loading);
  return <LoadingOverlay visible={loading} />;
}

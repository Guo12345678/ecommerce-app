import { Button } from '@mantine/core';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useGlobalFetch } from '../lib/client';
import { secureSession } from '../lib/server';
import { UserSession } from '../lib/types';

interface IndexProps {
  user: UserSession | null;
}

export const getServerSideProps = secureSession<IndexProps>(async ({ req }) => {
  const user = req.session.user ?? null;
  return {
    props: {
      user,
    },
  };
});

export default function HomePage({ user }: IndexProps) {
  const router = useRouter();
  const fetcher = useGlobalFetch((state) => state.fetch);
  return (
    <>
      <h1>ECommerce Application</h1>
      <br></br>
      <Link href="/login">Login</Link>
      <br></br>
      <Link href="/login?action=signup">Signup</Link>
      {user ? (
        <span>
          Welcome back, {user.username}
          <Button
            onClick={async () => {
              await fetcher('/api/logout');
              router.push('/login');
            }}
          >
            Logout
          </Button>
        </span>
      ) : (
        <span>Hello there, stranger.</span>
      )}
    </>
  );
}

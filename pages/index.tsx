import { Button } from '@mantine/core';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { secureSession } from '@/lib/server';
import { UserSession } from '@/lib/types';
import { useLoading } from '@/lib/client';

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
  const { fetch } = useLoading();
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
              await fetch('/api/logout');
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

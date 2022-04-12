import { Welcome } from '../components/Welcome/Welcome';
import Link from 'next/link'

import { ColorSchemeToggle } from '../components/ColorSchemeToggle/ColorSchemeToggle';

export default function HomePage() {
  return (
    <>
      <h1>ECommerce Application</h1>
      <br></br>
      <Link href='/login'>
        Login
      </Link>
      <br></br>
      <Link href='/signup'>
        Signup
      </Link>
    </>
  );
}

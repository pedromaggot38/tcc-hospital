import { Button } from '@/components/ui/button';
import HomeLayout from './(web)/layout';
import HomePage from './(web)/page';
import Link from 'next/link';

export default function Home() {
  const pass = 'kNGLmqUEz0pUxMM0'
  return (
    <HomeLayout>
      <HomePage />
      <div className="flex gap-5">
        <Button>
          <Link href={'/login'}>Login</Link>
        </Button>
        <Button>
          <Link href={'/dashboard'}>Dashboard</Link>
        </Button>
      </div>
    </HomeLayout>
  );
}

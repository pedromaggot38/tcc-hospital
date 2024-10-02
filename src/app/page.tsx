import { Button } from '@/components/ui/button';
import HomeLayout from './(web)/layout';
import HomePage from './(web)/page';
import Link from 'next/link';

export default function Home() {
  const pass = 'kNGLmqUEz0pUxMM0'
  return (
    <HomeLayout>
      
      <div className="flex gap-4 min-h-screen justify-center items-center ">
        <Button
          asChild
          size='sm'
        >
          <Link href={'/login'}>Login</Link>
        </Button>
        <Button
          asChild
          size='sm'
        >
          <Link href={'/dashboard'}>Dashboard</Link>
        </Button>
      </div>
    </HomeLayout>
  );
}

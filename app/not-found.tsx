import Link from 'next/link';
import HttpStatus from '@/components/httpStatus';

export default function NotFound() {
  return (
    <main className="flex items-center justify-center min-h-screen">
      <Link href="/" className="mt-4 underline">
      <HttpStatus status={404} label="Page not found" />
      </Link>
    </main>
  );
}
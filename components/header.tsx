import Link from 'next/link'
import ThemeToggle from './theme-toggle'

export default function Header() {
  return (
    <header className='fixed inset-x-0 top-0 z-50 bg-background/75 py-6 backdrop-blur-sm flex justify-center'>
      <nav className='container flex max-w-3xl items-center justify-between'>
        <div className='flex items-center space-x-4'>
          <Link href='/' className='font-serif text-2xl font-bold'>
            MA
          </Link>
          <Link href='/cv' className='font-medium hover:underline'>
            CV
          </Link>
        </div>
        <ThemeToggle />
      </nav>
    </header>
  )
}

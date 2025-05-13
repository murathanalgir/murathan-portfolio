'use client'
// import HttpStatus from '@/components/ui/HttpStatus'
import HttpStatus from './../components/httpStatus';

export default function Error({ error, reset }: { error: Error, reset: () => void }) {
  const code = Number(error.message) || 500
  return (
    <main className="flex items-center justify-center min-h-screen">
      <HttpStatus status={code} label={`Oops! ${code}`} />
      <button onClick={() => reset()} className="mt-4 underline">Try again</button>
    </main>
  )
}
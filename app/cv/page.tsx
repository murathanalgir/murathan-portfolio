/* eslint-disable @typescript-eslint/no-unused-vars */
// app/cv/page.tsx
import Link from 'next/link'
import { Metadata } from 'next'
import { format } from 'date-fns'

export const metadata: Metadata = {
  title: 'Murathan ALGIR • CV'
}

export default function CvPage() {
  return (
    <section className="container mx-auto py-16 text-center">
      <h1 className="text-3xl font-bold mb-6">Download my CV</h1>
      <a
        href="/murathanCv.pdf"
        download="MurathanAlgirCV.pdf"
        className="inline-block px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary-dark transition"
      >
        Download CV
      </a>
      <div className="mt-12">
        <iframe
          src="/murathanCv.pdf"
          title="CV Preview"
          className="w-full h-[80vh] rounded-lg border"
        />
      </div>
    </section>
  )
}

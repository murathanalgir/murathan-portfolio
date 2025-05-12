
import Image from 'next/image'
import authorImage from '@/public/images/authors/murat.jpg'

export default function intro() {
  return (
    <section className="container mx-auto flex flex-col-reverse items-center justify-center gap-x-10 gap-y-4 pb-24 md:flex-row">
      <div className="mt-2 flex-1 md:mt-0 text-center md:text-left">
        <h1 className="title">👋 Hey, I’m Murathan.</h1>
        <p className="mt-3 font-light text-muted-foreground">
          I’m a software engineer based in Istanbul, Turkey. I’m passionate about
          learning new technologies and sharing knowledge with others.
        </p>
      </div>
      <div className="relative">
        <Image
          src={authorImage}
          alt="Murathan Algir"
          width={175}
          height={175}
          priority
          className="rounded-2xl grayscale object-cover"
        />
      </div>
    </section>
  )
}

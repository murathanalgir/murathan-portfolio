import Image from 'next/image'

interface HttpStatusProps {
  status: number
  label?: string
}

export default function HttpStatus({ status }: HttpStatusProps) {
  const url = `https://http.cat/${status}.jpg`

  return (
    <div className="flex flex-col items-center p-4 bg-card text-card-foreground rounded-lg shadow-md">
      <Image
        src={url}
        alt={`HTTP ${status}`}
        width={400}
        height={300}
        className="max-w-full h-auto mb-2"
        unoptimized
      />
      {/* <p className="text-lg font-medium">
        {label ?? `HTTP ${status}`}
      </p> */}
    </div>
  )
}

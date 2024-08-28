import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-[90vh] flex items-center justify-center">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold">404 - Not Found</h1>
        <p>
          Tell us how you got here on our{' '}
          <a
            href="https://discord.com/invite/UKCS9ghzUE"
            target="_blank"
            rel="noreferrer"
            className="text-blue-500 hover:text-blue-600 underline"
          >
            discord
          </a>
          .
        </p>
        <p>
          Go back to safety of{' '}
          <Link href="/">
            <span className="text-foreground hover:text-violet-500 underline">homepage</span>
          </Link>
          .
        </p>
      </div>
    </div>
  )
}

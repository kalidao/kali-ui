import Link from 'next/link'
import { link } from './Link.css'
import type { LinkProps as NextLinkProps } from 'next/link'

type LinkProps = {
  children: React.ReactNode
}

export default function CustomLink({ href, children, ...props }: LinkProps & NextLinkProps) {
  return (
    <Link href={href} {...props} passHref>
      <a className={link}>{children}</a>
    </Link>
  )
}

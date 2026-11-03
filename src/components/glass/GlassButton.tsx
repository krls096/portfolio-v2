import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react'

type Variant = 'primary' | 'glass' | 'ghost'
type Size = 'md' | 'lg'

type Common = { variant?: Variant; size?: Size; children: ReactNode; className?: string }
type AsLink = Common & AnchorHTMLAttributes<HTMLAnchorElement> & { href: string }
type AsButton = Common & ButtonHTMLAttributes<HTMLButtonElement> & { href?: undefined }

const base = 'inline-flex items-center justify-center gap-2 rounded-full font-medium cursor-pointer select-none ' +
  'transition-[transform,background-color,box-shadow,color] duration-200 ease-[var(--ease-spring)] ' +
  'hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none'

const variants: Record<Variant, string> = {
  primary: 'bg-accent text-white shadow-[0_10px_30px_-10px_var(--accent)] hover:shadow-[0_14px_36px_-8px_var(--accent)]',
  glass: 'glass text-fg hover:bg-glass-strong',
  ghost: 'text-muted hover:text-fg hover:bg-glass',
}

const sizes: Record<Size, string> = {
  md: 'h-11 px-5 text-sm',
  lg: 'h-12 px-6 text-base',
}

export function GlassButton(props: AsLink | AsButton) {
  const { variant = 'glass', size = 'lg', className = '', children, ...rest } = props
  const cls = `${base} ${variants[variant]} ${sizes[size]} ${className}`

  if (rest.href !== undefined) {
    const { href, ...a } = rest as AnchorHTMLAttributes<HTMLAnchorElement> & { href: string }
    const external = /^https?:/.test(href)
    return (
      <a href={href} className={cls} {...(external ? { target: '_blank', rel: 'noopener' } : {})} {...a}>
        {children}
      </a>
    )
  }
  const b = rest as ButtonHTMLAttributes<HTMLButtonElement>
  return <button type="button" className={cls} {...b}>{children}</button>
}

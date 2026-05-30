// app/_components/portal/Btn.tsx
// SkyFort Client Portal — button primitive.
//
// Variants:
//   primary  — brand blue bg, white text
//   ink      — near-black bg, white text
//   ghost    — transparent bg, current text, hairline border
//   paper    — white bg, ink text, hairline border
//   blank    — transparent, no border (used for icon-only triggers)
//
// Sizes: sm | md | lg

'use client';

import Link from 'next/link';
import { forwardRef } from 'react';
import type { CSSProperties, MouseEventHandler, ReactNode } from 'react';

type Variant = 'primary' | 'ink' | 'ghost' | 'paper' | 'blank';
type Size = 'sm' | 'md' | 'lg';

const SIZE_CLASSES: Record<Size, string> = {
  sm: 'h-8 px-3 text-[12px] rounded-[8px] gap-1.5',
  md: 'h-10 px-3.5 text-[13px] rounded-[10px] gap-2',
  lg: 'h-12 px-5 text-[14px] rounded-[12px] gap-2.5',
};

const VARIANT_STYLES: Record<Variant, CSSProperties> = {
  primary: {
    background: 'var(--color-brand)',
    color: '#fff',
    border: '1px solid var(--color-brand)',
  },
  ink: {
    background: 'var(--portal-ink)',
    color: '#fff',
    border: '1px solid var(--portal-ink)',
  },
  ghost: {
    background: 'transparent',
    color: 'inherit',
    border: '1px solid currentColor',
  },
  paper: {
    background: '#fff',
    color: 'var(--portal-ink)',
    border: '1px solid var(--portal-line)',
  },
  blank: {
    background: 'transparent',
    color: 'inherit',
    border: '1px solid transparent',
  },
};

interface BtnProps {
  children?: ReactNode;
  variant?: Variant;
  size?: Size;
  icon?: ReactNode;
  iconRight?: ReactNode;
  type?: 'button' | 'submit' | 'reset';
  href?: string;
  target?: string;
  rel?: string;
  full?: boolean;
  disabled?: boolean;
  loading?: boolean;
  onClick?: MouseEventHandler<HTMLElement>;
  className?: string;
}

// Polymorphic element (a | Link | button) means the forwarded ref instance
// type can't be a single concrete element without per-element casts; `any`
// here is the pragmatic, lint-clean choice for the ref slot only.
const Btn = forwardRef<any, BtnProps>(function Btn(
  {
    children,
    variant = 'primary',
    size = 'md',
    icon,
    iconRight,
    type = 'button',
    href,
    target,
    rel,
    full,
    disabled = false,
    loading = false,
    onClick,
    className = '',
    ...rest
  },
  ref
) {
  const sizeCls = SIZE_CLASSES[size] || SIZE_CLASSES.md;
  const variantStyle = VARIANT_STYLES[variant] || VARIANT_STYLES.primary;

  const cls = [
    'inline-flex items-center justify-center font-semibold whitespace-nowrap',
    'transition-[transform,opacity] duration-150 active:translate-y-[1px]',
    'disabled:opacity-50 disabled:pointer-events-none',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-brand)] focus-visible:ring-offset-2',
    full ? 'w-full' : '',
    sizeCls,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const content = (
    <>
      {icon && <span className="inline-flex">{icon}</span>}
      <span>{loading ? '…' : children}</span>
      {iconRight && <span className="inline-flex">{iconRight}</span>}
    </>
  );

  if (href) {
    const isExternal =
      href.startsWith('http') || href.startsWith('mailto:') || href.startsWith('tel:');
    if (isExternal) {
      return (
        <a
          ref={ref}
          href={href}
          target={target || '_blank'}
          rel={rel || 'noopener noreferrer'}
          className={cls}
          style={variantStyle}
          onClick={onClick}
          {...rest}
        >
          {content}
        </a>
      );
    }
    return (
      <Link ref={ref} href={href} target={target} rel={rel} className={cls} style={variantStyle} onClick={onClick} {...rest}>
        {content}
      </Link>
    );
  }

  return (
    <button
      ref={ref}
      type={type}
      disabled={disabled || loading}
      className={cls}
      style={variantStyle}
      onClick={onClick}
      {...rest}
    >
      {content}
    </button>
  );
});

export default Btn;

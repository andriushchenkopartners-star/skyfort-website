// app/_components/portal/SFMark.jsx
// SkyFort geometric logo mark (square, scalable).
// Reused from artifact assets/logo.svg.

export default function SFMark({ size = 28, color = 'var(--color-brand)' }) {
  return (
    <svg
      viewBox="0 0 97 90"
      width={size}
      height={size * (90 / 97)}
      aria-label="SkyFort"
      style={{ display: 'block' }}
    >
      <path
        d="M27.69 0V55.38C12.41 55.38 0 42.98 0 27.69C0 12.41 12.41 0 27.69 0Z"
        fill={color}
      />
      <path
        d="M34.61 90L34.61 34.62C49.89 34.62 62.3 47.03 62.3 62.31C62.3 77.59 49.89 90 34.61 90Z"
        fill={color}
      />
      <path
        d="M62.31 27.69C47.02 27.69 34.62 15.29 34.62 0H62.31V27.69Z"
        fill={color}
      />
      <path
        d="M96.92 27.69L69.23 0H96.92V27.69Z"
        fill={color}
      />
      <path
        d="M27.69 76.155C27.69 68.509 21.491 62.31 13.845 62.31C6.198 62.31 0 68.509 0 76.155C0 83.801 6.198 90 13.845 90C21.491 90 27.69 83.801 27.69 76.155Z"
        fill={color}
      />
      <path
        d="M96.92 48.465C96.92 40.819 90.721 34.62 83.075 34.62C75.428 34.62 69.23 40.819 69.23 48.465C69.23 56.111 75.428 62.31 83.075 62.31C90.721 62.31 96.92 56.111 96.92 48.465Z"
        fill={color}
      />
    </svg>
  );
}

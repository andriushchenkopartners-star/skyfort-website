const SIZES = {
  sm: "max-w-3xl",     // 768px — long-form content (blog posts)
  md: "max-w-5xl",     // 1024px
  lg: "max-w-6xl",     // 1152px — default for most pages
  xl: "max-w-7xl",     // 1280px
  full: "max-w-none",
};

export default function Container({
  as: Tag = "div",
  size = "lg",
  className = "",
  children,
  ...rest
}) {
  const classes = [
    SIZES[size] ?? SIZES.lg,
    "mx-auto px-6 md:px-8",
    className,
  ]
    .filter(Boolean)
    .join(" ");
  return (
    <Tag className={classes} {...rest}>
      {children}
    </Tag>
  );
}

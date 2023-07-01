const Price = ({
  badgeText,
  ...props
}: {
  badgeText: string;
} & React.ComponentProps<'p'>) => (
  <p suppressHydrationWarning={true} {...props}>
    badgeText
  </p>
);

export default Price;

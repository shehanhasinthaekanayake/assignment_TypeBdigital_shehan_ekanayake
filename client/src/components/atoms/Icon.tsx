type Props = {
  name: string;
  size?: number;
  filled?: boolean;
  className?: string;
};

export function Icon({ name, size = 20, filled = false, className = "" }: Props) {
  return (
    <span
      className={`material-symbols-outlined ${className}`.trim()}
      style={{
        fontSize: size,
        fontVariationSettings: filled
          ? "'FILL' 1, 'wght' 400, 'GRAD' 0, 'opsz' 24"
          : "'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24",
      }}
      aria-hidden
    >
      {name}
    </span>
  );
}

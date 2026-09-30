import { Icon } from "./Icon";

type Props = {
  icon: string;
  label: string;
  onClick?: () => void;
  type?: "button" | "submit";
  variant?: "primary" | "ghost" | "danger";
  className?: string;
};

export function IconButton({
  icon,
  label,
  onClick,
  type = "button",
  variant = "ghost",
  className = "",
}: Props) {
  return (
    <button
      type={type}
      className={`icon-btn icon-btn--${variant} ${className}`.trim()}
      aria-label={label}
      onClick={onClick}
    >
      <Icon name={icon} size={variant === "primary" ? 20 : 18} />
    </button>
  );
}

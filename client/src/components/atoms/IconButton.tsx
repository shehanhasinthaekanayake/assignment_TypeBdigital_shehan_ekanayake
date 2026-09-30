import { Icon } from "./Icon";

type Props = {
  icon: string;
  label: string;
  onClick?: () => void;
  type?: "button" | "submit";
  variant?: "primary" | "ghost" | "danger";
  className?: string;
  disabled?: boolean;
};

export function IconButton({
  icon,
  label,
  onClick,
  type = "button",
  variant = "ghost",
  className = "",
  disabled = false,
}: Props) {
  return (
    <button
      type={type}
      className={`icon-btn icon-btn--${variant} ${className}`.trim()}
      aria-label={label}
      onClick={onClick}
      disabled={disabled}
    >
      <Icon name={icon} size={variant === "primary" ? 20 : 18} />
    </button>
  );
}

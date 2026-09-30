import { Icon } from "./Icon";

type Props = {
  done: boolean;
  onClick: () => void;
  label: string;
  disabled?: boolean;
};

export function CheckButton({ done, onClick, label, disabled = false }: Props) {
  return (
    <button
      type="button"
      className={done ? "check-btn check-btn--done" : "check-btn"}
      aria-label={label}
      onClick={onClick}
      disabled={disabled}
    >
      <Icon name="check" size={16} />
    </button>
  );
}

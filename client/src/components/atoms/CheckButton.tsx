import { Icon } from "./Icon";

type Props = {
  done: boolean;
  onClick: () => void;
  label: string;
};

export function CheckButton({ done, onClick, label }: Props) {
  return (
    <button
      type="button"
      className={done ? "check-btn check-btn--done" : "check-btn"}
      aria-label={label}
      onClick={onClick}
    >
      <Icon name="check" size={16} />
    </button>
  );
}

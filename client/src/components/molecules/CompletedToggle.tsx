import { Badge } from "../atoms/Badge";
import { Icon } from "../atoms/Icon";

type Props = {
  count: number;
  open: boolean;
  onToggle: () => void;
};

export function CompletedToggle({ count, open, onToggle }: Props) {
  return (
    <button
      type="button"
      className="completed-toggle"
      onClick={onToggle}
      aria-expanded={open}
    >
      <span className="completed-toggle-label">
        <span>Completed</span>
        <Badge className="badge--count">{count}</Badge>
      </span>
      <span className={open ? "chevron" : "chevron chevron--closed"}>
        <Icon name="expand_more" size={18} />
      </span>
    </button>
  );
}

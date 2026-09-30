import { Badge } from "../atoms/Badge";

type Props = {
  remaining: number;
};

function formatToday() {
  return new Date().toLocaleDateString(undefined, {
    weekday: "long",
    month: "short",
    day: "numeric",
  });
}

export function DayHeader({ remaining }: Props) {
  return (
    <div className="day-header">
      <div>
        <p className="date-label">{formatToday()}</p>
        <h2>Today&apos;s Tasks</h2>
      </div>
      <Badge pulse>
        {remaining} remaining
      </Badge>
    </div>
  );
}

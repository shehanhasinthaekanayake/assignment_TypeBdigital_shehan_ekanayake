import { Badge } from "../atoms/Badge";

type Props = {
  remaining: number;
};

export function DayHeader({ remaining }: Props) {
  return (
    <div className="day-header">
      <div>
        <h2>Today&apos;s Tasks</h2>
      </div>
      <Badge pulse>
        {remaining} remaining
      </Badge>
    </div>
  );
}

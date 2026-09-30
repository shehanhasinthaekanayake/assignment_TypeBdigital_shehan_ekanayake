import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
  pulse?: boolean;
  className?: string;
};

export function Badge({ children, pulse = false, className = "" }: Props) {
  return (
    <span className={`badge ${className}`.trim()}>
      {pulse ? <span className="badge-dot" /> : null}
      {children}
    </span>
  );
}

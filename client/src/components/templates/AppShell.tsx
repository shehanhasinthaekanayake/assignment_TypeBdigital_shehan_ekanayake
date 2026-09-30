import type { ReactNode } from "react";

type Props = {
  title: string;
  children: ReactNode;
};

export function AppShell({ title, children }: Props) {
  return (
    <div className="shell">
      <header>
        <h1>{title}</h1>
      </header>
      <main>{children}</main>
    </div>
  );
}

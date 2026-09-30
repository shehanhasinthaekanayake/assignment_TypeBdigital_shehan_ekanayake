import type { ReactNode } from "react";
import { TopBar } from "../organisms/TopBar";

type Props = {
  children: ReactNode;
};

export function AppShell({ children }: Props) {
  return (
    <div className="app-shell">
      <TopBar />
      <main className="app-main">
        <div className="app-content">{children}</div>
      </main>
    </div>
  );
}

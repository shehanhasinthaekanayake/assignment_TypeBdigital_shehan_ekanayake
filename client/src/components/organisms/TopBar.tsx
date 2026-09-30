import { Icon } from "../atoms/Icon";

export function TopBar() {
  return (
    <header className="top-bar">
      <div className="top-bar-inner">
        <div className="top-bar-brand">
          <div className="brand-mark" aria-hidden />
          <h1>Tasks</h1>
        </div>
        <div className="avatar" aria-hidden>
          <Icon name="person" size={18} />
        </div>
      </div>
    </header>
  );
}

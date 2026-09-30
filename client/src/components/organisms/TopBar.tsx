import { Icon } from "../atoms/Icon";

export function TopBar() {
  return (
    <header className="top-bar">
      <div className="top-bar-inner">
        <div className="top-bar-brand">
          <div className="brand-mark" aria-hidden>
            <Icon name="check_box" size={18} filled />
          </div>
          <h1>Tasks</h1>
        </div>
      </div>
    </header>
  );
}

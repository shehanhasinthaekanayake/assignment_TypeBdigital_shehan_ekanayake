import { Icon } from "../atoms/Icon";

export function EmptyDoneBanner() {
  return (
    <div className="empty-banner">
      <div className="empty-banner-icon">
        <Icon name="sentiment_satisfied" size={24} />
      </div>
      <h3>All tasks cleared</h3>
      <p>Enjoy your free time or add a new goal above.</p>
    </div>
  );
}

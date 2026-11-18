import type { Achievement } from "../../lib/achievements";

export default function AchievementCard({ achievement: a }: { achievement: Achievement }) {
  return (
    <article className={`em-panel ${a.unlocked ? "em-unlocked" : ""}`}>
      <span className="em-award-icon">{a.icon}</span>
      <h2>{a.name}</h2>
      <p>{a.description}</p>
      <strong>{a.unlocked ? "Conquistada" : `Em progresso · ${a.progress}`}</strong>
    </article>
  );
}

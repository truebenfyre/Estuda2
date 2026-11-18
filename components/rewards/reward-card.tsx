"use client";
import { Gift, Pencil, Trash2 } from "lucide-react";
import { useStudy } from "../../context/study-context";
import { newId } from "../../lib/format";
import type { Reward } from "../../lib/types";

export default function RewardCard({ reward: r }: { reward: Reward }) {
  const { stats, busy, mutate, setModal } = useStudy();
  return (
    <article className="em-mission">
      <div className="em-mission-head">
        <span className="em-mission-icon">
          <Gift />
        </span>
        <div className="em-mission-text">
          <h3>{r.name}</h3>
          <p>{r.price} ouro</p>
        </div>
        <button
          className="em-create"
          disabled={busy || stats.gold < r.price}
          onClick={() =>
            mutate(
              { type: "redeem", id: newId(), rewardId: r.id },
              `Resgate de “${r.name}” salvo no histórico.`,
            )
          }
        >
          {stats.gold < r.price ? `Faltam ${r.price - stats.gold}` : "Resgatar"}
        </button>
      </div>
      <div className="em-row-actions">
        <button className="em-link" onClick={() => setModal({ type: "reward", item: r })}>
          <Pencil />
          Editar
        </button>
        <button className="em-link" onClick={() => setModal({ type: "deleteReward", item: r })}>
          <Trash2 />
          Excluir
        </button>
      </div>
    </article>
  );
}

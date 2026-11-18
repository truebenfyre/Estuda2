"use client";
import { Plus } from "lucide-react";
import { useStudy } from "../../context/study-context";
import { formatDate } from "../../lib/format";
import RewardCard from "../rewards/reward-card";
import EmptyState from "../ui/empty-state";

export default function RecompensasScreen() {
  const { state, setModal } = useStudy();
  return (
    <>
      <button className="em-create em-spaced" onClick={() => setModal({ type: "reward" })}>
        <Plus />
        Criar recompensa
      </button>
      <p className="em-help">
        Você define o nome e o preço. O resgate é um registro pessoal; não compra nem
        entrega produtos.
      </p>
      {state.rewards.length ? (
        <div className="em-missions">
          {state.rewards.map((r) => (
            <RewardCard key={r.id} reward={r} />
          ))}
        </div>
      ) : (
        <EmptyState
          title="Uma recompensa com a sua cara"
          description="Pode ser um sorvete ou uma hora de videogame. Escolha algo que faça sentido para você."
        />
      )}
      <section className="em-panel em-spaced">
        <h2>Histórico de resgates</h2>
        {state.redemptions.length ? (
          <ul className="em-history">
            {[...state.redemptions].reverse().map((r) => (
              <li key={r.id}>
                <strong>{r.name}</strong>
                <span>
                  −{r.price} ouro · {formatDate(r.redeemedAt)}
                </span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="em-help">
            Seus resgates aparecerão aqui. Ouro gasto não muda seu XP ou nível.
          </p>
        )}
      </section>
    </>
  );
}

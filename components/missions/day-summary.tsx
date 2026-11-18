interface DaySummaryProps {
  todayCount: number;
  completedToday: number;
  xp: number;
}

export default function DaySummary({ todayCount, completedToday, xp }: DaySummaryProps) {
  return (
    <section className="em-summary" aria-label="Resumo do dia">
      <div>
        <strong>{todayCount}</strong>
        <span>na lista do dia</span>
      </div>
      <div>
        <strong>{completedToday}</strong>
        <span>concluídas hoje</span>
      </div>
      <div>
        <strong>{xp}</strong>
        <span>XP conquistados</span>
      </div>
    </section>
  );
}

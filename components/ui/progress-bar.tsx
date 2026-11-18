interface ProgressBarProps {
  value: number;
  max: number;
  label: string;
  xp?: boolean;
}

export default function ProgressBar({ value, max, label, xp = false }: ProgressBarProps) {
  return (
    <div
      className={xp ? "em-xpbar" : "em-progress"}
      role="progressbar"
      aria-label={label}
      aria-valuemin={0}
      aria-valuemax={max}
      aria-valuenow={value}
    >
      <span style={{ width: `${Math.min(100, (value / max) * 100)}%` }} />
    </div>
  );
}

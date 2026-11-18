import { Sparkles } from "lucide-react";

interface EmptyStateProps {
  title: string;
  description: string;
  buttonLabel?: string;
  onAction?: () => void;
}

export default function EmptyState({ title, description, buttonLabel, onAction }: EmptyStateProps) {
  return (
    <div className="em-empty">
      <Sparkles />
      <h2>{title}</h2>
      <p>{description}</p>
      {buttonLabel && (
        <button className="em-create" onClick={onAction}>
          {buttonLabel}
        </button>
      )}
    </div>
  );
}

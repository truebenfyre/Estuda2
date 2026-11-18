"use client";
import { useStudy } from "../../context/study-context";
import { NAV } from "../../lib/navigation";
import { PATHS } from "../../lib/routes";

export default function Navigation({ mobile = false }: { mobile?: boolean }) {
  const { LinkComponent, view, setModal } = useStudy();
  return (
    <nav
      className={mobile ? "em-bottom" : "em-nav"}
      aria-label={mobile ? "Navegação no celular" : "Navegação principal"}
    >
      {NAV.map(({ key, label, Icon }) => (
        <LinkComponent
          href={PATHS[key]}
          onClick={() => setModal(null)}
          key={key}
          className={view === key ? "em-active" : ""}
          aria-current={view === key ? "page" : undefined}
        >
          <Icon aria-hidden="true" />
          <span>{label}</span>
        </LinkComponent>
      ))}
    </nav>
  );
}

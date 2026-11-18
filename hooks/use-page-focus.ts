import { useEffect, useRef } from "react";

export function usePageFocus(pathname: string, onChange: () => void) {
  const contentRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  useEffect(() => {
    contentRef.current?.scrollTo?.({ top: 0 });
    headingRef.current?.focus({ preventScroll: true });
    onChange();
  }, [pathname]);
  return { contentRef, headingRef };
}

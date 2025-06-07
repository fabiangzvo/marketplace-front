import { Ref, useEffect, useState } from "react";

export function useIntersection<T extends HTMLElement>(
  callback: () => void,
): [Ref<T>] {
  const [element, setElement] = useState<HTMLElement>();

  useEffect(() => {
    if (!element) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) callback();
      },
      {
        rootMargin: "100px",
        threshold: 1,
      },
    );

    observer.observe(element);

    return () => observer.unobserve(element);
  }, [element, callback]);

  return [(el) => setElement(el!)];
}

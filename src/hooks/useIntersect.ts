import { useEffect, useRef } from 'react';

export const useIntersect = (fetchNextPage: () => void, hasNextPage: boolean = true) => {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!hasNextPage || !ref.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (hasNextPage) {
            fetchNextPage();
          }
        }
      },
      {
        threshold: 1.0,
      }
    );

    observer.observe(ref.current);

    return () => observer.disconnect();
  }, [fetchNextPage, hasNextPage]);

  return ref;
};

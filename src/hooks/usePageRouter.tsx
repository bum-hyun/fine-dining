'use client';

import { useRouter } from 'next/navigation';

type PushParams = {
  pathname: string;
  query?: Record<string, string | number>;
};

export const usePageRouter = () => {
  const router = useRouter();

  const resolvePath = (path: string, query?: Record<string, string | number>) => {
    if (!query) return path;

    let resolved = path;
    for (const key in query) {
      resolved = resolved.replace(`[${key}]`, String(query[key]));
    }
    return resolved;
  };

  const push = (params: string | PushParams) => {
    if (typeof params === 'string') {
      router.push(params);
    } else {
      const fullPath = resolvePath(params.pathname, params.query);
      router.push(fullPath);
    }
  };

  return {
    ...router,
    push,
  };
};

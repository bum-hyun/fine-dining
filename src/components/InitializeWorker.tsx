'use client';

import { useEffect, useState } from 'react';

const InitializeWorker = ({ children }: { children: React.ReactNode }) => {
  const [isWorking, setIsWorking] = useState(false);

  useEffect(() => {
    async function setupWokrer() {
      if (process.env.NODE_ENV !== 'development') {
        return;
      }

      if (typeof window === 'undefined') {
        const { server } = await import('@/mocks/server');
        server.listen();
      } else {
        const { worker } = await import('@/mocks/browser');
        await worker.start({
          onUnhandledRequest: 'bypass',
        });
      }
      setIsWorking(true);
      console.log('worker started');
    }
    setupWokrer();
  }, []);

  return <>{isWorking ? children : <body></body>}</>;
};

export default InitializeWorker;

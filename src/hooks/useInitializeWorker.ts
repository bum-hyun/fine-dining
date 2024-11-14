'use client';

import { useEffect, useState } from 'react';

const useInitializeWorker = () => {
  const [isWorking, setIsWorking] = useState(false);

  useEffect(() => {
    async function setupWokrer() {
      if (typeof window === 'undefined' || process.env.NODE_ENV !== 'development') {
        return;
      }
      const { worker } = await import('@/mocks/browser');
      await worker.start();
      setIsWorking(true);
      console.log('worker started');
    }
    setupWokrer();
  }, []);

  return isWorking;
};

export default useInitializeWorker;

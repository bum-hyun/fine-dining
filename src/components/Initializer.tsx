'use client';
import { useEffect, useRef } from 'react';

const Initializer = () => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    async function setupWokrer() {
      if (typeof window === 'undefined') {
        console.log('window is undefined');
        return;
      }
      const { worker } = await import('./mocks/browser');
      await worker.start();
      console.log('worker started');
    }
    setupWokrer();
  }, []);

  return <div ref={ref} />;
};

export default Initializer;

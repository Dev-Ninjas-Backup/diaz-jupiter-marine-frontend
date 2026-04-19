'use client';
import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import io, { type Socket } from 'socket.io-client';

const API_URL = 'https://api.jupitermarinesales.com';

export function useVisitorTracking() {
  const pathname = usePathname();
  const socketRef = useRef<Socket | null>(null);

  useEffect(() => {
    // Connect once
    if (!socketRef.current) {
      socketRef.current = io(API_URL, {
        path: '/ws',
        transports: ['polling'],
      });
    }

    const socket = socketRef.current;

    // Emit visit:start with current page
    const emitStart = () => {
      console.log('🟢 visit:start emitted:', pathname);
      socket.emit('visit:start', { page: pathname });
    };

    if (socket.connected) {
      emitStart();
    } else {
      socket.once('connect', emitStart);
    }

    return () => {
      socket.off('connect', emitStart);
    };
  }, [pathname]);

  // Disconnect on unmount
  useEffect(() => {
    return () => {
      if (socketRef.current) {
        socketRef.current.emit('visit:end');
        socketRef.current.disconnect();
        socketRef.current = null;
      }
    };
  }, []);
}

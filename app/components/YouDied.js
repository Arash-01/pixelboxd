"use client";
import React, { useEffect, useState } from 'react';

const YouDied = () => {
  const [isOnline, setIsOnline] = useState(true);

  useEffect(() => {
    setIsOnline(navigator.onLine);
    const goOnline = () => setIsOnline(true);
    const goOffline = () => setIsOnline(false);

    window.addEventListener('online', goOnline);
    window.addEventListener('offline', goOffline);

    return () => {
      window.removeEventListener('online', goOnline);
      window.removeEventListener('offline', goOffline);
    };
  }, []);

  if (isOnline) return null;

  return (
    <div className="died-overlay">
      <div className="died-container">
        <h1 className="died-text">YOU DIED</h1>
        <p className="died-subtext">CHECK YOUR CONNECTION TO RESPAWN</p>
      </div>
    </div>
  );
};

export default YouDied;
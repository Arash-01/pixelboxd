"use client";
import React, { useEffect, useState } from 'react';

const YouDied = () => {
  // We start as null so there is no "flicker" on load
  const [isOnline, setIsOnline] = useState(true);

  useEffect(() => {
    // 1. Immediate check on mount
    if (typeof window !== "undefined") {
      setIsOnline(navigator.onLine);
    }

    const goOnline = () => setIsOnline(true);
    const goOffline = () => setIsOnline(false);

    // 2. Listen for changes
    window.addEventListener('online', goOnline);
    window.addEventListener('offline', goOffline);

    return () => {
      window.removeEventListener('online', goOnline);
      window.removeEventListener('offline', goOffline);
    };
  }, []);

  // If online, render nothing
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
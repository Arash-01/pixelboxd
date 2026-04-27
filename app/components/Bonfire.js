"use client";
import React, { useEffect, useState } from 'react';
// Matching your capital 'B' in the filename
import bonfireImg from './assets/Bonfire.png'; 

const Bonfire = () => {
  const [stage, setStage] = useState('black');

  useEffect(() => {
    // Sequence timing
    const startImage = setTimeout(() => setStage('image'), 500);
    const startLit = setTimeout(() => setStage('lit'), 2000);
    const finish = setTimeout(() => setStage('done'), 4000);

    return () => {
      clearTimeout(startImage);
      clearTimeout(startLit);
      clearTimeout(finish);
    };
  }, []);

  if (stage === 'done') return null;

  return (
    <div className={`bonfire-overlay ${stage}`}>
      <div className="bonfire-container">
        {(stage === 'image' || stage === 'lit') && (
          <div className="bonfire-graphic-container">
            <img 
              src={bonfireImg.src} 
              alt="Bonfire Lit" 
              className="bonfire-graphic"
            />
          </div>
        )}

        {stage === 'lit' && (
          <h1 className="bonfire-text">BONFIRE LIT</h1>
        )}
      </div>
    </div>
  );
};

export default Bonfire;
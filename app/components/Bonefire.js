"use client";
import React, { useEffect, useState } from 'react';
// IF YOU HAVE AN IMAGE, UNCOMMENT THIS LINE:
// import Image from 'next/image';
// import bonfireImg from './assets/bonfire.png'; // Adjust path as needed

const YouDied = () => {
  const [stage, setStage] = useState('black'); // stages: black, image, lit, done

  useEffect(() => {
    // 1. Black screen for 0.5s
    const startImage = setTimeout(() => {
      setStage('image');
    }, 500);

    // 2. The Bonfire image appears for 1.5s
    const startLit = setTimeout(() => {
      setStage('lit');
    }, 2000);

    // 3. Fades away after 4 seconds total
    const finish = setTimeout(() => {
      setStage('done');
    }, 4000);

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
        
        {/* Step 2: The Fire Image/Icon */}
        {(stage === 'image' || stage === 'lit') && (
            <div className="bonfire-graphic-container">
                {/* IF YOU HAVE AN IMAGE, USE THIS: */}
                {/* <Image src={bonfireImg} alt="Bonfire Lit" className="bonfire-graphic" priority /> */}
                
                {/* TEMPORARY EMOJI IF YOU DON'T HAVE AN IMAGE: */}
                <div className="bonfire-graphic-placeholder">🔥</div>
            </div>
        )}

        {/* Step 3: The Text */}
        {stage === 'lit' && (
          <h1 className="bonfire-text">BONFIRE LIT</h1>
        )}
      </div>
    </div>
  );
};

export default YouDied;
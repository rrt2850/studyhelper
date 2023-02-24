import React, { useState, useEffect, useRef } from 'react';

const Title = () => {
  const [isFullScreen, setIsFullScreen] = useState(false);
  const header = useRef(null);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'f') {
        toggleFullScreen();
      }
    };

    const handleFullScreenChange = () => {
      setIsFullScreen(document.fullscreenElement !== null);
    };

    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('fullscreenchange', handleFullScreenChange);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('fullscreenchange', handleFullScreenChange);
    };
  }, []);

  const toggleFullScreen = () => {
    if (document.fullscreenElement) {
      document.exitFullscreen();
    } else {
      document.documentElement.requestFullscreen();
    }
  };

  return (
    <div ref={header} className="Title">
      <h1>Study Helper</h1>
      <h2>Enter text and select which videos you want playing to start</h2>
      
      {!isFullScreen && (
        <div className='fullscreen-msg' id="fullscreen-msg">(Press F for the full experience)</div>
      )}
    </div>
  );
};

export default Title;

/**
 * Title.js
 * @author Robert Tetreault
 * @summary This component displays the title and instructions for the website
 *          along with a message that only appears when the user isn't in fullscreen.
 *
 * @requires React
 * @requires useState
 * @requires useEffect
 * @requires useRef
 *
 * @returns {JSX.Element} Title component
 */

import React, { useState, useEffect, useRef } from 'react';

const Title = () => {
  // Initialize state for fullscreen and headerRef
  const [isFullScreen, setIsFullScreen] = useState(false);
  const headerRef = useRef(null);

  // Register event listeners on mount
  useEffect(() => {
    const handleKeyDown = event => {
      // Toggle fullscreen when F is pressed and focus isn't in a textarea
      if (event.key === 'f' && event.target.tagName.toLowerCase() !== 'textarea') {
        toggleFullScreen();
      }
    };

    const handleFullScreenChange = () => {
      // Set isFullScreen state based on whether fullscreenElement is truthy
      setIsFullScreen(Boolean(document.fullscreenElement));
    };

    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('fullscreenchange', handleFullScreenChange);

    // Remove event listeners on unmount
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('fullscreenchange', handleFullScreenChange);
    };
  }, []);

  // Function to toggle fullscreen
  const toggleFullScreen = () => {
    if (document.fullscreenElement) {
      // If already in fullscreen, exit
      document.exitFullscreen();
    } else {
      // Otherwise, request fullscreen on the document element
      document.documentElement.requestFullscreen();
    }
  };

  return (
    // Render the title and instructions, along with a fullscreen message if needed
    <div ref={headerRef} className="Title">
      <h1>Study Helper</h1>
      <h2>Enter text and select which videos you want playing to start</h2>
      {!isFullScreen && <div className="fullscreen-msg" id="fullscreen-msg">(Press F for the full experience)</div>}
    </div>
  );
};

export default Title;

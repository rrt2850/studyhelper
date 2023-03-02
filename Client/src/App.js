import React, {useState} from "react";
import Title from "./Components/Title";
import Inputs from "./Components/Inputs";
import Reader from "./Components/Reader";
import BackgroundPlayer from "./Components/BackgroundPlayer";
import "./App.scss"

function App() {
  // state variables to keep track of the video index and text to read
  const [pathIndex, setPathIndex] = useState(0); 
  const [toRead, setToRead] = useState(0);

  // function to update the current index of the selected video path
  const changePath = (index) => {
    setPathIndex(index);
  };

  // function to update the text to be read by the Reader component
  const sendMessage = (message) => {
    setToRead(message);
  }

  return (
    <>
      <div className="App">
        <Title />
        <Inputs changePath={changePath} toRead={sendMessage} />
        <Reader toRead={toRead} />
        <BackgroundPlayer pathIndex={pathIndex} />
      </div>
    </>
  );
}

export default App;






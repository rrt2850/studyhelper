import React, {useState} from "react";
import Title from "./Components/Title";
import Inputs from "./Components/Inputs";
import Reader from "./Components/Reader";
import BackgroundPlayer from "./Components/BackgroundPlayer";
import "./App.scss"

function App() {
  const [pathIndex, setPathIndex] = useState(0);
  const [toRead, setToRead] = useState(0);

  const changePath = (index) => {
    setPathIndex(index);
  };
  const sendMessage = (message) => {
    setToRead(message);
  }

  return (
    <>
      <div className="App">
        <Title />
        <Inputs changePath={changePath} toRead={sendMessage}/>
        <Reader toRead={toRead}/>
        <BackgroundPlayer pathIndex={pathIndex} />

      </div>
    </>
  );
}


export default App;

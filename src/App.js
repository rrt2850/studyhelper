import React, {useState} from "react";
import Title from "./Components/Title";
import Inputs from "./Components/Inputs";
import BackgroundPlayer from "./Components/BackgroundPlayer";
import "./App.scss"

function App() {
  const [pathIndex, setPathIndex] = useState(0);

  const changePath = (index) => {
    setPathIndex(index);
  };

  return (
    <>
      <div className="App">
        <Title />
        <Inputs changePath={changePath} />
        <BackgroundPlayer pathIndex={pathIndex} />
      </div>
    </>
  );
}


export default App;

import Title from "./Components/Title";
import Inputs from "./Components/Inputs";
import BackgroundPlayer from "./Components/BackgroundPlayer";
import "./App.scss"

function App() {
  return (
    <>
      <div className="App">
        <Title />
        <Inputs />
        <BackgroundPlayer />
      </div>
    </>
    
  );
}

export default App;

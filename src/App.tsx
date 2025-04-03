import "./App.css";
import InputField from "./components/InputField/InputField";
import ImageField from "./components/ImageField/ImageField";


function App() {
  return (
    <div className="App">
      <header>
        <title>RPGen - DnD Character Sheet Generator</title>
        <link rel="icon" href="./favicon.webp" />
      </header>
      <body className="App">
        <div className="App-header">
          <h1>RPGen</h1>
          <h4>DnD Character Sheet Generator</h4>
        </div>
        <div className="char-sheet">
          <h4>Character Sheet</h4>
          <ImageField/>
          <InputField input_text={"Name"} />
          <InputField input_text={"Class"} />
        </div>
      </body>
    </div>
  );
}

export default App;

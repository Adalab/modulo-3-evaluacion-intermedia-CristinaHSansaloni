// Fichero src/components/App.js
import '../styles/App.css';
import friends from "../data/friends.json";
import { useState } from "react";

function App() {

  //Variables de estado
  const [data, setData] = useState(friends);
  return (
    <header>
      <h1>Frases de Friends</h1>
    </header>
  );
}

export default App;
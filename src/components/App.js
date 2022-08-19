// Fichero src/components/App.js
import '../styles/App.css';
import friends from "../data/friends.json";
import { useState } from "react";

function App() {

  //Variables de estado
  const [data, setData] = useState(friends);






//render
  const htmlData = data
  .map((friend, index) =>{
    return (
      <li key={index}>
        <p>{friend.quote}</p>
        <p>{friend.character}</p>
      </li>
    )
  });

  return (
<div>
<header>
      <h1>Frases de Friends</h1>
    </header>

    <main>
      <ul>
        {htmlData}
      </ul>
    </main>
</div>
 )


}

export default App;
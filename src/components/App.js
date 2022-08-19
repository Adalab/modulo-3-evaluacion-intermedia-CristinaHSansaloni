// Fichero src/components/App.js
import '../styles/App.css';
import friends from "../data/friends.json";
import { useState } from "react";


function App() {

  //Variables de estado
  const [data, setData] = useState(friends);
  const [search,setSearch] = useState("");
  const [newQuote, setNewQuote] = useState({
    quote: "",
    character: ""
  });


  const handleSearch = (ev) => {
    setSearch(ev.target.value);
  }

  const handleNewQuote = (ev) => {
    setNewQuote({
      ...newQuote,
      [ev.target.id]: ev.target.value
    });
  }

  const handleClick = (ev) => {
    ev.preventDefault();
    setData([...data, newQuote]);
    setNewQuote({
      quote: "",
      character: ""
    });
  }



//render
  const htmlData = data
  .filter((friend) => {
    return friend.quote.toLocaleLowerCase().includes(search.toLocaleLowerCase());
  })
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
            <form>
              <label>Filtrar por frase</label>
              <input 
              autoComplete='off'
              type="search"
              name="search"
              value={search}
              onChange ={handleSearch}></input>
              <label>Filtrar por personaje</label>
              <select name="Todos"
              value={search}
              onChange ={search}>

                <option>Ross</option>

                <option>Mónica</option>

                <option>Rachel</option>
                

                </select>
            </form>
          </header>

          <main>
            <ul>
              {htmlData}
            </ul>

            <form>
              <h2>Añadir una nueva frase</h2>
              <label>Frase</label>
              <input
              type="text"
              name="quote"
              id="quote"
              value={newQuote.quote}
              onChange ={handleNewQuote}
              ></input>
              <label>Personaje</label>
              <input
              type="text"
              name="character"
              id="character"
              value={newQuote.character}
              onChange ={handleNewQuote}
              ></input>
              <input
              type="submit"
              value="Añadir una nueva frase"
              onClick={handleClick}></input>
            </form>
          </main>
      </div>
 )


}

export default App;
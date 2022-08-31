// Fichero src/components/App.js
import { useEffect, useState } from "react";
import '../styles/App.scss';
import friends from "../data/friends.json";
import getDataApi from "./services/fetch";
import logo from "../images/friends.svg";



function App() {

  //Variables de estado
  const [data, setData] = useState([]);
  const [search,setSearch] = useState("");
  const [filterCharacter, setFilterCharacter] = useState('all');
  const [newQuote, setNewQuote] = useState({
    quote: "",
    character: ""
  });

  useEffect(() => {
    getDataApi().then((data) => {
      setData(data);
    });
  }, []);


  const handleSearch = (ev) => {
    setSearch(ev.target.value);
  }

  const handleNewQuote = (ev) => {
    setNewQuote({
      ...newQuote,
      [ev.target.id]: ev.target.value
    });
  };

  const handleFilterCharacter = (ev) => {
    setFilterCharacter(ev.target.value);
  }

  const handleClick = (ev) => {
    ev.preventDefault();
    setData([...data, newQuote]);
    setNewQuote({
      quote: "",
      character: ""
    });
  };



//render
  const htmlData = data
  .filter((friend) => {
    return friend.quote.toLocaleLowerCase().includes(search.toLocaleLowerCase());
  })
  .filter((friend) => {
    if (filterCharacter === 'all') {
      return true;
    }
    return friend.character === filterCharacter;
  })
  .map((friend, index) =>{
    return (
      <li className="quotes__item" key={index}>
        {`${friend.quote} - ${friend.character}`}
      </li>
    );
  });

    return (
        <div className="page">
            <header className="header">
              <h1 className="header__title">Frases de <img className="header__img" src={logo}></img></h1>
            </header>
            <form className="filter">
                <label className="filter__label" htmlFor="character">
                  Filtrar por frase
                  <input className="filter__input" 
                  autoComplete='off'
                  type="search"
                  name="search"
                  value={search}
                  onChange ={handleSearch}></input>
                </label>
                <label className="filter__label" htmlFor="character">
                  Filtrar por personaje
                  <select className="filter__select" onChange={handleFilterCharacter} value={filterCharacter}>
                    <option value="all">Todos</option>
                    <option value="Ross">Ross</option>
                    <option value="Monica">Monica</option>
                    <option value="Joey">Joey</option>
                    <option value="Phoebe">Phoebe</option>
                    <option value="Chandler">Chandler</option>
                    <option value="Rachel">Rachel</option>
                  </select>
                </label>
              </form>

            <main>
              <ul className="quotes__list">
                {htmlData}
              </ul>

              <form className="new-quote">
                <h2 className="new-quote__title">Añadir una nueva frase</h2>
                <label className="new-quote__label" htmlFor="quote">
                  <span className="new-quote__label-text">Frase</span>
                  <input
                    className="new-quote__text"
                    type="text"
                    name="quote"
                    id="quote"
                    value={newQuote.quote}
                    onChange ={handleNewQuote}
                  ></input>
                </label>
                <label className="new-quote__label" htmlFor="character">
                  <span className="new-quote__label-text">Personaje</span>
                  <input
                    className="new-quote__text"
                    type="text"
                    name="character"
                    id="character"
                    value={newQuote.character}
                    onChange ={handleNewQuote}
                  ></input>
                </label>
                <input
                  className="new-quote__btn"
                type="submit"
                value="Añadir una nueva frase"
                onClick={handleClick}></input>
              </form>
            </main>
        </div>
  );
};

export default App;
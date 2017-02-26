import React, { Component } from 'react';
import './App.css';

import Imageview from './components/Imageview';
import Statsview from './components/Statsview';
import Search from './components/Search';

class App extends Component {
  constructor() {
    super();
    this.state = {
      title: 'Pokedex',
      addedPokemon: {},
    }
  }

  appState() {//kollar state
    console.log(this.state)
  }

  addPokemon(pokemonUrl, pokemonName) {//data från Search.js
    const pokeReq = new XMLHttpRequest();
    pokeReq.open('GET', pokemonUrl);//adress till vald pokemon
    pokeReq.onload = () => {
      const pokeData = JSON.parse(pokeReq.responseText);
      this.setState({
        addedPokemon: {
          name: pokemonName,//namn från Search.js
          url: pokeData.sprites.front_default//hämtar bild på pokemon
        }
      })
    }
    pokeReq.send();
  }

  render() {
    return (
      <div className="App">
        <button onClick={this.appState.bind(this)}>AppState</button>
        <h2>{this.state.title}</h2>
        <br/>
        <div className="display">
          <div className="viewBackground">
            <Imageview pokemonUrl={this.state.addedPokemon.url} pokemonName={this.state.addedPokemon.name}/>
            <Statsview />
          </div>
        </div>
        <br/>
        <br/>
        <Search addPokemon={this.addPokemon.bind(this)}/>
        <br/>
      </div>
    );
  }
}

export default App;

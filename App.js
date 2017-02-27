import React, { Component } from 'react';
import './App.css';

import Imageview from './components/Imageview';
import Statsview from './components/Statsview';
import Search from './components/Search';

class App extends Component {
  constructor() {
    super();
    this.state = {
      imgName: '',
      imgUrl: '',
      statsName: '',
      statsHeight: '',
      statsWeight: '',
      statsBaseExp: '',
      statsTypes: [],
      statsStats: [],
      statsMoves: [],
      statsEvoFrom: '',
      statsHabitat: '',
      statsDescription: '',
    }
  }

  appState() {//kollar state
    console.log(this.state)
  }

  addPokemon(pokemonUrl, pokemonName) {//data från Search.js
    const pokeReq = new XMLHttpRequest();
    pokeReq.open('GET', pokemonUrl);//adress till vald pokemon
    pokeReq.addEventListener('loadstart', () => {//laddnings text
      this.setState({//Loading loading
        imgName: 'Loading...',
        imgUrl: '',
        statsName: 'Loading...',
        statsHeight: 'Loading...',
        statsWeight: 'Loading...',
        statsBaseExp: 'Loading...',
        statsTypes: ['Loading...'],
        statsStats: ['Loading...'],
        statsMoves: ['Loading...'],
        statsEvoFrom: 'Loading...',
        statsHabitat: 'Loading...',
        statsDescription: 'Loading...',
      })
    });//loadstart
    pokeReq.addEventListener('load', () => {
      const pokeData = JSON.parse(pokeReq.responseText);//Pokemon default data
      //console.log(pokeData)

      this.setState({
        /////Imageview.js/////
        imgName: pokemonName,//namn från Search.js
        imgUrl: pokeData.sprites.front_default,//hämtar bild på pokemon
        /////Statsview.js/////
        statsName: pokeData.name,
        statsHeight: pokeData.height,
        statsWeight: pokeData.weight,
        statsBaseExp: pokeData.base_experience,//xp points
        statsTypes: pokeData.types.map((i) => {
          return {name: i.type.name}//typ av pokemon fire, water etc
        }),
        statsStats: pokeData.stats.map((i) => {
          return {
            name: i.stat.name,//stat namn: speed, attack etc
            baseStat: i.base_stat//stat nummer
          }
        }),
        statsMoves: [//manuellt fungerade bättre här än map() o for()
          {name: pokeData.moves[0].move.name},
          {name: pokeData.moves[1].move.name},
          {name: pokeData.moves[2].move.name},
          {name: pokeData.moves[3].move.name}
        ]
      });

      //Ny request för mer Pokemon data
      const pokeReqSpecies = new XMLHttpRequest();
      pokeReqSpecies.open('GET', pokeData.species.url);//adress för mer data
      pokeReqSpecies.addEventListener('load', () => {
        const pokeDataSpec = JSON.parse(pokeReqSpecies.responseText);
        //console.log(pokeDataSpec)
        if(pokeDataSpec.evolves_from_species == null) {//om pokemon:en inte evolvar från någon annan pokemon, visa none
          this.setState({
            statsEvoFrom: 'None'
          })
        } else {
          this.setState({
            statsEvoFrom: pokeDataSpec.evolves_from_species.name//evolvade från denna pokemon
          })
        }
        this.setState({
          statsHabitat: pokeDataSpec.habitat.name,//habitat = tex grasslands
          statsDescription: pokeDataSpec.flavor_text_entries[1].flavor_text//pokemon beskriving
        })
      })//addEventListener('load')
      pokeReqSpecies.send()

    });//load
    pokeReq.send();

  }//addPokemon funktion

  render() {
    return (
      <div className="App">
        <button onClick={this.appState.bind(this)}>AppState</button>
        <h2>Pokedex</h2>
        <br/>
        <div className="display">
          <div className="viewBackground">
            <Imageview pokemonImage={this.state}/>
            <Statsview pokemonStats={this.state}/>
          </div>
        </div>
        <br/>
        <Search addPokemon={this.addPokemon.bind(this)}/>
      </div>
    );
  }
}

export default App;

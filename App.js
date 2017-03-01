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

  addPokemon(pokemonUrl, pokemonName) {//data från Search.js
    const boxCover = document.querySelectorAll('.boxCover');//loading divs

    const pokeReq = new XMLHttpRequest();
    pokeReq.open('GET', pokemonUrl);//adress till vald pokemon
    pokeReq.addEventListener('loadstart', () => {//loading func
      for(let i = 0; i < boxCover.length; i++) {
        boxCover[i].style.display = 'flex';//visar loading divs
      }
    });//loadstart
    pokeReq.addEventListener('load', () => {
      const pokeData = JSON.parse(pokeReq.responseText);//Pokemon default data

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

        for(let i = 0; i < boxCover.length; i++) {
          boxCover[i].style.display = 'none';//gömmer loading divs
        }

        const pokeDataSpec = JSON.parse(pokeReqSpecies.responseText);//pokemon data

        //om pokemon inte utvecklas från någon annan pokemon
        pokeDataSpec.evolves_from_species === null ? this.setState({statsEvoFrom:'None'}) : this.setState({statsEvoFrom:pokeDataSpec.evolves_from_species.name});
        //habitat saknas för vissa pokemon
        pokeDataSpec.habitat === null ? this.setState({statsHabitat:'Unknown'}) : this.setState({statsHabitat:pokeDataSpec.habitat.name});

        this.setState({
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
        <div className="appTitle">
          <h1>Pokedex</h1>
        </div>
        <Imageview pokemonImage={this.state}/>
        <Statsview pokemonStats={this.state}/>
        <Search addPokemon={this.addPokemon.bind(this)}/>
        <p className="apiSite">Pokemon API: <a href="https://pokeapi.co/">https://pokeapi.co/</a></p>
      </div>
    );
  }
}

export default App;

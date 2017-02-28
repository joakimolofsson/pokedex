import React, { Component } from 'react';
import './css/Search.css';

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      elem: '',
      loadingPlaceHolder: '',
      pokemons: []//pokemon names and urls
    }
  }

  componentWillMount() {
      const pokeReq = new XMLHttpRequest();
      pokeReq.open('GET', 'http://pokeapi.co/api/v2/pokemon/?limit=811');//adress
      pokeReq.addEventListener('loadstart', () => {//laddnings text
        this.setState({
          loadingPlaceHolder: 'Loading Please Wait'
        })
      });
      pokeReq.addEventListener('load', () => {
        const pokeData = JSON.parse(pokeReq.responseText);//från string till json
        //console.log(pokeData)//kolla data
        this.setState({
          loadingPlaceHolder: 'Pokemon Search'
        })
        for(let i = 0; i < 811; i++) {
          this.setState({
            pokemons: this.state.pokemons.concat(//pushar namn och nummer till pokemons[]
              {
                name: pokeData.results[i].name,//namn på pokemon
                url: pokeData.results[i].url//api adress till pokemon för att få ut mer data
              }
            )
          });
        }
      });//load
      pokeReq.send();
  }//componentWillMount

  filterPokemon(e) {//filter pokemon funktion
    const pokemonList = document.querySelectorAll('.pokemonList');
    for(let i = 0; i < this.state.pokemons.length; i++) {
      if(this.state.pokemons[i].name.toLowerCase().indexOf(e.target.value) > -1) {
        pokemonList[i].style.display = '';
      } else {
        pokemonList[i].style.display = 'none';
      }
    }
  }

  sendPokeData(pokemon) {//skickar pokemon datan från den li man klickar på
    this.props.addPokemon(pokemon.url, pokemon.name)//till App.js
  }

  firstLetter(word) {//första bokstaven blir stor. Samma func finns i båda view.js
    if(word === undefined) {
      return
    } else {
      return word.charAt(0).toUpperCase() + word.slice(1)
    }
  }

  render() {
    return (
      <div className="Search">
        <input type="text" placeholder={this.state.loadingPlaceHolder} onChange={this.filterPokemon.bind(this)}/>
        <ul>
          {this.state.pokemons.map((pokemon, index) => {
            return <li className="pokemonList" onClick={this.sendPokeData.bind(this, pokemon)} key={index}>{this.firstLetter(pokemon.name)}</li>
          })}
        </ul>

      </div>
    );
  }
}

export default Search;

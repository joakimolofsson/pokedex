import React, { Component } from 'react';
import './css/Search.css';

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 'Pokemon',
      pokemons: []//pokemon names and urls
    }
  }

  componentWillMount() {
      const pokeReq = new XMLHttpRequest();
      pokeReq.open('GET', 'http://pokeapi.co/api/v2/pokemon/');//adress
      pokeReq.onload = () => {
        const pokeData = JSON.parse(pokeReq.responseText);//från string till json
        console.log(pokeData)//kolla data

        for(let i = 0; i < 5; i++) {
          let j = i + 1;//plusar på med 1 för att få rätt id till pokemon
          this.setState({
            pokemons: this.state.pokemons.concat(//pushar namn och nummer till names[]
              {
                name:pokeData.results[i].name,//namn på pokemon
                url: `http://pokeapi.co/api/v2/pokemon/${j}/`//detta nummer ska användas till rätt pokemon api adress
              }
            )
          });
        }

      }
      pokeReq.send();
  }

  onInput(e) {//two-way data bind shit, only for effect
    this.setState({
      value: e.target.value
    })
  }

  sendPokeData(pokemon) {//skickar pokemon datan från den li man klickar på
    this.props.addPokemon(pokemon.url, pokemon.name)//till App.js
  }

  searchState() {//kollar search state
    console.log(this.state)
  }

  render() {
    return (
      <div className="Search">
        <h3>Pokemon Search</h3>
        <p>{this.state.value}</p>
        <input type="text" placeholder="Search for a Pokemon" onChange={this.onInput.bind(this)}/>
        <br/>
        <button onClick={this.searchState.bind(this)}>SearchState</button>
        <br/>
        <ul>
          {this.state.pokemons.map((pokemon, index) => {
            return <li onClick={this.sendPokeData.bind(this, pokemon)} key={index}>{pokemon.name + pokemon.url}</li>
          })}
        </ul>
      </div>
    );
  }
}

export default Search;

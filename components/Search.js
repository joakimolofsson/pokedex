import React, { Component } from 'react';
import './css/Search.css';

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loadingPlaceHolder: '',
      value: 'Pokemon',
      pokemons: []//pokemon names and urls
    }
  }

  componentWillMount() {
      const pokeReq = new XMLHttpRequest();
      pokeReq.open('GET', 'http://pokeapi.co/api/v2/pokemon/?limit=100');//adress
      pokeReq.addEventListener('loadstart', () => {//laddnings text
        this.setState({
          loadingPlaceHolder: 'Loading Search Please Wait'
        })
      });
      pokeReq.addEventListener('load', () => {
        const pokeData = JSON.parse(pokeReq.responseText);//från string till json
        //console.log(pokeData)//kolla data

        this.setState({
          loadingPlaceHolder: 'Pokemon Search'
        })

        for(let i = 0; i < 100; i++) {
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
        <input className='searchInput' type="text" placeholder={this.state.loadingPlaceHolder} onChange={this.onInput.bind(this)}/>
        <br/>
        <button onClick={this.searchState.bind(this)}>SearchState</button>
        <br/>
        <ul>
          {this.state.pokemons.map((pokemon, index) => {
            return <li onClick={this.sendPokeData.bind(this, pokemon)} key={index}>{pokemon.name}</li>
          })}
        </ul>
      </div>
    );
  }
}

export default Search;

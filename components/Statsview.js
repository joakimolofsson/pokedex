import React, { Component } from 'react';
import './css/Statsview.css';

class Imageview extends Component {
  constructor(props) {
    super(props);
    this.state = {
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

  componentWillReceiveProps(nextProps) {//uppdaterar när man har valt en pokemon
    this.setState({
      statsName: nextProps.pokemonStats.statsName,
      statsHeight: nextProps.pokemonStats.statsHeight,
      statsWeight: nextProps.pokemonStats.statsWeight,
      statsBaseExp: nextProps.pokemonStats.statsBaseExp,
      statsTypes: nextProps.pokemonStats.statsTypes,
      statsStats: nextProps.pokemonStats.statsStats,
      statsMoves: nextProps.pokemonStats.statsMoves,
      statsEvoFrom: nextProps.pokemonStats.statsEvoFrom,
      statsHabitat: nextProps.pokemonStats.statsHabitat,
      statsDescription: nextProps.pokemonStats.statsDescription,
    })
  }

  statsView() {//loggar state
    console.log(this.state)
  }

  render() {
    return (
      <div className="Statsview">
        <p style={{fontWeight:'bold'}}>Name</p>
        <p>{this.state.statsName}</p>
        <p style={{fontWeight:'bold'}}>Height</p>
        <p>{this.state.statsHeight}</p>
        <p style={{fontWeight:'bold'}}>Weight</p>
        <p>{this.state.statsWeight}</p>
        <p style={{fontWeight:'bold'}}>Base Exp</p>
        <p>{this.state.statsBaseExp}</p>
        <div>
          <p style={{fontWeight:'bold'}}>Type</p>
          {this.state.statsTypes.map((type, index) => {
              return <p key={index}>{`${type.name}`}</p>
          })}
        </div>
        <div>
          <p style={{fontWeight:'bold'}}>Stats</p>
          {this.state.statsStats.map((stat, index) => {
              return <p key={index}>{`${stat.name}: ${stat.baseStat}`}</p>
          })}
        </div>
        <div>
          <p style={{fontWeight:'bold'}}>Moves</p>
          {this.state.statsMoves.map((move, index) => {
              return <p key={index}>{`${move.name}`}</p>
          })}
        </div>
        <p style={{fontWeight:'bold'}}>Evolves From</p>
        <p>{this.state.statsEvoFrom}</p>
        <p style={{fontWeight:'bold'}}>Habitat</p>
        <p>{this.state.statsHabitat}</p>
        <p style={{fontWeight:'bold'}}>Description</p>
        <p>{this.state.statsDescription}</p>
        <button onClick={this.statsView.bind(this)}>state</button>
      </div>
    );
  }
}

export default Imageview;

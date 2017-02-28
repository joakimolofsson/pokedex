import React, { Component } from 'react';
import './css/Statsview.css';

class Imageview extends Component {
  constructor(props) {
    super(props);
    this.state = {
      statsName: 'Pokemon',
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

  componentWillReceiveProps(nextProps) {//uppdaterar när man har valt en pokemon. data från app.js
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

  firstLetter(word) {//första bokstaven blir stor. Samma func finns i imageview.js o search.js
    if(word === undefined) {
      return
    } else {
      return word.charAt(0).toUpperCase() + word.slice(1)
    }
  }

  render() {
    return (
      <div className="Statsview">
        <div className="box boxOne boxCover"><h3>Loading Pokemon</h3></div>
        <div className="box boxOne">
          <p className="boxTitle">{this.firstLetter(this.state.statsName)}</p>
          <p><span>Height:</span> {this.state.statsHeight}</p>
          <p><span>Weight:</span> {this.state.statsWeight}</p>
          <p><span>Base Exp:</span> {this.state.statsBaseExp}</p>
          <div>
            <p className="pInline">Type: </p>
            {this.state.statsTypes.map((type, index) => {
                return <p className="pInline" key={index}>{this.firstLetter(type.name)}</p>
            })}
          </div>
          <p><span>Habitat:</span> {this.firstLetter(this.state.statsHabitat)}</p>
          <p><span>Evolves from:</span> {this.firstLetter(this.state.statsEvoFrom)}</p>
        </div>
        <div className="box boxTwo boxCover"><h3>Loading Stats</h3></div>
        <div className="box boxTwo">
          <div>
            <p className="boxTitle">Stats</p>
            {this.state.statsStats.map((stat, index) => {
                return <p key={index}>{this.firstLetter(stat.name) + ': ' + stat.baseStat}</p>
            })}
          </div>
        </div>
        <div className="box boxThree boxCover"><h3>Loading Moves</h3></div>
        <div className="box boxThree">
          <div>
            <p className="boxTitle">Moves</p>
            {this.state.statsMoves.map((move, index) => {
                return <p key={index}>{this.firstLetter(move.name)}</p>
            })}
          </div>
        </div>
        <div className="box boxFour boxCover"><h3>Loading Description</h3></div>
        <div className="box boxFour">
          <p className="boxTitle">Description</p>
          <p>{this.state.statsDescription}</p>
        </div>
      </div>
    );
  }
}

export default Imageview;

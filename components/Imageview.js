import React, { Component } from 'react';
import './css/Imageview.css';

class Imageview extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  componentWillReceiveProps(nextProps) {//uppdaterar när man har valt en pokemon
    this.setState({
      name: nextProps.pokemonName,
      url: nextProps.pokemonUrl
    })
  }

  imageState() {//loggar state
    console.log(this.state)
  }

  render() {
    return (
      <div className="Imageview">
        <img src={this.state.url} alt="pokemon"/>
        <br/>
        <h3>{this.state.name}</h3>
        <br/>
      </div>
    );
  }
}

export default Imageview;

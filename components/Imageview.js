import React, { Component } from 'react';
import './css/Imageview.css';

class Imageview extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  componentWillReceiveProps(nextProps) {//uppdaterar när man har valt en pokemon
    this.setState({
      imgName: nextProps.pokemonImage.imgName,
      imgUrl: nextProps.pokemonImage.imgUrl
    })
  }

  imageState() {//loggar state
    console.log(this.state)
  }

  render() {
    return (
      <div className="Imageview">
        <img src={this.state.imgUrl} alt="Pokemon"/>
        <h3>{this.state.imgName}</h3>
      </div>
    );
  }
}

export default Imageview;

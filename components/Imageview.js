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
      imgUrl: nextProps.pokemonImage.imgUrl,
    })
  }

  firstLetter(word) {//första bokstaven blir stor. Samma func finns i statsview.js o search.js
    if(word === undefined) {
      return
    } else {
      return word.charAt(0).toUpperCase() + word.slice(1)
    }
  }

  render() {
    return (
      <div className="Imageview">
        <div className="box boxCover"><h3 className="loadText">Loading Image</h3></div>
        <div className="box">
          <img src={this.state.imgUrl} alt="Pokemon"/>
          <h3>{this.firstLetter(this.state.imgName)}</h3>
        </div>
      </div>
    );
  }
}

export default Imageview;

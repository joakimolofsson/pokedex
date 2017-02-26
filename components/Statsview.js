import React, { Component } from 'react';
import './css/Statsview.css';

class Imageview extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  componentWillReceiveProps(nextProps) {//uppdaterar när man har valt en pokemon
    this.setState({
    })
  }

  Statsview() {//loggar state
    console.log(this.state)
  }

  render() {
    return (
      <div className="Statsview">
        <img src={this.state.url} alt="Pokemon"/>
        <h3>{this.state.name}</h3>
      </div>
    );
  }
}

export default Imageview;

import React, { Component } from 'react';
import BandInput from './components/BandInput';
import Bands from './components/Bands';

class App extends Component {
  render() {
    return (
      <div className="App">
        <BandInput  />
        <Bands />
      </div>
    );
  }
};

export default App;

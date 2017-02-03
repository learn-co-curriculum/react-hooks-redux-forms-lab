import React, { Component } from 'react'

class Bands extends Component {
  constructor(props){
    super(props)
    this.state = {text: ''}
  }
  render(){
    let storeState = this.props.store.getState()
    let bands = storeState.bands.map(function(band){
      return <li> {band} </li>
    })
    return(
      <ul>
        {bands}
      </ul>
    )
  }
}

export default Bands;

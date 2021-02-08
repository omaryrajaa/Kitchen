import React, { Component } from 'react';

import AddressLookup from '../components/AddressLookUp';

import './Form.css'


export default class Form extends Component {
  constructor (props) {
    super(props)
    this.state = {
      location: {},
      value: ''
    }
    this.onAddressChange = this.onAddressChange.bind(this)
  }

  onAddressChange (location) {
    console.log("location = ", location)
    this.setState({ location })
  }

  render () {
    return (
      <div className="lookup-container">
        <AddressLookup
          className="lookup-field"
          placeholder="Enter delivery address"
          onChange={this.onAddressChange}
          value={this.state.value} />
      </div>
    )
    }
  }
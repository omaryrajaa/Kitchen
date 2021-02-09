import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { camelize, camelizeKeys, bind } from '../helpers/utils'

const propTypes = {
  className: PropTypes.string,
  placeholder: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
  types: PropTypes.array
}

const defaultProps = {
  onChange: () => {},
  types: ['address']
}

export default class AddressLookup extends Component {
  constructor (props) {
    super(props)
    this.state = {
      value: props.value
    }
    this.textInput = React.createRef();

    bind(this, [
      'onInputValueChange',
      'onInputFocus',
      'onPlaceChange',
      'onPosition'
    ])
  }


  componentDidMount () {
    this.autocomplete = new window.google.maps.places.Autocomplete(
      this.textInput.current, {
        types: this.props.types
      }
    )
    this.autocomplete.addListener('place_changed', this.onPlaceChange)
  }

  onInputValueChange ({ target }) {
    this.setState({ value: target.value })
  }

  onInputFocus () {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(this.onPosition)
    }
  }

  onPosition ({ coords }) {
    console.log("coords = ", coords)
    const circle = new window.google.maps.Circle({
      radius: coords.accuracy,
      center: {
        lat: coords.latitude,
        lng: coords.longitude
      }
    })
    this.autocomplete.setBounds(circle.getBounds())
  }

  onPlaceChange () {
    const place = this.autocomplete.getPlace()
    const type = ({ types }) => types[0]
    const reducer = (acc, component, i) => ({
      ...acc,
      [camelize(type(component))]: camelizeKeys(component)
    })
    const result = place.address_components.reduce(reducer, {})
    this.setState({ value: place.formatted_address })
    this.props.onChange(result)
  }

  render () {
    
    return (
      <input type="text"
        ref={this.textInput}
        className={this.props.className}
        placeholder={this.props.placeholder}
        onChange={this.onInputValueChange}
        onFocus={this.onInputFocus}
        value={this.state.value} />
    )
  }
}

Object.assign(AddressLookup, { propTypes, defaultProps })
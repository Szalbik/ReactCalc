import React, { Component } from 'react';
import {
  Text,
  View,
  TouchableHighlight
} from 'react-native';
import Styles from './Styles';

export default class InputButton extends Component {
  constructor(props){
    super(props)

  }

  render() {
    return (
      <TouchableHighlight style={[Styles.inputButton, this.props.highlight ? Style.inputButtonHighlighted : null]}
                          underlayColor='#193441'
                          onPress={this.props.onPress}>
        <Text style={Styles.inputButtonText}>{this.props.value}</Text>
      </TouchableHighlight>
    );
  }
}

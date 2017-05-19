import React, { Component } from 'react';
import {
  AppRegistry,
  Text,
  View
} from 'react-native';
import Styles from './Styles';
import InputButton from './InputButton';

const inputButtons = [
    [1, 2, 3, '/'],
    [4, 5, 6, '*'],
    [7, 8, 9, '-'],
    [0, '.', '=', '+']
];

class ReactCalculator extends Component {
  constructor(props) {
    super(props);

    this.state = {
          previousInputValue: 0,
          inputValue: 0,
          selectedSymbol: null
    }
  }

  render() {
    return (
      <View style={Styles.rootContainer}>
        <View style={Styles.displayContainer}>
          <Text style={Styles.displayText}>{this.state.inputValue}</Text>
        </View>
        <View style={Styles.inputContainer}>
          {this._renderInputButtons()}
        </View>
      </View>
    );
  }

  /**
   * For each row in `inputButtons`, create a row View and add create an InputButton for each input in the row.
   */
  _renderInputButtons() {
      let views = [];

      for (var r = 0; r < inputButtons.length; r ++) {
          let row = inputButtons[r];

          let inputRow = [];
          for (var i = 0; i < row.length; i ++) {
              let input = row[i];

              inputRow.push(
                  <InputButton
                    value={input}
                    onPress={this._onInputButtonPressed.bind(this, input)}
                    key={r + "-" + i} />
              );
          }

          views.push(<View style={Styles.inputRow} key={"row-" + r}>{inputRow}</View>)
      }

      return views;
  }

  _onInputButtonPressed(input) {
      switch (typeof input) {
          case 'number':
              return this._handleNumberInput(input)
          case 'string':
              return this._handleStringInput(input)
      }
  }

  _handleNumberInput(num) {
      let inputValue = (this.state.inputValue * 10) + num;

      this.setState({
          inputValue: inputValue
      })
  }

  _handleStringInput(str) {
    switch (str) {
        case '/':
        case '*':
        case '+':
        case '-':
            this.setState({
                selectedSymbol: str,
                previousInputValue: this.state.inputValue,
                inputValue: 0
            });
            break;
        case '=':
            let symbol = this.state.selectedSymbol,
                inputValue = this.state.inputValue,
                previousInputValue = this.state.previousInputValue;

            if (!symbol) {
                return;
            }

            this.setState({
                previousInputValue: 0,
                inputValue: eval(previousInputValue + symbol + inputValue),
                selectedSymbol: null
            });
            break;
    }
  }
}

AppRegistry.registerComponent('ReactCalculator', () => ReactCalculator);

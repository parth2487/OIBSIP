import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const App = () => {
  const [displayValue, setDisplayValue] = useState('');
  const [resultValue, setResultValue] = useState('');

  const handleButtonPress = (buttonPressed) => {
    if (buttonPressed === '=') {
      calculateResult();
    } else if (buttonPressed === 'C') {
      clearAll();
    } else if (buttonPressed === 'CE') {
      clearEntry();
    } else {
      setDisplayValue((prevDisplayValue) => prevDisplayValue + buttonPressed);
    }
  };

  const calculateResult = () => {
    let result = '';
    try {
      result = eval(displayValue);
    } catch (error) {
      result = 'Error';
    }
    setResultValue(result);
  };

  const clearAll = () => {
    setDisplayValue('');
    setResultValue('');
  };

  const clearEntry = () => {
    setDisplayValue((prevDisplayValue) =>
      prevDisplayValue.slice(0, prevDisplayValue.length - 1)
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.displayContainer}>
        <Text style={styles.displayText}>{displayValue}</Text>
        <Text style={styles.resultText}>{resultValue}</Text>
      </View>
      <View style={styles.buttonContainer}>
        <View style={styles.row}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => handleButtonPress('7')}
          >
            <Text style={styles.buttonText}>7</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => handleButtonPress('8')}
          >
            <Text style={styles.buttonText}>8</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => handleButtonPress('9')}
          >
            <Text style={styles.buttonText}>9</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.buttonOperator}
            onPress={() => handleButtonPress('/')}
          >
            <Text style={styles.buttonText}>/</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.row}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => handleButtonPress('4')}
          >
            <Text style={styles.buttonText}>4</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => handleButtonPress('5')}
          >
            <Text style={styles.buttonText}>5</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => handleButtonPress('6')}
          >
            <Text style={styles.buttonText}>6</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.buttonOperator}
            onPress={() => handleButtonPress('*')}
          >
            <Text style={styles.buttonText}>*</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.row}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => handleButtonPress('1')}
          >
            <Text style={styles.buttonText}>1</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => handleButtonPress('2')}
          >
            <Text style={styles.buttonText}>2</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => handleButtonPress('3')}
          >
            <Text style={styles.buttonText}>3</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.buttonOperator}
            onPress={() => handleButtonPress('-')}
          >
            <Text style={styles.buttonText}>-</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.row}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => handleButtonPress('0')}
          >
            <Text style={styles.buttonText}>0</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => handleButtonPress('.')}
          >
            <Text style={styles.buttonText}>.</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.buttonOperator}
            onPress={() => handleButtonPress('=')}
          >
            <Text style={styles.buttonText}>=</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.buttonOperator}
            onPress={() => handleButtonPress('+')}
          >
            <Text style={styles.buttonText}>+</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.row}>
          <TouchableOpacity
            style={styles.buttonClear}
            onPress={() => handleButtonPress('CE')}
          >
            <Text style={styles.buttonText}>CE</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.buttonClear}
            onPress={() => handleButtonPress('C')}
          >
            <Text style={styles.buttonText}>C</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
  displayContainer: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'flex-end',
    backgroundColor: '#fff',
    padding: 20,
  },
  displayText: {
    fontSize: 32,
  },
  resultText: {
    fontSize: 24,
    color: '#888',
  },
  buttonContainer: {
    flex: 3,
    backgroundColor: '#fff',
  },
  row: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  button: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    margin: 1,
  },
  buttonOperator: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    margin: 1,
  },
  buttonClear: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#d3d3d3',
    margin: 1,
  },
  buttonText: {
    fontSize: 24,
    color: '#000',
  },
});

export default App;

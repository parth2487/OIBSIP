import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, View, Text, TextInput, Button, TouchableOpacity, Modal, FlatList } from 'react-native';

const units = {
  length: {
    meter: 1,
    kilometer: 0.001,
    centimeter: 100,
    millimeter: 1000,
  },
  weight: {
    kilogram: 1,
    gram: 1000,
    milligram: 1000000,
    pound: 2.20462,
  },
  temperature: {
    celsius: 1,
    fahrenheit: (value) => (value * 9 / 5) + 32,
    kelvin: (value) => value + 273.15,
  },
};

const convertUnits = (value, fromUnit, toUnit, category) => {
  if (category === 'temperature') {
    if (fromUnit === 'celsius') {
      if (toUnit === 'fahrenheit') return units.temperature.fahrenheit(value);
      if (toUnit === 'kelvin') return units.temperature.kelvin(value);
    }
    if (fromUnit === 'fahrenheit') {
      if (toUnit === 'celsius') return (value - 32) * 5 / 9;
      if (toUnit === 'kelvin') return ((value - 32) * 5 / 9) + 273.15;
    }
    if (fromUnit === 'kelvin') {
      if (toUnit === 'celsius') return value - 273.15;
      if (toUnit === 'fahrenheit') return ((value - 273.15) * 9 / 5) + 32;
    }
    return value;
  }
  return (value / units[category][fromUnit]) * units[category][toUnit];
};

const App = () => {
  const [category, setCategory] = useState('length');
  const [fromUnit, setFromUnit] = useState('meter');
  const [toUnit, setToUnit] = useState('kilometer');
  const [value, setValue] = useState('');
  const [result, setResult] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalType, setModalType] = useState('category');

  const handleConvert = () => {
    const numericValue = parseFloat(value);
    if (!isNaN(numericValue)) {
      const conversionResult = convertUnits(numericValue, fromUnit, toUnit, category);
      setResult(conversionResult);
    }
  };

  const renderModal = () => {
    let items = [];
    if (modalType === 'category') {
      items = Object.keys(units);
    } else if (modalType === 'fromUnit' || modalType === 'toUnit') {
      items = Object.keys(units[category]);
    }

    return (
      <Modal
        transparent={true}
        visible={isModalVisible}
        onRequestClose={() => setIsModalVisible(false)}
      >
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <FlatList
              data={items}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.modalItem}
                  onPress={() => {
                    setIsModalVisible(false);
                    if (modalType === 'category') {
                      setCategory(item);
                      setFromUnit(Object.keys(units[item])[0]);
                      setToUnit(Object.keys(units[item])[0]);
                    } else if (modalType === 'fromUnit') {
                      setFromUnit(item);
                    } else if (modalType === 'toUnit') {
                      setToUnit(item);
                    }
                  }}
                >
                  <Text style={styles.modalItemText}>{item.charAt(0).toUpperCase() + item.slice(1)}</Text>
                </TouchableOpacity>
              )}
              keyExtractor={(item) => item}
            />
          </View>
        </View>
      </Modal>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Unit Converter</Text>
      <View style={styles.row}>
        <Text style={styles.label}>Category:</Text>
        <TouchableOpacity
          style={styles.dropdown}
          onPress={() => {
            setModalType('category');
            setIsModalVisible(true);
          }}
        >
          <Text style={styles.dropdownText}>{category.charAt(0).toUpperCase() + category.slice(1)}</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>From:</Text>
        <TouchableOpacity
          style={styles.dropdown}
          onPress={() => {
            setModalType('fromUnit');
            setIsModalVisible(true);
          }}
        >
          <Text style={styles.dropdownText}>{fromUnit.charAt(0).toUpperCase() + fromUnit.slice(1)}</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>To:</Text>
        <TouchableOpacity
          style={styles.dropdown}
          onPress={() => {
            setModalType('toUnit');
            setIsModalVisible(true);
          }}
        >
          <Text style={styles.dropdownText}>{toUnit.charAt(0).toUpperCase() + toUnit.slice(1)}</Text>
        </TouchableOpacity>
      </View>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        placeholder="Enter value"
        value={value}
        onChangeText={(text) => setValue(text)}
      />
      <TouchableOpacity style={styles.button} onPress={handleConvert}>
        <Text style={styles.buttonText}>Convert</Text>
      </TouchableOpacity>
      {result !== null && (
        <Text style={styles.result}>
          Result: {result.toFixed(2)}
        </Text>
      )}
      {renderModal()}
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f0f0f0',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 16,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 8,
  },
  label: {
    fontSize: 16,
    flex: 1,
  },
  dropdown: {
    flex: 2,
    borderWidth: 1,
    borderColor: 'gray',
    padding: 8,
    backgroundColor: 'white',
  },
  dropdownText: {
    fontSize: 16,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    paddingHorizontal: 8,
    marginVertical: 16,
    backgroundColor: 'white',
  },
  button: {
    backgroundColor: '#007BFF',
    padding: 10,
    alignItems: 'center',
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
  result: {
    marginTop: 20,
    fontSize: 18,
    textAlign: 'center',
  },
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContainer: {
    width: '80%',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 16,
    alignItems: 'center',
  },
  modalItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    width: '100%',
  },
  modalItemText: {
    fontSize: 18,
  },
});

export default App;

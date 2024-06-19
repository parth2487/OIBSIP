import React, { useState, useRef } from 'react';
import { View, Text, Button, StyleSheet, FlatList, TouchableOpacity } from 'react-native';

const formatTime = (time) => {
  const pad = (n) => (n < 10 ? '0' + n : n);
  const milliseconds = ('00' + (time % 1000)).slice(-3);
  const seconds = Math.floor(time / 1000) % 60;
  const minutes = Math.floor(time / (1000 * 60)) % 60;
  const hours = Math.floor(time / (1000 * 60 * 60)) % 24;
  return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}.${milliseconds}`;
};

const App = () => {
  const [running, setRunning] = useState(false);
  const [time, setTime] = useState(0);
  const [laps, setLaps] = useState([]);
  const timerRef = useRef(null);

  const startStop = () => {
    if (running) {
      clearInterval(timerRef.current);
    } else {
      const startTime = Date.now() - time;
      timerRef.current = setInterval(() => {
        setTime(Date.now() - startTime);
      }, 1);
    }
    setRunning(!running);
  };

  const reset = () => {
    clearInterval(timerRef.current);
    setRunning(false);
    setTime(0);
    setLaps([]);
  };

  const lap = () => {
    setLaps([...laps, time]);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.time}>{formatTime(time)}</Text>
      <View style={styles.buttonRow}>
        <Button title={running ? 'Stop' : 'Start'} onPress={startStop} />
        <Button title="Reset" onPress={reset} disabled={running} />
        <Button title="Lap" onPress={lap} disabled={!running} />
      </View>
      <FlatList
        data={laps}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
          <View style={styles.lap}>
            <Text style={styles.lapText}>Lap {index + 1}</Text>
            <Text style={styles.lapText}>{formatTime(item)}</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  time: {
    fontSize: 48,
    marginBottom: 20,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '80%',
    marginBottom: 20,
  },
  lap: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
    width: '80%',
  },
  lapText: {
    fontSize: 18,
  },
});

export default App;

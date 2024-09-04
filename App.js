import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React, { useState, useRef, useCallback } from 'react';

export default function App() {
  const [time, setTime] = useState(0);
  const [isRunning, setRunning] = useState(false);
  const [result, setResult] = useState([]);
  const timer = useRef(null);
  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
// Calculation and presentation:
const padToTwo = (number) => (number <= 9 ? `0${number}` : number); // used to pad in the format 00:00:00
export const displaytime = (centisec) => {
  let min = 0;
  let sec = 0;

  if (centisec < 0) {
    centisec = 0;
  }
  if (centisec < 100)
    return `00:00:${padToTwo(centisec)}`;

  let remCentisec = centisec % 100;
  sec = (centisec - remCentisec) / 100;

  if (sec < 60)
    return `00:${padToTwo(sec)}: ${padToTwo(remCentisec)}`

  let remSec = sec % 60;
  min = (sec - remSec) / 60;
  return `${padToTwo(min)}:${padToTwo(remSec)}: ${padToTwo(remCentisec)}`
}
// Button Controls:
function Stopwatch() {
  const [time, setTime] = useState(0);
  const [isRunning, setRunning] = useState(false);
  const [result, setResult] = useState([]);
  const timer = useRef(null);

  const handleLeftPress = useCallback(() => {
    setTime(0);
  }, [time]);
  const handleCenterPress = useCallback(() => {
    if (!isRunning) {
      const interval = setInterval(() => {
        setTime((previousTime) => previousTime + 1);
      }, 10);
      timer.current = interval
      setRunning(true);
    }
  }, [isRunning]);
  const handleRightPress = useCallback(() => {
    clearInterval(timer.current);
    setRunning(false);
  }, [isRunning]);
}
function Controls({ isRunning, handleLeftPress, handleCenterPress, handleRightPress }) {
  return (
    <>
      <TouchableOpacity
        style={[]}
        onPress={handleLeftPress}>
        <View>
          <Text style={{}}>
            {"Reset"}
          </Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        style={[]}
        onPress={handleCenterPress}>
        <View>
          <Text style={{}}>
            {"Start"}
          </Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        style={[]}
        onPress={handleRightPress}>
        <View>
          <Text style={[]}>
            {"Stop"}
          </Text>
        </View>
      </TouchableOpacity>
    </>
  )
}
//export default React.memo(Controls);
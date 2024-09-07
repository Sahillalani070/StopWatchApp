import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React, { useState, useRef, useCallback } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function App() {
  const [time, setTime] = useState(0);
  const [isRunning, setRunning] = useState(false);
  const [result, setResult] = useState([]);
  const timer = useRef(null);
  return (
    <View style={styles.container}>
      <Stopwatch />
    </View>
  );
}

// Calculation and presentation:
const padToTwo = (number) => (number <= 9 ? `0${number}` : number); // used to pad in the format 00:00:00
const displaytime = (centisec) => {
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
  return (
    <SafeAreaView>
      <StatusBar style='light' />
      <View>
        <Text style={styles.digitalclock}>{displaytime(time)}</Text>
      </View>
      <View style={styles.controls}>
        <Controls
          isRunning={isRunning}
          handleLeftPress={handleLeftPress}
          handleCenterPress={handleCenterPress}
          handleRightPress={handleRightPress}
        />
      </View>
    </SafeAreaView>
  );
}
function Controls({ isRunning, handleLeftPress, handleCenterPress, handleRightPress }) {
  return (
    <>
      <TouchableOpacity
        style={[styles.buttonBorder]}
        onPress={handleLeftPress}>
        <View style={[styles.textBorder, { borderColor: "#9A9A9A", backgroundColor: "#9A9A9A" }]}>
          <Text>
            {"Reset"}
          </Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.buttonBorder]}
        onPress={handleCenterPress}>
        <View style={[styles.textBorder, { borderColor: isRunning ? "#9A9A9A" : "#37d05c", backgroundColor: isRunning ? "#9A9A9A" : "#37d05c" }]}>
          <Text>
            {"Start"}
          </Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        style={[]}
        onPress={handleRightPress}>
        <View style={[styles.textBorder, { borderColor: isRunning ? "#ea4c49" : "#9A9A9A", backgroundColor: isRunning ? "#ea4c49" : "#9A9A9A" }]}>
          <Text>
            {"Stop"}
          </Text>
        </View>
      </TouchableOpacity>
    </>
  )
}
// Styles For all the components
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
  },
  digitalclock: {
    color: "#fff",
    fontSize: 70,
    fontWeight: "200",
    alignItems: 'center',
    justifyContent: 'center'
  },
  buttonBorder: {
    width: 70,
    height: 70,
    borderRadius: 70,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textBorder: {
    width: 65,
    height: 65,
    borderRadius: 65,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  controls: {
    height: 80,
    flexDirection: "row",
    justifyContent: "space-around"
  }
});
//export default React.memo(Controls);
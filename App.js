import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, Dimensions } from 'react-native';
import CircularProgress from 'react-native-circular-progress-indicator';

const { width } = Dimensions.get('window');

const App = () => {
  const [secondsLeft, setSecondsLeft] = useState(calculateSecondsLeft());

  function calculateSecondsLeft() {
    const now = new Date();
    const midnight = new Date(now);
    midnight.setHours(24, 0, 0, 0); // Set time to midnight
    const diff = (midnight - now) / 1000; // Difference in seconds
    return Math.floor(diff);
  }

    useEffect(() => {
    const timer = setInterval(() => {
      setSecondsLeft(calculateSecondsLeft());
    }, 1000);


    return () => clearInterval(timer);
  }, []);
  const totalSecondsInADay = 24 * 60 * 60;
  const percentage = ((totalSecondsInADay - secondsLeft) / totalSecondsInADay) * 100;

  const getStrokeColor = () => {
    if (percentage < 50) {
      return '#3cb371'; // Green if below 50%
    } else if (percentage >= 50 && percentage < 80) {
      return '#FFA500'; // Orange if between 50% and 80%
    } else {
      return '#FF0000'; // Red if 80% or above
    }
  };

  const getEmoji = () => {
    if (percentage < 20) {
      return '😊';
    } else if (percentage >= 20 && percentage < 50) {
      return '😇';
    } else if (percentage >= 50 && percentage < 80) {
      return '🙂';
    } else if (percentage >= 80 && percentage < 90) {
      return '🥱';
    } else {
      return '😴';
    }
  };
  const getCurrentTime = () => {
    const now = new Date();
    let hours = now.getHours();
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; // If hour is 0, display it as 12
    const formattedHours = String(hours).padStart(2, '0');
    return `${formattedHours}:${minutes} ${ampm}`;
  };


  return (
    <View style={styles.container}>
      <CircularProgress
        value={secondsLeft}
        radius={width / 2} // Adjust radius based on Wear OS screen size
        maxValue={totalSecondsInADay}
        activeStrokeWidth={8}
        activeStrokeColor={getStrokeColor()}
        inActiveStrokeWidth={8}
        inActiveStrokeColor={'#464540'}
        title={`${getCurrentTime()} ${getEmoji()}`}
        titleStyle={styles.title}
        subtitle={`Day: ${Math.floor(percentage)}%`}
        subtitleFontSize={15}
        duration={0}
        rotation={0}
        startAngle={-90}
      />
      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    color: '#fff',
  },
});

export default App;

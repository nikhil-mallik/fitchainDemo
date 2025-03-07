import React from 'react';
import { SafeAreaView } from 'react-native';
import MotionSensorApp from './components/MotionSensorApp'; // Adjust the path as necessary

const App = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <MotionSensorApp />
    </SafeAreaView>
  );
};

export default App; 
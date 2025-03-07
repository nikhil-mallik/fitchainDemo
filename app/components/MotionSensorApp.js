import React, { useState, useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity, Alert, Text } from 'react-native';
import { accelerometer, setUpdateIntervalForType, SensorTypes } from 'react-native-sensors';
import Lottie from 'lottie-react-native';
import StepCounterController from './StepCounterController'; // Import the controller

const MotionSensorApp = () => {
  const controller = new StepCounterController(); // Initialize the controller
  const [isMoving, setIsMoving] = useState(false);
  const [isCountingActive, setIsCountingActive] = useState(controller.isCountingActive()); // Local state for counting
  const [stepTimer, setStepTimer] = useState(null); // State to hold the timer

  useEffect(() => {
    // Set the update interval for the accelerometer (e.g., 100ms)
    setUpdateIntervalForType(SensorTypes.accelerometer, 100);

    // Subscribe to accelerometer updates
    const subscription = accelerometer.subscribe(({ x, y, z }) => {
      const acceleration = Math.sqrt(x * x + y * y + z * z); // Calculate total acceleration
      const threshold = 1.1; // Adjust this threshold to detect motion

      if (acceleration > threshold && isCountingActive) { // Use local state
        if (!isMoving) {
          setIsMoving(true);
        }
      } else {
        if (isMoving) {
          setIsMoving(false); // Set to false only if it was previously moving
        }
      }
    });

    // Start a timer to increment steps every second if counting is active
    if (isCountingActive) {
      const timer = setInterval(() => {
        controller.incrementStep(); // Increment counter
      }, 1000); // Increment every second
      setStepTimer(timer); // Store the timer ID
    }

    // Cleanup on unmount
    return () => {
      subscription.unsubscribe();
      if (stepTimer) {
        clearInterval(stepTimer); // Clear the timer if it exists
      }
    };
  }, [isMoving, isCountingActive, controller]); // Add isCountingActive to dependencies

  const handleReset = () => {
    controller.resetCounter();
    Alert.alert('Counter Reset', 'The motion counter and calories burned have been reset to 0.');
  };

  const toggleCounting = () => {
    controller.toggleCounting(); // Toggle counting state in the controller
    setIsCountingActive(!isCountingActive); // Update local state
  };

  return (
    <View style={[styles.container, { backgroundColor: isMoving ? '#d4edda' : '#f8d7da' }]}>
      <Text style={styles.title}>FitChain</Text>
      {isMoving ? (
        <Lottie 
          source={require('../assets/walking.json')} 
          autoPlay 
          loop 
          style={styles.animation} 
        />
      ) : (
        <Lottie 
          source={require('../assets/sitting.json')} 
          autoPlay 
          loop 
          style={styles.animation} 
        />
      )}
      <Text style={styles.infoText}>Steps Count: {controller.getMotionCount()}</Text>
      <Text style={styles.infoText}>Calories Burned: {controller.getCaloriesBurned().toFixed(2)} kcal</Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity 
          style={[styles.toggleButton, { backgroundColor: isCountingActive ? '#dc3545' : '#28a745' }]}
          onPress={toggleCounting}
        >
          <Text style={styles.toggleButtonText}>{isCountingActive ? 'Stop Counting' : 'Start Counting'}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.resetButton} onPress={handleReset}>
          <Text style={styles.resetButtonText}>Reset</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  animation: {
    width: 300,
    height: 300,
    marginBottom: 20,
  },
  infoText: {
    fontSize: 20,
    marginBottom: 10,
    color: '#333',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '90%', // Full width to allow spacing
    marginTop: 20, // Add some space above the buttons
  },
  resetButton: {
    backgroundColor: '#007bff',
    padding: 15,
    borderRadius: 50,
    elevation: 5,
    flex: 1,
    marginRight: 10, // Space between buttons
  },
  resetButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  toggleButton: {
    padding: 15,
    borderRadius: 50,
    elevation: 5,
    flex: 1,
  },
  toggleButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default MotionSensorApp; 
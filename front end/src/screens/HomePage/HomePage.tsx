import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Import your image
import StudyMateImage from '@/theme/assets/images/studymate.png';

function HomePage() {
  const navigation = useNavigation();
  const [user, setUser] = useState({ fullname: '' });

  // Fetch user data from AsyncStorage
  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const userDetailsString = await AsyncStorage.getItem('userDetails');
        if (!userDetailsString) throw new Error('No user details found');
        
        const userDetails = JSON.parse(userDetailsString);
        setUser(userDetails);
      } catch (error) {
        console.error('Error fetching user details:', error);
        Alert.alert('Failed to load user details');
      }
    };

    fetchUserDetails();
  }, []);

  const getInitials = (fullName) => {
    if (!fullName) return ''; // Check if fullName is empty or undefined
    const nameArray = fullName.split(' ');
    const initials = nameArray.map(name => name[0]?.toUpperCase() || '').join('');
    return initials;
  };

  const navigateToSettings = () => {
    navigation.navigate('Settings');
  };

  const navigateToStoragePage = () => {
    navigation.navigate('StoragePage');
  };

  const navigateToStartSummarizationPage = () => {
    navigation.navigate('StartSummarizationPage');
  };

  const navigateToExample = () => {
    navigation.navigate('Example');
  };

  // New function to navigate to ChatBot1 page
  const navigateToChatBot = () => {
    navigation.navigate('ChatBot');
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={navigateToSettings} style={styles.profileCircle}>
          <Text style={styles.profileInitials}>{getInitials(user.fullname)}</Text>
        </TouchableOpacity>
        <Text style={styles.title}>StudyMate AI</Text>
      </View>

      <View style={styles.body}>
        {/* Add circular image above the Storage button */}
        <View style={styles.imageContainer}>
          <Image source={StudyMateImage} style={styles.image} />
        </View>

        <TouchableOpacity style={styles.button} onPress={navigateToStoragePage}>
          <Text style={styles.buttonText}>Storage</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={navigateToStartSummarizationPage}>
          <Text style={styles.buttonText}>Start Summarization</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={navigateToExample}>
          <Text style={styles.buttonText}>My Works</Text>
        </TouchableOpacity>
      </View>

      {/* Add the floating button for ChatBot1 navigation */}
      <TouchableOpacity style={styles.floatingButton} onPress={navigateToChatBot}>
        <Text style={styles.floatingButtonText}>Chat</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0A74DA',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#084B8A',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    position: 'absolute',
    left: 0,
    right: 0,
    textAlign: 'center',
  },
  profileCircle: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#28a745', // Green background for the profile circle
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15, // Adds space between profile circle and title
  },
  profileInitials: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: 'bold',
  },
  body: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  // Add styles for the circular image
  imageContainer: {
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20, // Space between image and buttons
  },
  image: {
    width: 120,
    height: 120,
    borderRadius: 60, // Make the image circular
  },
  button: {
    width: '80%',
    padding: 15,
    margin: 10,
    backgroundColor: '#1C90F3',
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
  },
  floatingButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: '#1C90F3',
    borderRadius: 50,
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5, // Adds shadow for Android
  },
  floatingButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default HomePage;

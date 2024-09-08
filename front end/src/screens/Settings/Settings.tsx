// src/screens/Settings.tsx
import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { CommonActions } from '@react-navigation/native';
import { SafeScreen } from '@/components/template'; // Adjust the import as needed

function Settings() {
  const navigation = useNavigation();
  const [user, setUser] = useState({ fullname: '', email: '', role: '', bio: '' });

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

  // Handle logout
  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('authToken');
      await AsyncStorage.removeItem('userDetails'); // Clear user details
      Alert.alert('Logged out successfully');
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name: 'Signin' }],
        })
      );
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  // Extract initials for profile picture
  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  return (
    <SafeScreen>
      <View style={styles.container}>
        {/* Profile picture */}
        <View style={styles.profilePic}>
          <Text style={styles.profilePicText}>
            {user.fullname ? getInitials(user.fullname) : ''}
          </Text>
        </View>

        {/* User details in boxes */}
        <View style={styles.infoBox}>
          <Text style={styles.label}>Full Name:</Text>
          <Text style={styles.text}>{user.fullname}</Text>
        </View>
        <View style={styles.infoBox}>
          <Text style={styles.label}>Email:</Text>
          <Text style={styles.text}>{user.email}</Text>
        </View>
        <View style={styles.infoBox}>
          <Text style={styles.label}>Role:</Text>
          <Text style={styles.text}>{user.role}</Text>
        </View>
        <View style={styles.infoBox}>
          <Text style={styles.label}>Bio:</Text>
          <Text style={styles.text}>{user.bio}</Text>
        </View>

        {/* Logout button */}
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutText}>Log Out</Text>
        </TouchableOpacity>
      </View>
    </SafeScreen>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0A74DA', // Blue background
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  profilePic: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#4CAF50', // Green background for profile pic
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
  },
  profilePicText: {
    color: '#FFFFFF',
    fontSize: 40,
    fontWeight: 'bold',
  },
  infoBox: {
    backgroundColor: '#B3E5FC', // Light blue background for the info boxes
    width: '100%',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    alignItems: 'center', // Center text inside the boxes
    justifyContent: 'center',
    elevation: 3, // Shadow effect for Android
    shadowColor: '#000', // Shadow effect for iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  label: {
    fontSize: 16,
    color: '#333', // Dark text color
    fontWeight: 'bold',
    marginBottom: 5,
  },
  text: {
    fontSize: 18,
    color: '#333', // Dark text color
    textAlign: 'center',
  },
  logoutButton: {
    backgroundColor: '#FF4B4B', // Red button for logout
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 30, // Rounder button
    marginTop: 30,
  },
  logoutText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 18,
  },
});

export default Settings;

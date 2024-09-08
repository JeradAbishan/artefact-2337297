// src/screens/ViewSummarizedTextPage.tsx
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

const ViewSummarizedTextPage = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { summarizedText } = route.params as { summarizedText: string };

  return (
    <View style={styles.container}>
      <View style={styles.textBox}>
        <ScrollView>
          <Text style={styles.text}>{summarizedText}</Text>
        </ScrollView>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity 
          style={styles.chatButton} 
          onPress={() => navigation.navigate('ChatBot')}
        >
          <Text style={styles.chatButtonText}>Chatbot</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.homeButton} 
          onPress={() => navigation.navigate('HomePage')}
        >
          <Text style={styles.homeButtonText}>HOME</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#e0f7fa', // Light blue background
    justifyContent: 'space-between', // Ensure buttons are at the bottom
  },
  textBox: {
    flex: 1,
    backgroundColor: '#ffffff', // White background for the text box
    borderRadius: 10,
    padding: 15,
    elevation: 3, // Add shadow effect for Android
    shadowColor: '#000', // Add shadow effect for iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  text: {
    fontSize: 18,
    color: '#333', // Dark text color for contrast
  },
  buttonContainer: {
    flexDirection: 'row', // Align buttons horizontally
    justifyContent: 'space-between', // Space out buttons
    marginTop: 20,
  },
  chatButton: {
    backgroundColor: '#4caf50', // Green background
    borderRadius: 50, // Circular shape
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  chatButtonText: {
    color: '#fff', // White text
    fontWeight: 'bold',
  },
  homeButton: {
    backgroundColor: '#003366', // Dark blue background
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  homeButtonText: {
    color: '#fff', // White text
    fontWeight: 'bold',
  },
});

export default ViewSummarizedTextPage;

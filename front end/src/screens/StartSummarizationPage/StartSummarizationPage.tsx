import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Alert, ScrollView, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '@/types/navigation';
import DocumentPicker from 'react-native-document-picker';

type StartSummarizationPageNavigationProp = StackNavigationProp<RootStackParamList, 'StartSummarizationPage'>;

const StartSummarizationPage = () => {
  const [originalText, setOriginalText] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const navigation = useNavigation<StartSummarizationPageNavigationProp>();

  // Function to handle PDF upload and extract text
  const handlePdfUpload = async () => {
    try {
      const result = await DocumentPicker.pick({
        type: [DocumentPicker.types.pdf],
      });

      if (result.length > 0) {
        const file = result[0];
        const formData = new FormData();
        formData.append('file', {
          uri: file.uri,
          name: file.name,
          type: file.type,
        });

        setLoading(true);

        // Step 1: Upload PDF and get extracted text
        const response = await axios.post('http://10.0.2.2:8000/upload-pdf/', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });

        const extractedText = response.data.extracted_text;
        if (extractedText) {
          // Step 2: Set extracted text in the input field
          setOriginalText(extractedText);
          // Automatically submit extracted text for processing
          submitText(extractedText);
        } else {
          Alert.alert('Error', 'Failed to extract text from the PDF.');
        }
      }
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        console.log('User canceled the picker');
      } else {
        console.error('Error uploading PDF:', err);
        Alert.alert('Error', 'An error occurred while uploading the PDF');
      }
      setLoading(false);
    }
  };

  // Function to submit the text for notes/create API
  const submitText = async (text: string) => {
    try {
      const token = await AsyncStorage.getItem('authToken');
      if (!token) {
        console.error('No token found');
        return;
      }

      // Step 3: Send extracted or user-inputted text to notes/create API
      const response = await axios.post(
        'http://10.0.2.2:8080/api/notes/create',
        { originalText: text },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const summarizedText = response.data.aiSummarizedText;
      await AsyncStorage.setItem('originalText', text);

      // Step 4: Navigate to view summarized text
      navigation.navigate('ViewSummarizedTextPage', { summarizedText });
    } catch (error) {
      console.error('Error during summarization:', error);
      Alert.alert('Error', 'An error occurred while summarizing the text.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <TextInput
        style={styles.textInput}
        placeholder="Paste your original text here..."
        multiline
        numberOfLines={6}
        value={originalText}
        onChangeText={setOriginalText}
      />
      <TouchableOpacity style={styles.button} onPress={() => submitText(originalText)}>
        <Text style={styles.buttonText}>Submit</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={handlePdfUpload}>
        <Text style={styles.buttonText}>Add PDF</Text>
      </TouchableOpacity>

      {loading && <ActivityIndicator size="large" color="#1C90F3" />}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#E0F7FA', // Light blue background
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textInput: {
    width: '100%',
    height: 180, // Increased height for a bigger text input
    borderColor: 'gray',
    borderWidth: 1,
    backgroundColor: '#FFFFFF', // White background for text input
    marginBottom: 20,
    padding: 15,
    borderRadius: 10,
    textAlignVertical: 'top', // Align text to the top of the input field
  },
  button: {
    width: '100%',
    padding: 15,
    backgroundColor: '#1C90F3', // Dark blue button background
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginVertical: 10, // Space between buttons
    elevation: 3,
  },
  buttonText: {
    color: '#FFFFFF', // White text color
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default StartSummarizationPage;

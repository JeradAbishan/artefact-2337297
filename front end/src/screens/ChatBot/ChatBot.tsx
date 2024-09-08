import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';


type ChatMessage = {
  role: 'user' | 'assistant';
  content: string;
};


const ChatBot: React.FC = () => {
  const [userInput, setUserInput] = useState<string>('');
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]); 
  const [originalText, setOriginalText] = useState<string>('');

  useEffect(() => {
    
    const loadOriginalText = async () => {
      try {

        

        const storedText = await AsyncStorage.getItem('originalText');
        if (storedText) {
          setOriginalText(storedText);
        } else {
          setOriginalText('This is a sample original text.');
        }
      } catch (error) {
        console.error('Failed to load original text from AsyncStorage:', error);
      }
    };

    loadOriginalText();
  }, []);

  const handleSendMessage = async () => {
    if (!userInput.trim()) return; 

    // Append the user's message to chat history
    const newMessage: ChatMessage = { role: 'user', content: userInput }; // Use defined type
    setChatMessages((prevMessages) => [...prevMessages, newMessage]);

    // Make the request to your Chat API with the original text and the user's question
    try {
      const token = await AsyncStorage.getItem('authToken');

      if (!token) {
        console.error('No token found');
        return;
      }
      const response = await axios.post('http://10.0.2.2:8080/api/notes/chat', {
        originalText: originalText,
        question: userInput,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,  
        },
      }
      
    
    );

    if (response.data && response.data.text) {
      const assistantMessage: string = response.data.text; 

      // Append the assistant's message to chat history
      setChatMessages((prevMessages) => [
        ...prevMessages,
        { role: 'assistant', content: assistantMessage },
      ]);
    } else {
      console.error('Unexpected response structure:', response.data);
    }
    } catch (error) {
      console.error('Error fetching response from API:', error);
    }

    
    setUserInput('');
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.chatContainer}>
        {chatMessages.map((message, index) => (
          <View
            key={index}
            style={[
              styles.messageContainer,
              message.role === 'user' ? styles.userMessage : styles.assistantMessage,
            ]}
          >
            <Text style={styles.messageText}>{message.content}</Text>
          </View>
        ))}
      </ScrollView>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={userInput}
          onChangeText={setUserInput}
          placeholder="Type your message..."
        />
        <Button title="Send" onPress={handleSendMessage} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#f5f5f5',
  },
  chatContainer: {
    flex: 1,
    marginBottom: 10,
  },
  messageContainer: {
    marginVertical: 5,
    padding: 10,
    borderRadius: 8,
    maxWidth: '80%',
  },
  userMessage: {
    alignSelf: 'flex-end',
    backgroundColor: '#d1e7dd',
  },
  assistantMessage: {
    alignSelf: 'flex-start',
    backgroundColor: '#e9ecef',
  },
  messageText: {
    fontSize: 16,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    padding: 10,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    marginRight: 10,
  },
});

export default ChatBot;

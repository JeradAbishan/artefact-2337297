import React, { useState } from 'react';
import {
  View,
  TextInput,
  Button,
  ScrollView,
  StyleSheet,
  Text,
  Alert,
  KeyboardAvoidingView,
  Platform
} from 'react-native';
import axios from 'axios';

interface Message {
  type: 'user' | 'bot';
  text: string;
}

const Chatbot = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  // Function to handle sending messages
  const sendMessage = async () => {
    if (!inputText.trim()) {
      Alert.alert('Error', 'Please enter a message.');
      return;
    }

    const userMessage: Message = { type: 'user', text: inputText };
    setMessages([...messages, userMessage]);
    setInputText('');
    setLoading(true);

    try {
      // Make a POST request to the chat API
      const response = await axios.post('http://10.0.2.2:8080/api/notes/chat', {
        originalText: inputText,
      });

      const botMessage: Message = { type: 'bot', text: response.data.botResponse };

      // Add bot's response to the chat
      setMessages((prevMessages) => [...prevMessages, botMessage]);
    } catch (error) {
      console.error('Error while chatting:', error);
      Alert.alert('Error', 'Failed to get a response from the server.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView
        contentContainerStyle={styles.chatContainer}
        keyboardShouldPersistTaps="handled"
      >
        {messages.map((message, index) => (
          <View
            key={index}
            style={[
              styles.messageBubble,
              message.type === 'user' ? styles.userMessage : styles.botMessage,
            ]}
          >
            <Text style={styles.messageText}>{message.text}</Text>
          </View>
        ))}
      </ScrollView>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.textInput}
          placeholder="Type your message..."
          value={inputText}
          onChangeText={setInputText}
        />
        <Button
          title={loading ? 'Loading...' : 'Send'}
          onPress={sendMessage}
          disabled={loading}
        />
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  chatContainer: {
    flexGrow: 1,
    padding: 10,
    justifyContent: 'flex-end',
  },
  messageBubble: {
    padding: 10,
    marginVertical: 5,
    borderRadius: 10,
    maxWidth: '80%',
  },
  userMessage: {
    backgroundColor: '#DCF8C6',
    alignSelf: 'flex-end',
  },
  botMessage: {
    backgroundColor: '#ECECEC',
    alignSelf: 'flex-start',
  },
  messageText: {
    fontSize: 16,
  },
  inputContainer: {
    flexDirection: 'row',
    padding: 10,
    borderTopWidth: 1,
    borderColor: '#ccc',
    backgroundColor: '#fff',
  },
  textInput: {
    flex: 1,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 10,
    marginRight: 10,
  },
});

export default Chatbot;

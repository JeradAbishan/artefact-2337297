import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  ScrollView,
  StyleSheet,
  Image,
  ActivityIndicator,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { signup } from '@/services/ApiService'; // Import the signup function
import StudyMateImage from '@/theme/assets/images/studymate.png'; // Path to your image

const Signup = () => {
  const navigation = useNavigation();
  
  const [fullName, setFullName] = useState('');
  const [bio, setBio] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false); // Loading state
  const [error, setError] = useState(''); // Error state

  const handleSignup = async () => {
    setError(''); // Clear previous errors

    // Check for blank fields
    if (!fullName || !password || !email || !bio) {
      setError('Please fill all fields.');
      return;
    }

    setLoading(true); // Show loading indicator

    try {
      const response = await signup(fullName, email, password, bio);
      if (response.status === 200) {
        Alert.alert('Signup Successful');
        navigation.navigate('Signin'); // Navigate to Login screen after successful signup
      } else if (response.status === 403) { // Assuming 409 is the status for existing email
        setError('This email already exists.'); // Show error message
      } else {
        setError('Signup failed. Please try again.');
      }
    } catch (error) {
      // Show error message if signup fails
      if (error.response && error.response.status === 403) {
        setError('This email already exists.');
      } else {
        setError('This email already exists');
        console.log('Unhandled error:', error.message);
      }
    } finally {
      setLoading(false); // Hide loading indicator
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.imageContainer}>
        <Image source={StudyMateImage} style={styles.image} />
      </View>

      <View style={styles.headingContainer}>
        <Text style={styles.heading}>Sign Up</Text>
      </View>

      {/* Display error message */}
      {error ? <Text style={styles.errorText}>{error}</Text> : null}

      <View style={styles.formContainer}>
        <TextInput
          style={styles.input}
          placeholder="Fullname"
          placeholderTextColor="#CCCCCC"
          value={fullName}
          onChangeText={setFullName}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor="#CCCCCC"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="#CCCCCC"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          placeholder="Bio"
          placeholderTextColor="#CCCCCC"
          value={bio}
          onChangeText={setBio}
        />

        {/* Show loading spinner while processing signup */}
        {loading ? (
          <ActivityIndicator size="large" color="#1C90F3" />
        ) : (
          <TouchableOpacity style={styles.button} onPress={handleSignup}>
            <Text style={styles.buttonText}>Sign Up</Text>
          </TouchableOpacity>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#0A74DA',
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center', // This centers the image and other content horizontally
  },
  imageContainer: {
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
    // Removed the previous margin-left/margin-right if present
  },
  image: {
    width: 120,
    height: 120,
    borderRadius: 60,
  },
  headingContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  heading: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
  },
  formContainer: {
    width: '100%', // Adjusted to ensure the form takes full width
    paddingHorizontal: 32,
  },
  input: {
    padding: 15,
    borderWidth: 1,
    borderColor: '#CCCCCC',
    backgroundColor: '#FFFFFF',
    color: '#000000',
    marginBottom: 20,
    borderRadius: 10,
  },
  button: {
    padding: 15,
    backgroundColor: '#1C90F3',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    elevation: 3,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  errorText: {
    color: 'red',
    marginBottom: 20,
    textAlign: 'center',
  },
});


export default Signup;

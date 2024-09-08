import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet, ActivityIndicator, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '@/theme';
import { login } from '@/services/ApiService';
import { CommonActions } from '@react-navigation/native';

// Import the StudyMate image
import StudyMateImage from '@/theme/assets/images/studymate.png';

const Signin = () => {
    const { colors, components, fonts, gutters, layout } = useTheme();
    const navigation = useNavigation();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSignin = async () => {
        setError('');  // Clear previous errors
        if (!email || !password) {
            setError('Please fill in all fields');
            return;
        }

        setLoading(true);
        try {
            const response = await login(email, password);
            if (response.status === 200) {
                const token = response.data.token;
                Alert.alert('Signin Successful');

                // Store the token securely in AsyncStorage
                await AsyncStorage.setItem('authToken', token);

                // Store user details
                const userDetails = {
                    fullname: response.data.fullName,
                    email: response.data.email,
                    role: response.data.role,
                    bio: response.data.bio,
                };
                await AsyncStorage.setItem('userDetails', JSON.stringify(userDetails));

                // Navigate to Home screen after storing token
                navigation.dispatch(
                    CommonActions.reset({
                        index: 0,
                        routes: [{ name: 'HomePage' }],
                    })
                );
            } else {
                setError('Incorrect email or password');
            }
        } catch (error) {
            
            if (error.response && error.response.status === 403) {
                setError('Incorrect email or password');
            } else {
                setError('Signin Failed');
                console.log('Unhandled error:', error.message); 
            }
        } finally {
            setLoading(false);
        }
    };

    const handleSignup = () => {
        navigation.navigate('Signup');
    };

    return (
        <View style={[styles.container, layout.fill]}>
            {/* Circular Image above the Title */}
            <View style={styles.imageContainer}>
                <Image source={StudyMateImage} style={styles.image} />
            </View>

            <Text style={[styles.title, fonts.size_40, fonts.bold]}>Welcome to StudyMate AI</Text>

            {/* Display error message */}
            {error ? <Text style={styles.errorText}>{error}</Text> : null}

            <TextInput
                style={[styles.input, components.input, { borderColor: colors.gray300, color: colors.gray800 }]}
                placeholder="Email"
                placeholderTextColor={colors.gray300}
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
            />

            <TextInput
                style={[styles.input, components.input, { borderColor: colors.gray300, color: colors.gray800 }]}
                placeholder="Password"
                placeholderTextColor={colors.gray300}
                value={password}
                onChangeText={setPassword}
                secureTextEntry
            />

            {loading ? (
                <ActivityIndicator size="large" color={colors.primary} />
            ) : (
                <TouchableOpacity style={[styles.button, { backgroundColor: colors.primary }]} onPress={handleSignin}>
                    <Text style={[fonts.button, { color: colors.white }]}>Sign In</Text>
                </TouchableOpacity>
            )}

            <TouchableOpacity onPress={handleSignup}>
                <Text style={[fonts.link, { color: colors.primary }]}>Don't have an account? Sign Up</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#0A74DA',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    imageContainer: {
        width: 150,
        height: 150,
        borderRadius: 75,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 30,
    },
    image: {
        width: 120,
        height: 120,
        borderRadius: 60,
    },
    title: {
        marginBottom: 20,
        textAlign: 'center',
    },
    input: {
        width: '100%',
        padding: 15,
        borderColor: '#CCCCCC',
        backgroundColor: '#FFFFFF',
        color: '#000000',
        borderWidth: 1,
        borderRadius: 10, // Updated for a more modern look
        marginBottom: 20,
    },
    button: {
        width: '100%',
        padding: 15,
        borderRadius: 10, // Updated for a more modern look
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
        elevation: 3, // Adds a shadow for Android
    },
    errorText: {
        color: 'red',
        marginBottom: 10,
        textAlign: 'center',
    },
});

export default Signin;

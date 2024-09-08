import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
const BASE_URL = 'http://10.0.2.2:8080/api/auth';

// Function for Signup
export const signup = async (fullName: string, email: string, password: string, bio: string) => {
    try {
        const response = await axios.post(`${BASE_URL}/signup`, {
            fullName,
            email,
            password,
            bio,
        });
        const token = response.data.token; // Assuming the token is returned in the `token` field
        await AsyncStorage.setItem('jwtToken', token);
        return response;
    } catch (error) {
        console.error("Signup error", error);
        throw error;
    }
};

// Function for Login
export const login = async (email: string, password: string) => {
    try {
        const response = await axios.post(`${BASE_URL}/login`, {
            username: email,
            password,
        });
        const token = response.data.token; // Assuming the token is returned in the `token` field
        await AsyncStorage.setItem('jwtToken', token); // Store the token securely
        return response;
    } catch (error) {
        console.error("Login error", error);
        throw error;
    }
};

export const getUserDetails = async () => {
    try {
        const token = await AsyncStorage.getItem('jwtToken');
        if (!token) throw new Error("No token found");

        const response = await axios.get(`${BASE_URL}/user/details`, {
            headers: {
                Authorization: `Bearer ${token}`, // Pass token as Bearer token in Authorization header
            },
        });

        return response.data; // Assuming user details are returned in response.data
    } catch (error) {
        console.error("Get user details error", error);
        throw error;
    }
};

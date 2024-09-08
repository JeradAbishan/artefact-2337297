import { useEffect } from 'react';
import { ActivityIndicator, Text, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useQuery } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import { CommonActions } from '@react-navigation/native';

import { useTheme } from '@/theme';
import { Brand } from '@/components/molecules';
import { SafeScreen } from '@/components/template';

import type { RootScreenProps } from '@/types/navigation';

function Startup({ navigation }: RootScreenProps<'Startup'>) {
	const { layout, gutters, fonts } = useTheme();
	const { t } = useTranslation(['startup']);

	useEffect(() => {
		const checkAuthToken = async () => {
		  try {
			// Retrieve the token from storage
			const token = await AsyncStorage.getItem('authToken');
			
			if (token) {
			  // Token found, navigate to the Home screen
			  navigation.dispatch(
				CommonActions.reset({
				  index: 0,
				  routes: [{ name: 'HomePage' }],
				}),
			  );
			} else {
			  // No token found, navigate to the Login screen
			  navigation.dispatch(
				CommonActions.reset({
				  index: 0,
				  routes: [{ name: 'Signin' }],
				}),
			  );
			}
		  } catch (error) {
			// Handle errors if any occur
			console.error('Error retrieving the auth token:', error);
		  }
		};
	
		checkAuthToken();
	  }, [navigation]);
	
	  return (
		<SafeScreen>
			<View
				style={[
					layout.flex_1,
					layout.col,
					layout.itemsCenter,
					layout.justifyCenter,
				]}
			>
				<Brand />
        <ActivityIndicator size="large" style={[gutters.marginVertical_24]} />
      </View>
    </SafeScreen>
  );
}

export default Startup;

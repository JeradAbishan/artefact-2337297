import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { Example, Startup, Signin, Signup, HomePage, Settings, ChatBot, StartSummarizationPage, ViewSummarizedTextPage, StoragePage, ChatBot1 } from '@/screens';
import { useTheme } from '@/theme';

import type { RootStackParamList } from '@/types/navigation';

const Stack = createStackNavigator<RootStackParamList>();

function ApplicationNavigator() {
	const { variant, navigationTheme } = useTheme();

	return (
		<SafeAreaProvider>
			<NavigationContainer theme={navigationTheme}>
				<Stack.Navigator key={variant} screenOptions={{ headerShown: false }}>
					<Stack.Screen name="Startup" component={Startup} />
					<Stack.Screen name="Example" component={Example} />
					<Stack.Screen name="Signin" component={Signin} />
					<Stack.Screen name="Signup" component={Signup} />
					<Stack.Screen name="HomePage" component={HomePage} />
					<Stack.Screen name="Settings" component={Settings} />
					<Stack.Screen name="ChatBot" component={ChatBot} />
					<Stack.Screen name="StartSummarizationPage" component={StartSummarizationPage} />
					<Stack.Screen name="ViewSummarizedTextPage" component={ViewSummarizedTextPage} />
					<Stack.Screen name="StoragePage" component={StoragePage} />
					<Stack.Screen name="ChatBot1" component={ChatBot1} />
					



				</Stack.Navigator>
			</NavigationContainer>
		</SafeAreaProvider>
	);
}

export default ApplicationNavigator;

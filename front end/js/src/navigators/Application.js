import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Example, Startup } from '@/screens';
import { useTheme } from '@/theme';
const Stack = createStackNavigator();
function ApplicationNavigator() {
    const { variant, navigationTheme } = useTheme();
    return (<SafeAreaProvider>
			<NavigationContainer theme={navigationTheme}>
				<Stack.Navigator key={variant} screenOptions={{ headerShown: false }}>
					<Stack.Screen name="Startup" component={Startup}/>
					<Stack.Screen name="Example" component={Example}/>
				</Stack.Navigator>
			</NavigationContainer>
		</SafeAreaProvider>);
}
export default ApplicationNavigator;

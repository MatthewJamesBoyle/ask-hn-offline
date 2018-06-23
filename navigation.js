import { Constants } from 'expo';
import HomeScreen from './screens/home';
import IndividualScreen from './screens/individualScreen';
import { createStackNavigator } from "react-navigation";

const Navigator = createStackNavigator(
    {
    Home: HomeScreen,
    IndividualPost: IndividualScreen,
    },
    {
        initialRouteName: 'Home',
        navigationOptions: {
            headerStyle: {
                backgroundColor: '#f4511e',
            },
            headerTintColor: '#fff',
            title: "Ask HN Offline",
            headerTitleStyle: {
                fontWeight: 'bold',
            },
        },
    },
);

export default Navigator;

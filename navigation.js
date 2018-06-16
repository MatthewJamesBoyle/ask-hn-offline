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
        initialRouteName: 'Home'
    }
);

export default Navigator;

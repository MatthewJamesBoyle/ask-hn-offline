import { Constants } from 'expo';
import HomeScreen from './screens/home';
import { StackNavigator } from "react-navigation";
const Navigator = StackNavigator({
    HomeScreen: {
        screen: HomeScreen,
        navigationOptions: {
            headerTitle: "Ask HN Offline",
            headerLeft: null,
            headerStyle: { marginTop: Constants.statusBarHeight },
        },
        OtherScreen: {
            screen: HomeScreen,
            navigationOptions: {
                headerTitle: "other",
                headerLeft: null,
                headerStyle: { marginTop: Constants.statusBarHeight },
            },
        },
    }
});

export default Navigator;

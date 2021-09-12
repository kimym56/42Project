import {createAppContainer} from 'react-navigation';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import HomeScreen from './Daily';

const TabNavigator = createBottomTabNavigator({
    Month: {
        screen: HomeScreen,
      },
      Week: {
        screen: HomeScreen,
      },
      Day: {
        screen: HomeScreen,
      },
      Schedule: {
        screen: HomeScreen
      },
});
export default createAppContainer(TabNavigator);
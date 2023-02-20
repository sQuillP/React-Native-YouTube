import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Search from '../screens/Search';
import TabNavigation from './TabNavigation';
import HomeSearch from '../components/HomeSearch';
import Ionicons from '@expo/vector-icons/Ionicons'
import ViewVideo from '../screens/ViewVideo';
import Login from '../screens/Login';
import { Text } from 'react-native';

const Stack = createNativeStackNavigator();

function RootNavigation() {

    return (
        <Stack.Navigator
            screenOptions={{
            }}
        >
            <Stack.Screen
                options={{
                    header:(props)=> <HomeSearch/>
                }}
            name='TabNavigation' component={TabNavigation}
            />
            <Stack.Screen 
                options={{
                    header:(props)=> <HomeSearch/>,
                }}
            name='Search' component={Search}/>
            <Stack.Screen 
                options={{
                    header:(props)=> <HomeSearch/>
                }}
            name='ViewVideo' component={ViewVideo}/>
            <Stack.Screen 
                options={ {
                    title:'Sign in'
                }}
            name='Login' component={Login}/>
        </Stack.Navigator>
        
    )
}


export default RootNavigation;
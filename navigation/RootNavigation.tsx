import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Search from '../screens/Search';
import TabNavigation from './TabNavigation';
import HomeSearch from '../components/HomeSearch';
import Ionicons from '@expo/vector-icons/Ionicons'
import ViewVideo from '../screens/ViewVideo';
import Login from '../screens/Login';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { accessStoredToken } from '../redux/slice/authSlice';
const Stack = createNativeStackNavigator();

function RootNavigation() {

    const dispatch:any = useDispatch();

    useEffect(()=> {
      (async ()=> {
        const credentials:any = await AsyncStorage.getItem("TOKEN");
        dispatch(accessStoredToken(credentials));
      })
    },[])

    return (
        <Stack.Navigator
            screenOptions={{
            }}
        >
            <Stack.Screen
            options={{
                headerShown:false
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
                    title:'Sign in',
                }}
            name='Login' component={Login}/>
        </Stack.Navigator>
        
    )
}


export default RootNavigation;

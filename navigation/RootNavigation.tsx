import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Search from '../screens/Search';
import TabNavigation from './TabNavigation';
import HomeSearch from '../components/HomeSearch';
import Ionicons from '@expo/vector-icons/Ionicons'
import ViewVideo from '../screens/ViewVideo';


const Stack = createNativeStackNavigator();

function RootNavigation() {

    return (
        <Stack.Navigator
            screenOptions={{
                header:(props)=>{
                    return <HomeSearch/>
                },
                
            }}
        >
            <Stack.Screen name='TabNavigation' component={TabNavigation}/>
            <Stack.Screen 
                name='Search' 
                component={Search} 
                options={{
                }}
            />
            <Stack.Screen name='ViewVideo' component={ViewVideo}/>
        </Stack.Navigator>
        
    )
}


export default RootNavigation;
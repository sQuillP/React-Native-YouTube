import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Search from '../screens/Search';
import TabNavigation from './TabNavigation';
import HomeSearch from '../components/HomeSearch';
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
            <Stack.Screen name='Search' component={Search} />
        </Stack.Navigator>
        
    )
}


export default RootNavigation;
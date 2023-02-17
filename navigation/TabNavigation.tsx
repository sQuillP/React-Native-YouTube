import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Favorites from "../screens/Favorites";
import History from "../screens/History";
import Ionicons from "@expo/vector-icons/Ionicons"
import Home from "../screens/Home";
import { Globals } from "../globals/styles";
import HomeSearch from "../components/HomeSearch";

const Tab = createBottomTabNavigator();


function TabNavigation() {



    return (
        <Tab.Navigator
            screenOptions={{
                tabBarActiveTintColor: Globals.youtube_red,
                tabBarInactiveTintColor:'black',
                headerShown: false,
                tabBarHideOnKeyboard:true,
            }}
            initialRouteName='Home'    
        >
            <Tab.Screen
                name="Favorites" 
                component={Favorites}
                options={{
                    tabBarIcon:({focused, color, size})=> {
                        return <Ionicons name="heart-outline" color={color} size={30}/>
                    }
                }}
                />
                <Tab.Screen 
                options={{
                    tabBarIcon: ({ focused, color, size })=> {
                        return <Ionicons name="home-outline" color={color} size={30}/>
                    }
                }}
                name="Home" component={Home}/>
                {/* focused?Globals.youtube_red:'black' */}
            <Tab.Screen 
                name="History" 
                component={History} 
                options={{
                    tabBarIcon:({focused, color, size})=> {
                        return <Ionicons name="bookmark-outline" color={color} size={30}/>
                    }
                }}
            />
        </Tab.Navigator>
    )
}


export default TabNavigation;
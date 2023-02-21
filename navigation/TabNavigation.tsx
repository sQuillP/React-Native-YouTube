import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Favorites from "../screens/Favorites";
import History from "../screens/History";
import Ionicons from "@expo/vector-icons/Ionicons"
import Home from "../screens/Home";
import { Globals } from "../globals/styles";
import HomeSearch from "../components/HomeSearch";
import { signout } from "../redux/thunk/auth";
import { useDispatch, useSelector } from "react-redux";
import { Pressable, Text, StyleSheet, TouchableOpacity } from "react-native";
const Tab = createBottomTabNavigator();


function TabNavigation() {

    const dispatch:any = useDispatch();
    const {authToken}:any = useSelector((store:any)=> store.auth);
    function onSignOut() {
        dispatch(signout());
    }


    return (
        <Tab.Navigator
            screenOptions={{
                tabBarActiveTintColor: Globals.youtube_red,
                tabBarInactiveTintColor:'black',
                headerShown: false,
                tabBarHideOnKeyboard:true,
                tabBarShowLabel:false,
            }}
            initialRouteName='Home'    
        >
            <Tab.Screen
                name="Favorites" 
                component={Favorites}
                options={{
                    headerTitle:'History',
                    headerShown:true,
                    headerRight: ()=> {
                        return (
                            <Pressable style={styles.signoutBtn} onPress={onSignOut}>
                                <Text style={styles.signout}>Sign Out</Text>
                            </Pressable>
                        )
                    },
                    tabBarIcon:({focused, color, size})=> {
                        return <Ionicons name="heart-outline" color={color} size={30}/>
                    },
                }}
                />
                <Tab.Screen 
                options={{
                    tabBarIcon: ({ focused, color, size })=> {
                        return <Ionicons name="home-outline" color={color} size={30}/>
                    }
                }}
                name="Home" component={Home}/>
            <Tab.Screen 
                name="History" 
                component={History} 
                
                options={{
                    headerTitle:'History',
                    headerShown:!!authToken,
                    headerRight: ()=> {
                        return (
                            <TouchableOpacity style={styles.signoutBtn} onPress={onSignOut}>
                                <Text style={styles.signout}>Sign Out</Text>
                            </TouchableOpacity>
                        )
                    },
                    tabBarIcon:({focused, color, size})=> {
                        return <Ionicons name="bookmark-outline" color={color} size={30}/>
                    }
                }}
            />
        </Tab.Navigator>
    )
}


export default TabNavigation;

const styles = StyleSheet.create({
    signout: {
        color:'blue',
        fontSize:15,
    },
    signoutBtn: {
        padding:5,
        justifyContent:'center',
        marginRight:10
    }

})
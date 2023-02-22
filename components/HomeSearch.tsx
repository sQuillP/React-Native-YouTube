import { View, TextInput, StyleSheet, Pressable } from "react-native";
import {useState} from 'react';
import Ionicons from "@expo/vector-icons/Ionicons";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import { searchVideos } from "../redux/thunk/searchVideos";

function HomeSearch() {

    //potentially debounce the term
    const [term, updateTerm] = useState<string>('');
    const navigator:any = useNavigation();
    const route:any = useRoute();
    const dispatchVideos:any = useDispatch();

    function onSearchTerm() {
        if(!term.trim()) return;

        dispatchVideos(searchVideos(term));
        if(route.name ==='ViewVideo' || route.name ==='Search')
            navigator.replace("Search",{term});
        else 
            navigator.navigate('Search',{term});

        
    }
    return (
        <SafeAreaView style={styles.container}>
            {(route.name==='ViewVideo' || route.name==='Search')&&(
                <Pressable style={styles.backIcon} onPress={()=> navigator.goBack()}>
                    <Ionicons name="arrow-back-outline" size={30} color='gray'/>
                </Pressable>
            )}
            <View style={styles.searchWrapper}>
                <TextInput 
                    value={term} 
                    onChangeText={(newText)=>updateTerm(newText)} 
                    onSubmitEditing={onSearchTerm}
                    style={styles.input} 
                    placeholder="Search any video"
                />
                <Ionicons 
                    style={styles.searchIcon} 
                    name="search-outline" 
                    size={20} 
                    color='black'
                />
            </View>
        </SafeAreaView>
    )
}


export default HomeSearch;


const styles = StyleSheet.create({
    container:{
        paddingVertical: 15,
        paddingHorizontal:10,
        flexDirection:'row',
    },
    searchWrapper: {
        flexDirection:'row',
        borderRadius:10,
        overflow:'hidden',
        backgroundColor: 'lightgray',
        flex: 1,
        paddingVertical: 5
    },
    input: {
        flex: 1,
        paddingVertical:10,
        paddingLeft: 10
    },
    searchIcon: {
        position: 'absolute',
        top: 14,
        right: 10,
    },
    backIcon: {
        paddingHorizontal:5
    }
})
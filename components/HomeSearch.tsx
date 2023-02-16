import { View, TextInput, Text, StyleSheet, NativeEventEmitter, Keyboard } from "react-native";
import {useState} from 'react';
import Ionicons from "@expo/vector-icons/Ionicons";
import useDebounce from "../hooks/useDebounce";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";



function HomeSearch() {

    //potentially debounce the term
    const [term, updateTerm] = useState('');
    const navigator:any = useNavigation();

    function onSearchTerm() {
        console.log('should search');
        navigator.navigate('Search',{term});
}

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.searchWrapper}>
                <TextInput 
                    value={term} 
                    onChangeText={(newText)=>{console.log(newText);updateTerm(newText)}} 
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
        paddingVertical: 5,
        paddingHorizontal:10
    },
    searchWrapper: {
        flexDirection:'row',
        borderRadius:10,
        overflow:'hidden',
        backgroundColor: 'lightgray'
    },
    input: {
        flex: 1,
        paddingVertical:3,
        paddingLeft: 10
    },
    searchIcon: {
        position: 'absolute',
        top: 5,
        right: 10,
    }
})
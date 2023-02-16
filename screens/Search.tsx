import { useNavigation, useRoute } from "@react-navigation/native"
import { FlatList } from "react-native";
import {useState, useEffect} from 'react';
import {View, Text} from 'react-native';
import { searchVideo } from "../axios/YouTube";



function Search() {

    const navigator = useNavigation();
    const { term }:any = useRoute().params;
    const [searchedVideos, updateSearchedVideos] = useState(null);
    console.log('in search component')
    useEffect(()=> {
        
        (async()=> {
            const videos = await searchVideo(term,1);
            console.log(videos)
            updateSearchedVideos(videos);
        })();
    },[])
    

    return (
        <View>
            <Text></Text>
        </View>
    )
}


export default Search;
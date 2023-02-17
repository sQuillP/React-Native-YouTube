import { useNavigation, useRoute } from "@react-navigation/native"
import {useState, useEffect} from 'react';
import {View, Text, FlatList, StyleSheet, Button, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { useSelector } from "react-redux";
import { searchVideo } from "../axios/YouTube";
import VideoItem from "../components/VideoItem";
import { SearchResult } from "../models/Video";
import type { RootState } from "../redux/store";


//Return the smallest non-null thumbnail for the component
function getThumbnail(video:SearchResult) {

}

const result = [{
    url: 'https://i.ytimg.com/vi/kh1Hz1HIJDE/mqdefault.jpg',
    title: 'The Reveal | Season 9 Ep. 1 | The Masked Singer',
    publishedAt: '2023-02-16T02:00:07Z',
    channelTitle: 'The Masked Singer',
    viewCount: 10000,
    videoId:'hhvdn3ZqQ0I'
}]

function Search() {

    // const navigator = useNavigation();
    const { term }:any = useRoute().params;
    const {videos}:any = useSelector((store:RootState)=> store.search);

    const [searchedVideos, updateSearchedVideos] = useState<any>(null);
    

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.headerText}>Search results for '{term}'</Text>
                </View>
                    <FlatList
                        style={{paddingHorizontal:5}}
                        data={videos}
                        keyExtractor={(item:any) => {return item.id.videoId}}
                        initialNumToRender={5}
                        renderItem={({item}:any)=> {
                            return (
                                <VideoItem
                                    url={item.snippet.thumbnails.medium.url}
                                    title={item.snippet.title}
                                    publishedAt={item.snippet.publishedAt}
                                    viewCount={10000}
                                    channelTitle={item.snippet.channelTitle}
                                    videoId={item.id.videoId}
                                />
                            )
                        }}
                    />
            </View>
        </TouchableWithoutFeedback>
    )
}


export default Search;


const styles= StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:'white'
    },
    header: {
        paddingVertical: 10,
        borderColor:'lightgray',
        borderTopWidth:1,
    },
    headerText: {
        fontWeight:'bold',
        marginLeft:20
    }
})

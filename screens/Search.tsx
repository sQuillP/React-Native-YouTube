import { useRoute } from "@react-navigation/native"
import {View, Text, FlatList, StyleSheet, Button, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { useSelector } from "react-redux";
import VideoItem from "../components/VideoItem";
import type { RootState } from "../redux/store";


function Search() {

    // const navigator = useNavigation();
    const { term }:any = useRoute().params;
    const {videos}:any = useSelector((store:RootState)=> store.search);

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.headerText}>Search results for '{term}'</Text>
                </View>
                    <FlatList
                        style={{paddingHorizontal:5}}
                        data={videos}
                        keyExtractor={(item:any) => item.id}
                        initialNumToRender={25}
                        renderItem={({item}:any)=> {
                            return (
                                <VideoItem
                                    url={item.snippet.thumbnails.medium.url}
                                    title={item.snippet.title}
                                    publishedAt={item.snippet.publishedAt}
                                    channelTitle={item.snippet.channelTitle}
                                    videoId={item.id}
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

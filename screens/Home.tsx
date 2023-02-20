import {View, TouchableWithoutFeedback, FlatList, Keyboard, Dimensions, ActivityIndicator, StyleSheet} from "react-native"
import { useEffect } from "react";
import VideoItem from "../components/VideoItem";
import { useDispatch, useSelector } from "react-redux";
import { Globals } from "../globals/styles";
import { getFeedThunk } from "../redux/thunk/searchVideos";


function Home() {

    const {videos, loading} = useSelector((store:any)=> store.search);

    const dispatch:any = useDispatch();
    useEffect(()=> {
        dispatch(getFeedThunk(25));
    },[]);


    function renderFeed(){


        if(!loading)
            return (
                <FlatList
                    data={videos}
                    keyExtractor={(item) => item.id}
                    initialNumToRender={1}
                    renderItem={({item})=> {
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
            )
        return (
            <View style={styles.loadScreen}>
                <ActivityIndicator
                    color={Globals.youtube_red}
                    size={'large'}
                />
            </View>
        )
    }

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            {renderFeed()}
        </TouchableWithoutFeedback>
    )
}



export default Home;


const styles= StyleSheet.create({
    loadScreen: {
        flex: 1,
        justifyContent:'center',
        alignItems:'center'
    }
})
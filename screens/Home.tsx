import {View, TouchableWithoutFeedback, FlatList, Keyboard, Dimensions, ActivityIndicator, StyleSheet} from "react-native"
import { useEffect } from "react";
import VideoItem from "../components/VideoItem";
import { useDispatch, useSelector } from "react-redux";
import { Globals } from "../globals/styles";
import { getFeedThunk } from "../redux/thunk/searchVideos";
const result = [{
    url: 'https://i.ytimg.com/vi/kh1Hz1HIJDE/mqdefault.jpg',
    title: 'The Reveal | Season 9 Ep. 1 | The Masked Singer',
    publishedAt: '2023-02-16T02:00:07Z',
    channelTitle: 'The Masked Singer',
    viewCount: 10000,
    videoId:'hhvdn3ZqQ0I'
}]

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
                    keyExtractor={(item) => {
                        if(item.id.videoId)
                            return item.id.videoId;
                        return item.id;
                    }}
                    initialNumToRender={1}
                    renderItem={({item})=> {
                        return (
                            <VideoItem
                                url={item.snippet.thumbnails.medium.url}
                                title={item.snippet.title}
                                publishedAt={item.snippet.publishedAt}
                                viewCount={item.statistics.viewCount}
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
import {View, Text, Button, TouchableWithoutFeedback, FlatList, Keyboard, Dimensions} from "react-native"
import YoutubeIframe from "react-native-youtube-iframe";
import { useEffect } from "react";
import { getFeed } from "../axios/YouTube";
import VideoItem from "../components/VideoItem";
import {useState} from 'react';
import { VideoFeedItem } from "../models/Video";


function Home() {

    const [videoFeed, updateVideoFeed]  = useState<VideoFeedItem[]|null>([]);
    useEffect(()=> {
         (async()=> {
            const data:any = await getFeed(25);
            updateVideoFeed(data);
         })();
    },[])

    function onPress() {
        return ;
    }


    function renderFeed(){
        return (
            <FlatList
                data={videoFeed}
                keyExtractor={item => item.id}
                renderItem={({item})=> {
                    return (
                        <VideoItem
                            url={item.snippet.thumbnails.medium.url}
                            title={item.snippet.title}
                            publishedAt={item.snippet.publishedAt}
                            viewCount={item.statistics.viewCount}
                            channelTitle={item.snippet.channelTitle}
                        />
                    )
                }}
            />
        )
    }

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            {renderFeed()}
        </TouchableWithoutFeedback>
    )
}



export default Home;
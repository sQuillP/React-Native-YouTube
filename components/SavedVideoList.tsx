import { VideoResult } from "../models/Video";
import { View, Text, StyleSheet, FlatList } from "react-native";
import SavedVideo from "./SavedVideo";

interface ISavedVideoList {
    videos: VideoResult[],
};


function SavedVideoList({videos}:ISavedVideoList):JSX.Element {

    return (
            <FlatList
                style={{flex: 1}}
                data={videos}
                keyExtractor={(item)=> item.id}
                renderItem={({item})=> {
                    return (
                        <SavedVideo
                            videoId={item.id}
                            image={item.snippet.thumbnails.standard.url}
                            title={item.snippet.title}
                            author={item.channelTitle}
                            description={item.snippet.description}
                            postedOn={item.snippet.publishedAt}
                        />
                    )
                }}

            />
    )
}


export default SavedVideoList;


const styles = StyleSheet.create({
    container: {
        flex: 1
    }
});
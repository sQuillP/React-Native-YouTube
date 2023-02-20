import { useCallback } from "react";
import { FlatList, StyleSheet } from "react-native"

import { useSelector } from "react-redux";
import RelatedVideo from "./RelatedVideo";



function RecommendedList() {

    const { videos } = useSelector((store:any)=>store.search);

    const keyExtractor = useCallback((item:any)=> item.id,[]);

    return (
        <FlatList
            data={videos}
            style={{paddingHorizontal:5}}
            keyExtractor={keyExtractor}
            initialNumToRender={25}
            renderItem={({item})=> {
                return (
                    <RelatedVideo
                        url={item.snippet.thumbnails.default.url}
                        title={item.snippet.title}
                        videoId={item.id}
                        description={item.snippet.description}
                        publishedAt={item.snippet.publishedAt}
                    />
                )
            }}
        />
    )
}


export default RecommendedList;

const styles = StyleSheet.create({

})
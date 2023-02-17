import { FlatList, StyleSheet, Text, View } from "react-native"

import { useSelector } from "react-redux";
import RelatedVideo from "./RelatedVideo";



function RecommendedList() {

    const {videos} = useSelector((store:any)=>store.search);

    return (
        <FlatList
            data={videos}
            keyExtractor={(item)=>{
                if(item.id.videoId)
                    return item.id.videoId;
                return item.id
            }}
            initialNumToRender={25}
            renderItem={({item})=> {
                return (
                    <RelatedVideo
                        url={item.snippet.thumbnails.default.url}
                        title={item.snippet.title}
                        description={item.snippet.description}
                        publishedAt={item.snippet.publisedAt}
                    />
                )
            }}
        />
    )
}


export default RecommendedList;

const styles = StyleSheet.create({

})
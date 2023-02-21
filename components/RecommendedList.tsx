import { useCallback } from "react";
import { FlatList, View, Text } from "react-native"

import { useSelector } from "react-redux";
import RelatedVideo from "./RelatedVideo";



function RecommendedList() {

    const { videos } = useSelector((store:any)=>store.search);

    const keyExtractor = useCallback((item:any)=> item.id,[]);

    return (
        <>
         {
            !!videos.length &&(<FlatList
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
                        );
                    }}
                />)
            }
            {
                !videos.length && (
                    <View style={{flex: 1, justifyContent:'center', alignItems:'center'}}>
                        <Text style={{fontSize: 15}}>No Content Available</Text>
                    </View>
                )
            }
        </>

        
    )
}


export default RecommendedList;

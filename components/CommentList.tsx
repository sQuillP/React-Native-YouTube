import { useEffect, useRef, useState } from "react";
import { ActivityIndicator, FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import { getComments } from "../axios/YouTube";
import { Globals } from "../globals/styles";
import { Comment } from "../models/Comment";
import CommentComponent from './Comment';
import Ionicons from '@expo/vector-icons/Ionicons';

interface CommentListProps {
    videoId:string,
    onClose:()=>void
};

function CommentList({videoId, onClose}:CommentListProps) {
    const [comments, updateComments] = useState<Comment[]|null>(null);
    const [loadingComments, updateLoadingComments] = useState(true);

    useEffect(()=> {
        let mounted = true;
        console.log('fetching comments');

        (async()=> {
            console.log(videoId)
            const commentData:Comment[]|any = await getComments(videoId);
            if(!mounted) return;
            updateComments([commentData[0]]);
            updateLoadingComments(false);
        })()
        return ()=> {mounted = false};
    },[])

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerText}>Comments</Text>
                <Pressable style={styles.headerExit} onPress={onClose}>
                    <Ionicons name='close-outline' size={30} color='black'/>
                </Pressable>
            </View>

        {loadingComments?(
            <View style={styles.loader}>
                <ActivityIndicator size='large' color={Globals.youtube_red}/>
            </View>
        ):
        (<FlatList
            data={comments}
            keyExtractor={(item)=> item.id}
            renderItem={({item})=> {
                console.log('logging the snippet',item.snippet);
                return (
                    <CommentComponent
                        profile={item.snippet.authorProfileImageUrl}
                        likes={item.snippet.likeCount}
                        content={item.snippet.textDisplay}
                        datePosted={item.snippet.publishedAt}
                        channelName={item.snippet.authorDisplayName}
                    />
                )
            }}
        />)}
        </View>
    )

}


export default CommentList;

const styles = StyleSheet.create({
    container: {

    },
    header: {
        paddingVertical: 10,
        borderBottomColor:'black',
        borderBottomWidth:1,
        borderTopWidth:1,
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center'
    },
    headerText: {
        fontSize:15,
        marginLeft: 20
    },
    headerExit: {
        marginRight: 20,

    },
    loader: {
        flex: 1,
        justifyContent:'center',
        alignItems:'center'
    }
})
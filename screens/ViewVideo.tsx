import { useRoute } from "@react-navigation/native";
import { Dimensions, StyleSheet, Text, TouchableOpacity, View,  } from "react-native";
import YoutubeIframe from "react-native-youtube-iframe";
import { useState, useEffect } from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';
import RecommendedList from "../components/RecommendedList";
import { formatTimeAgo } from "../util/formatDate";
import { formatDuration } from "../util/formatTime";
import formatViews from "../util/formatViews";
import { getVideo } from "../axios/YouTube";

function ViewVideo() {
    const [showDescription, updateShowDescription] = useState<boolean>(false);
    const [showComments, updateShowComments] = useState<boolean>(false);
    const [videoContent, updateVideoContent] = useState<any>(null);
    const {height, width} = Dimensions.get('window');
    const {videoId}:any = useRoute().params;

    useEffect(()=> {
        let mounted = true;
        (async()=> {
            const video:any = await getVideo(videoId);
            console.log(video);
            if(!mounted) return;
            updateVideoContent(video);
        })();
        return ()=>{mounted = false}
    },[]);

    return (
        <View style={styles.container}>
            <YoutubeIframe
                height={200}
                width={width}
                videoId={videoId}
            />
                {   !!videoContent && 
                    (
                        <View style={styles.videoHeaders}>
                            <Text style={styles.videoTitle}>{videoContent.snippet.title}</Text>
                            <Text style={styles.videoInfo}>
                                {`${formatViews(videoContent.statistics.viewCount)} • Posted ${formatTimeAgo(videoContent.snippet.publishedAt)} ago • ${formatDuration(videoContent.contentDetails.duration)}`}
                            </Text>
                        </View> 
                    )
                }
                <View style={styles.crumbContainer}>
                    <TouchableOpacity onPress={()=>updateShowDescription(true)} style={styles.breadCrumb}>
                        <Text style={styles.crumbDesc}>Show Description</Text>
                        <Ionicons name="pencil-outline" size={20} color='black'/>
                    </TouchableOpacity>
                    <TouchableOpacity 
                        style={styles.breadCrumb}
                        onPress={()=>updateShowComments(true)}>
                        <Text style={styles.crumbDesc}>Show Comments</Text>
                        <Ionicons 
                            style={styles.breadCrumbIcon} 
                            name='chatbox-outline' 
                            size={20} 
                            color='black'
                        />
                    </TouchableOpacity>
                </View>
            {}
            <View style={styles.relatedWrapper}>
                <Text style={styles.related}>Related</Text>
            </View>
            {/* <RecommendedList/> */}
        </View>
    )
}

export default ViewVideo;

const styles = StyleSheet.create({
    container: {
        backgroundColor:'white'
    },
    videoInfoWrapper: {

    },
    videoHeaders:{
        padding: 10
    },
    videoTitle: {
        fontSize:17
    },
    videoInfo: {
        fontSize:12,
        color:'gray'
    },
    crumbContainer: {
        justifyContent:'space-around',
        alignItems:'center',
        paddingBottom:5,
        borderColor: 'lightgray',
        borderBottomWidth: 1,
        flexDirection:'row',
    },
    breadCrumb: {
        paddingTop: 5,
        paddingBottom: 5,
        paddingHorizontal:10,
        borderRadius:15,
        overflow:'hidden',
        backgroundColor:'lightgray',
        position:'relative',
        flexDirection:'row'
    },
    breadCrumbIcon: {
        marginLeft:10
    },
    crumbDesc: {
        textAlign:'center',
        fontSize: 12
    },
    descriptionContainer: {

    },
    relatedWrapper: {
        paddingVertical:5,
        backgroundColor:'white',
        borderBottomWidth:1,
        borderColor:'black'
    },
    related: {
        fontSize:20,
        fontWeight:'bold',
        marginLeft: 20
    }


});
import { useRoute } from "@react-navigation/native";
import { ActivityIndicator, Dimensions, StyleSheet, Text, TouchableOpacity, View,  } from "react-native";
import YoutubeIframe from "react-native-youtube-iframe";
import { useState, useEffect } from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';
import RecommendedList from "../components/RecommendedList";
import { formatTimeAgo } from "../util/formatDate";
import { formatDuration } from "../util/formatTime";
import formatViews from "../util/formatViews";
import { getVideo } from "../axios/YouTube";
import { Globals } from "../globals/styles";
import CommentList from "../components/CommentList";
import Description from "../components/Description";
import {db} from '../firebaseConfig';
import {set, ref, get} from 'firebase/database';
import { useSelector } from "react-redux";
function ViewVideo() {
    const [showDescription, updateShowDescription] = useState<boolean>(false);
    const [showComments, updateShowComments] = useState<boolean>(false);
    const [videoContent, updateVideoContent] = useState<any>(null);
    const [loadRecommended, updateLoadRecommended] = useState(false);
    const {height, width} = Dimensions.get('window');
    const {videoId}:any = useRoute().params;
    const {authToken} = useSelector((store:any)=> store.auth);

    /* get the video information */
    useEffect(()=> {
        let mounted = true;
        let video = null;
        (async()=> {
            try {
                video = await getVideo(videoId);
                if(!mounted) return;
                updateVideoContent(video);
            } catch(error) {
                console.log('error fetching video information', error);
            }
            if(authToken !== null && video !== null){
                try {
                    const snapshot:any = await get(ref(db,`history/${authToken.uid}/${videoId}`));
                    if(!snapshot.exists()){
                        set(ref(db,`history/${authToken.uid}/${videoId}`),{
                            id:videoId,
                            channelTitle:video.snippet.channelTitle,
                            snippet: video.snippet
                        });
                    }
                } catch(error) {
                    console.log('unable to send information to firebase ',error);
                }
            }
        })();
        return ()=>{mounted = false}
    },[videoId]);

    /* get the feed 3 seconds after video is loaded*/
    useEffect(()=> {
        const timeout = setTimeout(()=> {
            updateLoadRecommended(true);
        },3000);
        return ()=> clearTimeout(timeout);
    },[]);

    /* post video into the firebase db to save to history */
 

    function onCloseComments():void{
        updateShowComments(false);
    }

    function onCloseDescription():void{
        updateShowDescription(false);
    }

    function renderContent() {

        if(showComments)
            return (
                <CommentList
                    videoId={videoId}
                    onClose={onCloseComments}
                />
            );
        if(showDescription)
            return (
                <Description
                    onClose={onCloseDescription}
                    description={videoContent.snippet.description}
                />
            )
        return (
            <>
                <View style={styles.crumbContainer}>
                    <TouchableOpacity onPress={()=>updateShowDescription(true)} style={styles.breadCrumb}>
                        <Text style={styles.crumbDesc}>Show Description</Text>
                        <Ionicons name="pencil-outline" size={15} color='black'/>
                    </TouchableOpacity>
                    <TouchableOpacity 
                        style={styles.breadCrumb}
                        onPress={()=>updateShowComments(true)}>
                        <Text style={styles.crumbDesc}>Show Comments</Text>
                        <Ionicons 
                            style={styles.breadCrumbIcon} 
                            name='chatbox-outline' 
                            size={15} 
                            color='black'
                        />
                    </TouchableOpacity>
                </View>
                <View style={styles.relatedWrapper}>
                    <Text style={styles.related}>Related</Text>
                </View>
                { !loadRecommended&& 
                    (<View style={{flex: 1, justifyContent:'center', alignItems:'center'}}>
                        <Text>Loading Recommended...</Text>
                    </View>)
                }
                {loadRecommended && <RecommendedList/>}
            </>
        )
    }


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
                            {`${formatViews(videoContent.statistics.viewCount)} views • Posted ${formatTimeAgo(videoContent.snippet.publishedAt)} ago • ${formatDuration(videoContent.contentDetails.duration)} duration`}
                        </Text>
                    </View> 
                )
            }
            {renderContent()}
        </View>
    )
}

export default ViewVideo;

const styles = StyleSheet.create({
    container: {
        backgroundColor:'white',
        flex: 1
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
    },



});
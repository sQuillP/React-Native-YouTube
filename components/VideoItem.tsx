import {View, Image, Text, StyleSheet, Dimensions, TouchableOpacity, } from 'react-native'
import Ionicons from '@expo/vector-icons/Ionicons';
import { videoData } from '../data/dummyData';
import { SearchResult } from '../models/Video';
import formatViews from '../util/formatViews';
import { formatTimeAgo } from '../util/formatDate';

/* Used for video feed */


function VideoItem({url, title, publishedAt, channelTitle, viewCount}:any):any {
    
    /**
     * 
     */
    return (
        <TouchableOpacity activeOpacity={0.6} style={styles.container}>
            {/* <View style={styles.imageContainer}> */}
            <Image style={styles.image} source={{uri:url}}/>
            {/* </View> */}
            <View style={styles.infoContainer}>
                <Text style={styles.title}>{title}</Text>
                <Text style={styles.infoData}>{`${channelTitle} • ${formatViews(viewCount)} views ${formatTimeAgo(publishedAt)} ago`}</Text>
            </View>
        </TouchableOpacity>
    )
}


export default VideoItem;

const styles = StyleSheet.create({
    container: {
        // flexDirection:'row',
        borderWidth:1,
        flex: 1,
        backgroundColor:'white'
    },
    imageContainer: {
        height: 150,
    },
    image: {
        height: Math.floor(Dimensions.get('window').height/3),
        width:'100%',
        resizeMode:'cover'
    },
    infoContainer: {
        paddingHorizontal: 5,
        paddingVertical:10,

    },
    title: {
        color:'black',
        fontSize: 15,
    },
    infoData: {
        color:'gray',
        fontSize:12,
    },

})
import {View, Image, Text, StyleSheet, Dimensions, TouchableOpacity, } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { formatTimeAgo } from '../util/formatDate';
import { useNavigation } from '@react-navigation/native';
import {memo} from 'react';

/* Used for video feed */


function VideoItem({url, title, publishedAt, channelTitle, videoId}:any):any {
    
    const navigator:any = useNavigation();

    function onNavigateVideo() {
        navigator.navigate('ViewVideo',{videoId});
    }

    return (
        <TouchableOpacity onPress={onNavigateVideo} activeOpacity={0.6} style={styles.container}>
            <Image style={styles.image} source={{uri:url}}/>
            <View style={styles.infoContainer}>
                <Text style={styles.title}>{title}</Text>
                <Text style={styles.infoData}>{`${channelTitle} • ${formatTimeAgo(publishedAt)} ago`}</Text>
            </View>
        </TouchableOpacity>
    )
}


export default memo(VideoItem);

const styles = StyleSheet.create({
    container: {
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

});
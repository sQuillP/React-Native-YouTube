import {View, Text, StyleSheet, Image} from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { formatTimeAgo } from '../util/formatDate';


interface CommentProps {
    profile:string,
    datePosted:string|Date,
    likes:number,
    content:string,
    channelName:string
};



function Comment({profile, likes, content, datePosted, channelName}:CommentProps) {

    // console.log({profile, likes, content, datePosted, channelName});

    return (
        <View style={styles.container}>
            <View style={styles.imageWrapper}>
                <Image style={styles.image} source={{uri: profile}}/>
            </View>
            <View style={styles.textWrapper}>
                <View style={styles.headerText}>
                    <Text style={styles.channel}>{channelName}</Text>
                    <Text style={styles.datePosted}>{formatTimeAgo(datePosted as string)}</Text>
                </View>
                <Text style={styles.content}>{content}</Text>
                <View style={styles.likeWrapper}>
                        <Ionicons name='caret-up-outline' size={25}/>
                        <Text style={styles.likeText}>{likes}</Text>
                </View>
            </View>
        </View>
    )
}

export default Comment;

const styles = StyleSheet.create({
    container: {
        paddingHorizontal:10,
        borderBottomColor:'gray',
        borderWidth:1
    },
    imageWrapper: {
        height:50,
        width: 50,
        overflow:'hidden',
        borderRadius:25,
    },
    image: {
        height:'100%',
        width:'100%',
        resizeMode:'cover'
    },
    textWrapper: {

    },
    headerText: {
        flexDirection:'row'
    },
    channel: {
        fontSize:10,
    },
    datePosted: {
        fontSize:10,
        color:'gray'
    },
    content: {
        fontSize:15
    },
    likeWrapper: {
        flexDirection:'row',
    },
    likeText:{
        marginLeft: 10
    }
});
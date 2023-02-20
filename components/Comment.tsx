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


function chopText(text:string, length:number):string {
    if(text.length < length)
        return text;
    return text.substring(0,length) + '...';
}


function Comment({profile, likes, content, datePosted, channelName}:CommentProps) {

    return (
        <View style={styles.container}>
            <View style={styles.imageWrapper}>
                <Image style={styles.image} source={{uri: profile}}/>
            </View>
            <View style={styles.textWrapper}>
                <View style={styles.headerText}>
                    <Text style={styles.channel}>{channelName + " "}</Text>
                    <Text style={styles.datePosted}>{formatTimeAgo(datePosted as string) + " ago"}</Text>
                </View>
                <View style={{flexDirection:'row'}}>
                    <Text style={styles.content}>{chopText(content,60)}</Text>
                </View>
                <View style={styles.likeWrapper}>
                        <Text style={styles.likeText}>{likes + ' likes'}</Text>
                </View>
            </View>
        </View>
    )
}

export default Comment;

const styles = StyleSheet.create({
    container: {
        padding:10,
        borderBottomColor:'lightgray',
        borderBottomWidth:1,
        flexDirection:'row',
        
    },
    imageWrapper: {
        height:45,
        width: 45,
        overflow:'hidden',
        borderRadius:45/2,
    },
    image: {
        height:'100%',
        width:'100%',
        resizeMode:'cover'
    },
    textWrapper: {
        width:'85%',
        paddingLeft: 10
    },
    headerText: {
        flexDirection:'row'
    },
    channel: {
        fontSize:12,
    },
    datePosted: {
        fontSize:12,
        color:'gray'
    },
    content: {
        fontSize:15,
        flexWrap:'wrap',
        flex: 1
    },
    likeWrapper: {
        flexDirection:'row',
        alignItems:'center'
    },
    likeText:{
        marginLeft: 10
    }
});
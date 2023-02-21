import { Image, StyleSheet, View, Text, Dimensions, TouchableOpacity } from "react-native";
import { memo } from "react";
import { chopString } from "../util/strings";
import { useNavigation } from "@react-navigation/native";
interface ISavedVideo {
    image:string,
    title:string,
    description:string,
    postedOn:string | Date,
    author:string,
    videoId:string
}


function SavedVideo({image, title, author, description, postedOn, videoId}:ISavedVideo):JSX.Element {

    const navigation:any = useNavigation();
    function onNavigate() {
        navigation.navigate('ViewVideo',{videoId});
    }

    return (
        <TouchableOpacity onPress={onNavigate} activeOpacity={0.7} style={styles.container}>
            <View>
                <Image style={styles.image} source={{uri: image}}/>
            </View>
            <View style={[styles.textContainer,{width: '70%'}]}>
                <Text style={styles.title}>{title}</Text>
                <Text style={styles.author}>{author}</Text>
            </View>
        </TouchableOpacity>
    );
}



export default SavedVideo;

const styles=StyleSheet.create({
    container: {
        padding: 10,
        flexDirection:'row'
    },
    image: {
        height:70,
        width: Dimensions.get('window').width*0.3,
        resizeMode:'cover',

    },
    textContainer: {
        paddingLeft:10,
    },
    title: {
        fontSize:15,
        flex: 1,
        flexWrap:'wrap'
    },
    author:{
        fontSize:12,
        color:'gray'
    },
    description: {
        fontSize:12,
        color:'gray',
        flex: 1,
        flexWrap:'wrap',
    }

});
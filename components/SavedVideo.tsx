import { Image, StyleSheet, View, Text, Dimensions } from "react-native";
import { chopString } from "../util/strings";
interface ISavedVideo {
    image:string,
    title:string,
    description:string,
    postedOn:string | Date,
    author:string
}


function SavedVideo({image, title, author, description, postedOn}:ISavedVideo):JSX.Element {

    return (
        <View style={styles.container}>
            <View>
                <Image style={styles.image} source={{uri: image}}/>
            </View>
            <View style={[styles.textContainer,{width: '70%'}]}>
                <Text style={styles.title}>{title}</Text>
                <Text style={styles.author}>{author}</Text>
            </View>
        </View>
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
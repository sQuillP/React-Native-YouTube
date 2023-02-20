import { Image, StyleSheet, View, Text } from "react-native";
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
            <View style={styles.textContainer}>
                <Text style={styles.title}>{title}</Text>
                <Text style={styles.author}>{author}</Text>
                <View style={{flexDirection:'row'}}>
                    <Text style={styles.description}>{chopString(description,45)}</Text>
                </View>

            </View>
        </View>
    );
}



export default SavedVideo;

const styles=StyleSheet.create({
    container: {
        padding: 10
    },
    image: {
        height:70,
        width: 70,
        resizeMode:'cover',

    },
    textContainer: {
        paddingLeft:10,
    },
    title: {
        fontSize:15,
    },
    author:{

    },
    description: {
        fontSize:12,
        color:'gray',
        flex: 1,
        flexWrap:'wrap',
    }

});

import {memo} from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';

interface RelatedVideoProps {
    url:string,
    title:string,
    description:string,
    publishedAt:string
};


function RelatedVideo({url, title, description, publishedAt}:RelatedVideoProps) {

    return (
        <View style={styles.container}>
            <Image source={{uri: url}} style={styles.image}/>
            <View style={styles.textWrapper}>
                <Text style={styles.header}>{title}</Text>
                <Text style={styles.description}>{description}</Text>
                {/* <Text style={styles.postedOn}>Posted on {publishedAt}</Text> */}
            </View>
        </View>
    )
}


export default memo(RelatedVideo);

const styles = StyleSheet.create({
    container: {
        padding: 10,
        borderBottomColor: 'lightgray',
        backgroundColor:'white',
        borderBottomWidth:1,
        flexDirection:'row',
        alignItems:'center'
    },
    image: {
        height: 50,
        width: 75,
        resizeMode: 'cover'
    },
    header: {
        fontSize:15,
    },
    description: {
        color:'gray',
        fontSize:12
    },
    textWrapper: {
        padding: 10
    },
    postedOn: {
        fontSize:10,
        color:'gray'
    }
});
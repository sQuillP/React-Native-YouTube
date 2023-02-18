
import {memo} from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';

interface RelatedVideoProps {
    url:string,
    title:string,
    description:string,
    publishedAt:string
};


function chopString(description:string, limit:number):string {
    if(description.length>limit)
        return description.substring(0,limit) + '...';
    return description;
}

function RelatedVideo({url, title, description, publishedAt}:RelatedVideoProps) {

    return (
        <View style={styles.container}>
            <Image source={{uri: url}} style={styles.image}/>
            <View style={styles.textWrapper}>
                <Text style={styles.header}>{chopString(title,33)}</Text>
                <Text style={styles.description}>{chopString(description,22)}</Text>
            </View>
        </View>
    )
}


export default RelatedVideo;

const styles = StyleSheet.create({
    container: {
        paddingVertical: 10,
        borderBottomColor: 'lightgray',
        backgroundColor:'white',
        borderBottomWidth:1,
        flexDirection:'row',
    },
    image: {
        height: 50,
        width: 75,
        resizeMode: 'cover',
    },
    header: {
        fontSize:13,
    },
    description: {
        color:'gray',
        fontSize:12,
    },
    textWrapper: {
        justifyContent:'flex-start',
        paddingLeft:5
    },
    postedOn: {
        fontSize:10,
        color:'gray'
    }
});
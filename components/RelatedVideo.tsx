
import { useNavigation } from '@react-navigation/native';
import {memo} from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';

interface RelatedVideoProps {
    url:string,
    title:string,
    description:string,
    publishedAt:string,
    videoId:string
};


function chopString(description:string, limit:number):string {
    if(description.length>limit)
        return description.substring(0,limit) + '...';
    return description;
}

function RelatedVideo({url, title, description, publishedAt, videoId}:RelatedVideoProps) {

    const navigation:any = useNavigation();

    function handleNavigation():void {
        navigation.navigate('ViewVideo', {videoId});
    }

    return (
        <TouchableOpacity activeOpacity={0.7} onPress={handleNavigation} style={styles.container}>
            <Image source={{uri: url}} style={styles.image}/>
            <View style={styles.textWrapper}>
                <Text style={styles.header}>{chopString(title,33)}</Text>
                <Text style={styles.description}>{chopString(description,22)}</Text>
            </View>
        </TouchableOpacity>
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
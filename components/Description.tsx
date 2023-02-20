import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import Ionicons from '@expo/vector-icons/Ionicons';


interface DescriptionProps {
    description:string,
    onClose:()=>void
}


function Description({onClose, description}:DescriptionProps) {

    return(
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerText}>Description</Text>
                <Pressable onPress={onClose}>
                    <Ionicons name='close-outline' size={30}/>
                </Pressable>
            </View>
            <ScrollView style={styles.contentWrapper}>
                <Text style={styles.description}>{description}</Text>
            </ScrollView>
        </View>
    )
}



export default Description;


const styles= StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        padding: 10,
        flexDirection:'row',
        justifyContent:'space-between',
        borderColor:'lightgray',
        borderTopWidth: 2,
        borderBottomWidth: 2,
        alignItems:'center'
    },
    headerText: {
        fontWeight:'bold'
    },
    contentWrapper: {
        flex: 1
    },
    description: {
        padding:15
    }
    
});
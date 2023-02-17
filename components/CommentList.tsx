import { useEffect, useRef, useState } from "react";
import { FlatList, Text, View } from "react-native";



function CommentList() {
    const [comments, updateComments] = useState([]);
    const [loadingComments, updateLoadingComments] = useState(false);
    useEffect(()=> {
        let mounted = true;

        return ()=> {mounted = false};
    },[])

    return (
        // <FlatList
        //     data={}
        
        // />
        <View>
            <Text>Foo text</Text>
        </View>
    )

}
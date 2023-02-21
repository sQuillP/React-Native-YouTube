import {View, Text, TouchableWithoutFeedback, Keyboard, StyleSheet, ActivityIndicator, TextInput }from 'react-native'
import { useSelector } from 'react-redux';
import BlockedView from '../components/BlockedView';
import SavedVideoList from '../components/SavedVideoList';
import { Globals } from '../globals/styles';
import { useEffect, useState } from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';
import useDebounce from '../hooks/useDebounce';
import { db } from '../firebaseConfig';
import {ref, set, get} from "firebase/database";


function History() {

    const {loading, authToken} = useSelector((store:any)=> store.auth);
    const [searchTerm, updateSearchTerm] = useState<string>('');
    const debouncedTerm = useDebounce(searchTerm,1000);
    const [videoStorage, updateVideoStorage] = useState<any>([]);
    const [searchedVideos, updateSearchedVideos] = useState<any>([]);
    const [loadingVideos, updateLoadingVideos] = useState<boolean>(false);


    useEffect(()=> {
        
    },[debouncedTerm]);

    useEffect(()=> {
        //make firebase api call here
        if(!authToken) return;
        updateLoadingVideos(true);
        (async ()=> {
            try {
                const snapshot = await get(ref(db,`/history/${authToken.uid}`));
                if(snapshot.exists()){
                    const result = snapshot.val();
                    const videosArr:any = [];
                    for(const id of Object.keys(result))
                        videosArr.push(result[id]);
                    updateVideoStorage([...videosArr]);
                    updateSearchedVideos([...videosArr]);
                } 
            } catch(error){
                console.log('Cannot fetch firebase data',error);
            } finally {
                updateLoadingVideos(false);
            }
        })();
       


    },[authToken]);


    function handleChangeText() {

    }


    return (
            <View style={{flex: 1, backgroundColor:'white'}}>
                {!loading && !authToken &&(<BlockedView type='History'/>)}
                {
                !!loading && (
                    <View style={styles.loader}>
                        <ActivityIndicator color={Globals.youtube_red} size='large'/>
                        <Text style={{textAlign:'center'}}>Authenticating..</Text>
                    </View>
                )}
                {
                    !!authToken &&(
                        <View style={{flex: 1}}>
                            <View style={styles.searchContainer}>
                                <View style={styles.inputWrapper}>
                                    <Ionicons 
                                        size={20} 
                                        name='search-outline' 
                                        color='gray'
                                        style={styles.icon}    
                                    />
                                    <TextInput
                                        onChangeText={handleChangeText}
                                        value={searchTerm}
                                        style={styles.searchInput}
                                        placeholder='Search Watch History'
                                    />
                                </View>
                            </View>
                            {
                                !!loadingVideos && (
                                    <View style={styles.loader}>
                                        <ActivityIndicator color={Globals.youtube_red} size='large'/>
                                        <Text style={{textAlign:'center'}}>Fetching History</Text>
                                    </View>
                                )
                            }
                            {
                                !videoStorage.length && !loadingVideos &&(
                                    <View style={{flex: 1, justifyContent:'center', alignItems:'center'}}>
                                        <Text style={{fontSize: 25, color:'lightgray', textAlign:'center'}}>Empty History</Text>
                                    </View>
                                )
                            }
                            {
                                !!videoStorage.length && !loadingVideos && (
                                    <SavedVideoList
                                        videos={videoStorage}
                                    />
                                )
                            }
                        </View>
                    )
                }
            </View>
    )
}


export default History;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:'white'
    },
    searchContainer: {
        backgroundColor:'white',
        paddingVertical:5
    },
    loader: {
        flex: 1,
        justifyContent:'center',
        alignItems:'center',
    },
    searchInput: {
        flex: 1,
    },
    icon: {
        marginHorizontal:5
    },
    inputWrapper: {
        flexDirection:'row',
        alignItems:'center',
        padding:5,
        backgroundColor:'lightgray',
        borderRadius: 20,
        overflow:'hidden'
    },

});
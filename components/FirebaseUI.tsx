import {View, ActivityIndicator, Text, TextInput, StyleSheet} from 'react-native';
import BlockedView from './BlockedView';
import Ionicons from '@expo/vector-icons/Ionicons';
import SavedVideoList from './SavedVideoList';
import { Globals } from '../globals/styles';
import { VideoResult } from '../models/Video';
import {useState, useEffect} from 'react';
import useDebounce from '../hooks/useDebounce';


interface IFirebaseUI {
    loading:boolean, 
    authToken:any,
    loadingVideos:boolean,
    videoStorage:VideoResult[],
    type:string
}


function FirebaseUI({loading, authToken,loadingVideos,videoStorage, type}:IFirebaseUI) {

    const [searchTerm, updateSearchTerm] = useState<string>('');
    const [searchedVideos, updateSearchedVideos] = useState<VideoResult[]>(videoStorage);
    const debouncedTerm = useDebounce(searchTerm, 1000);

    useEffect(()=> {
        console.log('should search');
        if(!searchTerm.trim()){
            updateSearchedVideos(videoStorage);
        }
        else {
            const matchedVideos = videoStorage.filter((video:VideoResult)=> {
                return video.snippet.title.toLowerCase().includes(searchTerm)
            });
            updateSearchedVideos(matchedVideos);
        }
    },[debouncedTerm]);
    
    function handleChangeText(text:string) {
        updateSearchTerm(text);
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
                                    placeholder='Search a Video Title'
                                />
                            </View>
                        </View>
                        {
                            !!loadingVideos && (
                                <View style={styles.loader}>
                                    <ActivityIndicator color={Globals.youtube_red} size='large'/>
                                    <Text style={{textAlign:'center'}}>Fetching {type}</Text>
                                </View>
                            )
                        }
                        {
                            !searchedVideos.length && !loadingVideos &&(
                                <View style={{flex: 1, justifyContent:'center', alignItems:'center'}}>
                                    <Text style={{fontSize: 25, color:'lightgray', textAlign:'center'}}>Empty Results</Text>
                                </View>
                            )
                        }
                        {
                            !!searchedVideos.length && !loadingVideos && (
                                <SavedVideoList
                                    videos={searchedVideos}
                                />
                            )
                        }
                    </View>
                )
            }
        </View>
    )
}

export default FirebaseUI;



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
import {View, Text, TouchableWithoutFeedback, Keyboard, StyleSheet, ActivityIndicator }from 'react-native'
import { useSelector } from 'react-redux';
import BlockedView from '../components/BlockedView';
import SavedVideoList from '../components/SavedVideoList';
import { Globals } from '../globals/styles';
import { useEffect } from 'react';


function History() {

    const {loading, authToken} = useSelector((store:any)=> store.auth);

    useEffect(()=> {
        console.log('auth token ? ', authToken);
        console.log(authToken.uid);
    },[authToken])

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={{flex: 1}}>

                {!loading && !authToken &&(<BlockedView type='History'/>)}
                {loading && (
                    <View style={styles.loader}>
                        <ActivityIndicator color={Globals.youtube_red} size='large'/>
                        <Text style={{textAlign:'center'}}>Authenticating..</Text>
                    </View>
                )}
                {
                    authToken && (
                        <View>
                            
                        </View>
                    )
                }
            </View>
        </TouchableWithoutFeedback>

    )
}


export default History;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:'white'
    },
    loader: {
        flex: 1,
        justifyContent:'center',
        alignItems:'center',

    }
});
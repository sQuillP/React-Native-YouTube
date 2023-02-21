import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { db } from '../firebaseConfig';
import {ref, onValue, DataSnapshot } from "firebase/database";
import FirebaseUI from '../components/FirebaseUI';
import { VideoResult } from '../models/Video';


function formatDBResponse(data:any):VideoResult[] {
    const videosArr:VideoResult[] = [];
    for(const id of Object.keys(data))
        videosArr.push(data[id]);
    return videosArr;
}


function History() {

    const {loading, authToken} = useSelector((store:any)=> store.auth);
    const [videoStorage, updateVideoStorage] = useState<any>([]);
    const [loadingVideos, updateLoadingVideos] = useState<boolean>(false);


    useEffect(():any=> {
        //make firebase api call here
        if(!authToken) return;
        updateLoadingVideos(true);

        return onValue(ref(db,`history/${authToken.uid}`),(snapshot:DataSnapshot)=> {
            updateLoadingVideos(false);
            if(!snapshot.exists()) return;
            console.log('ONVALUE video storage')
            updateVideoStorage(formatDBResponse(snapshot.val()));
        });
    },[authToken]);


    return (
          <FirebaseUI 
            loading={loading}
            authToken={authToken}
            loadingVideos={loadingVideos}
            videoStorage={videoStorage}
            type='History'
          /> 
    )
}


export default History;


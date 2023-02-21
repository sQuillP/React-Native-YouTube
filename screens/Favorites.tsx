import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import {db} from '../firebaseConfig';
import {ref, get, onValue, DataSnapshot, DatabaseReference} from 'firebase/database';
import { VideoResult } from "../models/Video";
import FirebaseUI from "../components/FirebaseUI";


function formatDbResponse(data:any):VideoResult[] {
    const formattedResult = [];
    for(const key of Object.keys(data)) {
        formattedResult.push(data[key]);
    }
    return formattedResult;
}


function Favorites() {

    const {authToken, loading} = useSelector((store:any)=> store.auth);
    const [videoStorage, updateVideoStorage] = useState<VideoResult[]>([])
    const [loadingVideos, updateLoadingVideos] = useState<boolean>(false);
    
    useEffect(():any=> {
        console.log('in useeffect');
        if(!authToken) return;
        updateLoadingVideos(true);
        const dataRef:DatabaseReference = ref(db,`liked/${authToken.uid}`);

        //unsubscribe from listening changes in the rtdb;
        return onValue(dataRef, (snapshot:DataSnapshot)=> {
            updateLoadingVideos(false);
            if(!snapshot.exists()) return;
            const formattedData = formatDbResponse(snapshot.val());
            console.log(Object.keys(snapshot.val()));
            updateVideoStorage(formattedData);
        });
    },[authToken]);
    

    return (
        <FirebaseUI
            loading={loading}
            authToken={authToken}
            loadingVideos={loadingVideos}
            videoStorage={videoStorage}
            type='Favorites'
        />
    );
}


export default Favorites;

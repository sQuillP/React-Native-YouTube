import {createAsyncThunk} from '@reduxjs/toolkit';

import { searchVideo } from '../../axios/YouTube';
import { getFeed } from '../../axios/YouTube';


export const searchVideos = createAsyncThunk('search/findVideos',async (term:string,{rejectWithValue})=> {
    const videos = await searchVideo(term,25);
    if(videos === null)
        return rejectWithValue([]);
    return videos;
});


export const getFeedThunk = createAsyncThunk('search/feed', async (results:number, {rejectWithValue})=> {
    const videos = await getFeed(results);
    if(videos === null)
        return rejectWithValue([]);
    return videos;
})
import {createSlice} from '@reduxjs/toolkit';
import { VideoResult } from '../../models/Video';
import { getFeedThunk, searchVideos } from '../thunk/searchVideos';


interface SearchState  {
    videos: VideoResult[]
    loading:boolean
};

const initialState:SearchState = {
    videos:[],
    loading: false
}

const searchSlice = createSlice({
    name:'search',
    initialState,
    reducers:{},
    extraReducers: (builder)=> {
        builder.addCase(searchVideos.fulfilled,(state,action)=> {
            state.videos = action.payload;
        });

        builder.addCase(getFeedThunk.pending, (state,action)=> {
            state.loading = true;
        })
        builder.addCase(getFeedThunk.fulfilled,(state,action)=> {
            state.videos = action.payload;
            state.loading = false;
        });
        
    }
});


export default searchSlice.reducer
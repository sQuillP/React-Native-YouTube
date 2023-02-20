import { createSlice } from "@reduxjs/toolkit";
import { login, signup } from "../thunk/auth";

interface IInitialState {
    authToken: any,
    loading: boolean,
};

const initialState:IInitialState = {
    authToken: null,
    loading:false,
}


const authSlice = createSlice({
    name:'auth',
    initialState,
    reducers:{
        logout:(state)=> {
            state.authToken = null;
        }
    },
    extraReducers:(builder)=> {
        builder.addCase(login.pending,(state,action)=> {
            state.loading = true;
        });
        builder.addCase(login.rejected, (state)=> {
            state.loading = false;
            state.authToken = null;
        });
        builder.addCase(login.fulfilled,(state,action)=> {
            console.log('fulfilled user: ',action.payload);
            state.authToken = action.payload;
            state.loading = false;
        });
        builder.addCase(signup.pending,(state)=> {
            state.loading = true;
        });
        builder.addCase(signup.fulfilled,(state,action)=> {
            console.log('fulfilled user: ',action.payload);
            state.authToken = action.payload;
            state.loading = false;
        });
        builder.addCase(signup.rejected, (state)=> {
            state.loading = false;
            state.authToken = null;
        });

    }
});


export const {logout} = authSlice.actions;
export default authSlice.reducer;
import { createSlice } from "@reduxjs/toolkit";
import { login, signout, signup } from "../thunk/auth";

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
        accessStoredToken:(state,action)=> {
            console.log('should login user with valid credentials');
            state.authToken = action.payload;
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
            console.log('fulfilled user ');
            state.authToken = action.payload;
            state.loading = false;
        });
        builder.addCase(signup.pending,(state)=> {
            state.loading = true;
        });
        builder.addCase(signup.fulfilled,(state,action)=> {
            console.log('fulfilled user ');
            state.authToken = action.payload;
            state.loading = false;
        });
        builder.addCase(signup.rejected, (state)=> {
            state.loading = false;
            state.authToken = null;
        });

        builder.addCase(signout.pending,(state)=> {
            state.loading = true;
        });

        builder.addCase(signout.fulfilled,(state,action)=> {
            state.loading = false;
            state.authToken = action.payload;
        });

        builder.addCase(signout.rejected,(state,action)=> {
            state.loading = false;
            state.authToken = action.payload;
        })

    }
});


export const {accessStoredToken} = authSlice.actions;
export default authSlice.reducer;
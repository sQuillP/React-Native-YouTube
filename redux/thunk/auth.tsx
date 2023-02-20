import { createAsyncThunk } from "@reduxjs/toolkit";
import {auth} from '../../firebaseConfig';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";

interface ILogin {
    email:string,
    password:string
};


export const login = createAsyncThunk("auth/login", async ({email, password}:ILogin, {rejectWithValue})=> {
    try {
       const {user}:any = await signInWithEmailAndPassword(auth,email,password);
       console.log('fetched user',user);
       return user;
    } catch(error) {
        return rejectWithValue(null);
    }
});


export const signup = createAsyncThunk("auth/signup", async ({email, password}:ILogin, {rejectWithValue})=> {
    try {
        const {user} = await createUserWithEmailAndPassword(auth, email, password);
        console.log('fetched user', user);
        return user;

    } catch(error) {
        return rejectWithValue(null);
    }
})
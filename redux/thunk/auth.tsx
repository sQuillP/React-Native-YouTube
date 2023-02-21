import { createAsyncThunk } from "@reduxjs/toolkit";
import {auth} from '../../firebaseConfig';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import AsyncStorage from '@react-native-async-storage/async-storage'
import { signOut } from "firebase/auth";
interface ILogin {
    email:string,
    password:string
};


export const login = createAsyncThunk("auth/login", async ({email, password}:ILogin, {rejectWithValue})=> {
    try {
       const {user}:any = await signInWithEmailAndPassword(auth,email,password);
       console.log('fetched user',user);
       await AsyncStorage.setItem("TOKEN",JSON.stringify(user));
       return user;
    } catch(error) {
        console.log('unable to sign in, ERROR: ',error);
        return rejectWithValue(null);
    }
});


export const signup = createAsyncThunk("auth/signup", async ({email, password}:ILogin, {rejectWithValue})=> {
    try {
        const {user} = await createUserWithEmailAndPassword(auth, email, password);
        console.log('fetched user', user);
        await AsyncStorage.setItem("TOKEN",JSON.stringify(user));
        return user;

    } catch(error) {
        console.log('invalid signup ERROR: ',error);
        return rejectWithValue(null);
    }
});


export const signout = createAsyncThunk("auth/signout", async(undefined , {rejectWithValue})=> {
    try {
        await AsyncStorage.setItem("TOKEN",'');
        await signOut(auth);
        return null;
    } catch (error) {
        return rejectWithValue(null);
    }
})
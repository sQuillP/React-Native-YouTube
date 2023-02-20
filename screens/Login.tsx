import { Keyboard,StyleSheet, TextInput, TouchableWithoutFeedback, View, Text, TouchableOpacity, ScrollView, Image, Platform } from "react-native";

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Formik } from 'formik';
import * as Yup from 'yup';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Globals } from "../globals/styles";
import { useDispatch, useSelector } from "react-redux";
import { login, signup } from "../redux/thunk/auth";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useState } from "react";

const loginSchema = Yup.object().shape({
    email: Yup
            .string()
            .email()
            .required("Please provide an email"),

    password: Yup
                .string()
                .matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/g,'Must have 8 Characters, uppercase, and lowercase')
                .required('Please enter password')
});

const initialValue = {
    email:'',
    password:''
}

function Login() {

    const dispatch:any = useDispatch();
    const navigation:any = useNavigation();
    const { authMode }:any = useRoute().params || "signin";
    const [signInMode, updateSigninMode] = useState(authMode);

    async function onSubmit(values:any) {
        console.log('submitting',values);
        if(signInMode ==='signin')
            dispatch(login({email:values.email, password: values.password}));
        else 
            dispatch(signup({email:values.email, password:values.password}));

        navigation.goBack();
    }

    function onHandleSigninChange() {
        if(signInMode ==='signup')
            updateSigninMode('signin');
        else
            updateSigninMode('signup');
    }

    return (
        <TouchableWithoutFeedback 
                    accessible={false} 
                    onPress={Keyboard.dismiss}
                >
        <View style={{flex: 1, backgroundColor:'white'}}>

            <KeyboardAwareScrollView style={{flex: 1}}>
                        <Formik
                            initialValues={initialValue}
                            validationSchema={loginSchema}
                            onSubmit={onSubmit}
                            validate={(values,)=> { console.log(values)}}
                        >
                            {({values, touched, errors, handleChange, handleSubmit})=> {
                                return (
                                    <View style={styles.container}>
                                        <View style={styles.header}>
                                            <Text style={styles.headerText}>{signInMode ==='signin'?'Sign in to your account':'Create account'}</Text>
                                            <Image style={styles.image} source={require("../assets/youtube-logo.png")}/>
                                        </View>
                                        <View style={styles.form}>
                                            <View>
                                                <Text style={styles.label}>Email</Text>
                                                <View style={styles.inputWrapper}>
                                                    <Ionicons style={styles.icon} name="at-outline" size={20} color='black'/>
                                                    <TextInput
                                                        value={values.email}
                                                        onChangeText={handleChange('email')}
                                                        style={styles.input}
                                                        placeholder="bob@gmail.com"
                                                    />
                                                </View>
                                                {errors.email && touched.email && (<Text style={{color:Globals.youtube_red, textAlign:'center'}}>{errors.email}</Text>)}
                                            </View>
                                            <View>
                                                <Text style={styles.label}>Password</Text>
                                                <View style={styles.inputWrapper}>
                                                    <Ionicons style={styles.icon} name="lock-closed-outline" size={20} color='black'/>
                                                    <TextInput 
                                                        textContentType='password'
                                                        secureTextEntry={true}
                                                        value={values.password} 
                                                        onChangeText={handleChange('password')} 
                                                        style={styles.input} 
                                                    />
                                                </View>
                                                {touched.password && errors.password && <Text style={{color:Globals.youtube_red, textAlign:'center'}}>{errors.password}</Text>}
                                            </View>
                                        </View>
                                        <View style={styles.buttons}>
                                            <TouchableOpacity activeOpacity={0.6} style={[styles.button, styles.signIn]} onPress={handleSubmit as any}>
                                                <Text style={styles.buttonText}>{signInMode==='signin'?'Sign in':'Sign up'}</Text>
                                            </TouchableOpacity>
                                            <TouchableOpacity activeOpacity={0.6} style={[styles.button, styles.switchMode]} onPress={onHandleSigninChange}>
                                                <Text style={styles.buttonText}>{signInMode==='signin'?'Switch to Sign up':'Switch to sign in'}</Text>
                                            </TouchableOpacity>
                                        </View>

                                    </View>
                                )
                            }}
                        </Formik>
            </KeyboardAwareScrollView>
        </View>
        </TouchableWithoutFeedback>

    )
}

export default Login;



const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:'white',
        justifyContent:'flex-start',
        alignItems:'center'
    },
    header: {
        marginTop:50,
        justifyContent:'center',
        alignItems:'center',
    },
    headerText: {
        textAlign:'center',
        fontSize:25
    },
    image: {
        height: 150,
        width: 150,
        resizeMode:'cover',
    },
    form: {
        width:'80%'
    },
    label: {
        fontSize:12,
        color:'gray'
    },
    inputWrapper: {
        flexDirection:'row',
        alignItems:'center',
        backgroundColor:'lightgray',
        borderRadius: 20,
        overflow:'hidden',

    },
    input: {
        flex:1,
        paddingVertical:5,
        paddingHorizontal:10,
    },
    icon: {
        marginLeft:10
    },
    button: {
        paddingVertical: 5,
        borderRadius: 20,
        marginBottom: 10,
        justifyContent:'center',
        width: '60%'
    },
    buttons: {
        marginTop: 20,
        width: '100%',
        alignItems:'center'
    },
    signIn: {
        backgroundColor:Globals.youtube_red,
    },
    switchMode: {
        backgroundColor:'lightgray'
    },
    buttonText: {
        textAlign:'center',
        fontSize: 20,
        color:'white'
    }
})
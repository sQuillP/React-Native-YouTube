import { useNavigation } from "@react-navigation/native"
import { StyleSheet, View, Text,  Image,
    TouchableOpacity, TouchableWithoutFeedback, Keyboard, ScrollView} from "react-native"
import { Globals } from "../globals/styles";
import {useState} from 'react';

interface IBlockedView {
    type:string
};


function BlockedView({type}:IBlockedView):JSX.Element {

    const navigation:any  = useNavigation();

    const [loginPressed, updateLoginPressed] = useState(false);
    const [signupPressed, updateSignupPressed] = useState(false);

    function onLogin() {
        navigation.navigate('Login', {authMode:'signin'});
    }

    function onSignup():void{
        navigation.navigate('Login',{authMode: 'signup'});
    }

    


    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <ScrollView contentContainerStyle={{flex: 1}}>
                <View style={styles.container}>
                    <Text style={styles.title}>Sign in or Sign up to View {type}</Text>
                    <Image style={styles.image} source={require("../assets/youtube-logo.png")}/>
                    <View style={styles.buttons}>
                        <TouchableOpacity 
                            activeOpacity={0.7} 
                            style={[styles.button, styles.login]} 
                            onPress={onLogin}
                        >
                            <Text style={[styles.btnText, {color:'black'}]}>Login</Text>
                        </TouchableOpacity>
                        <TouchableOpacity 
                            activeOpacity={0.7} 
                            onPress={onSignup} 
                            style={[styles.button, styles.signup]}
                        >
                            <Text style={[styles.btnText, {color:'white'}]}>Signup</Text>
                        </TouchableOpacity>
                    </View>
                </View>
             </ScrollView>
        </TouchableWithoutFeedback>

    )
}

export default BlockedView;



const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent:'space-around',
        alignItems:'center',
        backgroundColor:'white'
    },
    buttons: {
        width: '60%'
    },
    title: {
        fontSize:25,
        textAlign:'center',
        width:'75%',
        fontFamily:'sans-serif'
    },
    image: {
        height: 150,
        width: 150,
        resizeMode: 'cover',
    },
    button: {
        paddingVertical: 10,
        borderRadius: 30,
        marginBottom:20,
        width:'100%'
    },
    login: {
        backgroundColor:'lightgray'
    },
    signup: {
        backgroundColor:Globals.youtube_red
    },
    btnText: {
        fontWeight:'bold',
        textAlign:'center'
    }

})
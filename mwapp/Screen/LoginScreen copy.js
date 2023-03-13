// Example of Splash, Login and Sign Up in React Native
// https://aboutreact.com/react-native-login-and-signup/

// Import React and Component
import React, { useState, createRef } from 'react';
import {
    StyleSheet,
    TextInput,
    View,
    Text,
    ScrollView,
    Image,
    Keyboard,
    TouchableOpacity,
    KeyboardAvoidingView,
} from 'react-native';
import { Platform } from 'react-native';

export const baseUrl = Platform.OS === 'android' ?
    'http://10.0.2.2:3001/login'
    :
    'http://localhost:3001/login';

import AsyncStorage from '@react-native-async-storage/async-storage';

import Loader from './Components/Loader';

const LoginScreen = ({ navigation }) => {
    const [userEmail, setUserEmail] = useState('');
    const [userPassword, setUserPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [errortext, setErrortext] = useState('');
    const [clientId, setClientId] = useState()
    const [client, setClient] = useState()
    const [clientName, setClientName] = useState()
    const [clientEmail, setClientEmail] = useState()
    const [sprovider, setSprovider] = useState()

    const passwordInputRef = createRef();

    const handleSubmitPress = () => {
        setErrortext('');
        if (!userEmail) {
            alert('Please fill Email');
            return;
        }
        if (!userPassword) {
            alert('Please fill Password');
            return;
        }
        setLoading(true);
        let dataToSend = { email: userEmail, password: userPassword };
        let formBody = [];
        for (let key in dataToSend) {
            let encodedKey = encodeURIComponent(key);
            let encodedValue = encodeURIComponent(dataToSend[key]);
            formBody.push(encodedKey + '=' + encodedValue);
        }
        formBody = formBody.join('&');

        fetch(baseUrl, {
            // fetch('http://localhost:3000/api/user/login', {
            method: 'POST',
            // body: formBody,
            // body: dataToSend,
            body: JSON.stringify({
                user: {
                    "email": userEmail,
                    "password": userPassword
                },
            }),
            headers: {
                //Header Defination
                'Content-Type':
                    'application/json',
                // 'application/x-www-form-urlencoded;charset=UTF-8'
            },
        })
            // .then((response) => response.json())
            // .then((responseJson) => {
            //     setLoading(false);
            //     console.log(responseJson);
            //     if (responseJson.status === 'success') {
            //         AsyncStorage.setItem('user_id', responseJson.data.email);
            //         console.log(responseJson.data.email);
            //         navigation.replace('DrawerNavigationRoutes');
            //     } else {
            //         setErrortext(responseJson.msg);
            //         console.log('Please check your email id or password');
            //     }
            // })
            .then((res) => {
                if (res.ok) {
                    console.log('res', res)
                    console.log(res.headers.get("Authorization"));
                    AsyncStorage.setItem("token", res.headers.get("Authorization"));
                    // setClientId(res.id)
                    // navigation.navigate('DrawerNavigationRoutes', { 'clientId': res.id });
                    //   setLoggedIn(true);
                    // onCloseSignupModal()
                    return res.json();
                } else {
                    console.log('Error login')
                    //   onCloseSignupModal()
                    throw new Error(res);
                }
            })
            .then((data) => {
                setClientId(data.data.id)
                console.log('data', data.data);
                // setClientId(res.id)

                if (data.data.usertype === 'client') {
                    setClient(true)
                    setClientName(data.data.first_name)
                    setClientEmail(data.data.email)
                }
                else if (data.data.usertype === 'sprovider') {
                    setSprovider(true)
                } else if (data.data.usertype === 'admin') {
                    setAdmin(true)
                }
                navigation.navigate('DrawerNavigationRoutes', {
                    clId: data.data.id,
                    email: data.data.email,
                    firstName: data.data.first_name,
                });
            })
            .catch((error) => {
                //Hide Loader
                setLoading(false);
                console.error(error);
            });
    };

    return (
        <View style={styles.mainBody}>
            <Loader loading={loading} />
            <ScrollView
                keyboardShouldPersistTaps="handled"
                contentContainerStyle={{
                    flex: 1,
                    justifyContent: 'center',
                    alignContent: 'center',
                }}>
                <View>
                    <KeyboardAvoidingView enabled>
                        <View style={{ alignItems: 'center' }}>
                            <Image
                                source={require('../Image/aboutreact.png')}
                                style={{
                                    width: '50%',
                                    height: 100,
                                    resizeMode: 'contain',
                                    margin: 30,
                                }}
                            />
                        </View>
                        <View style={styles.SectionStyle}>
                            <TextInput
                                style={styles.inputStyle}
                                onChangeText={(UserEmail) =>
                                    setUserEmail(UserEmail)
                                }
                                placeholder="Enter Email" //dummy@abc.com
                                placeholderTextColor="#8b9cb5"
                                autoCapitalize="none"
                                keyboardType="email-address"
                                returnKeyType="next"
                                onSubmitEditing={() =>
                                    passwordInputRef.current &&
                                    passwordInputRef.current.focus()
                                }
                                underlineColorAndroid="#f000"
                                blurOnSubmit={false}
                            />
                        </View>
                        <View style={styles.SectionStyle}>
                            <TextInput
                                style={styles.inputStyle}
                                onChangeText={(UserPassword) =>
                                    setUserPassword(UserPassword)
                                }
                                placeholder="Enter Password" //12345
                                placeholderTextColor="#8b9cb5"
                                keyboardType="default"
                                ref={passwordInputRef}
                                onSubmitEditing={Keyboard.dismiss}
                                blurOnSubmit={false}
                                secureTextEntry={true}
                                underlineColorAndroid="#f000"
                                returnKeyType="next"
                            />
                        </View>
                        {errortext != '' ? (
                            <Text style={styles.errorTextStyle}>
                                {errortext}
                            </Text>
                        ) : null}
                        <TouchableOpacity
                            style={styles.buttonStyle}
                            activeOpacity={0.5}
                            onPress={handleSubmitPress}>
                            <Text style={styles.buttonTextStyle}>LOGIN</Text>
                        </TouchableOpacity>
                        <Text
                            style={styles.registerTextStyle}
                            onPress={() => navigation.navigate('RegisterScreen')}>
                            New Here ? Register
                        </Text>
                    </KeyboardAvoidingView>
                </View>
            </ScrollView>
        </View>
    );
};
export default LoginScreen;

const styles = StyleSheet.create({
    mainBody: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#307ecc',
        alignContent: 'center',
    },
    SectionStyle: {
        flexDirection: 'row',
        height: 40,
        marginTop: 20,
        marginLeft: 35,
        marginRight: 35,
        margin: 10,
    },
    buttonStyle: {
        backgroundColor: '#7DE24E',
        borderWidth: 0,
        color: '#FFFFFF',
        borderColor: '#7DE24E',
        height: 40,
        alignItems: 'center',
        borderRadius: 30,
        marginLeft: 35,
        marginRight: 35,
        marginTop: 20,
        marginBottom: 25,
    },
    buttonTextStyle: {
        color: '#FFFFFF',
        paddingVertical: 10,
        fontSize: 16,
    },
    inputStyle: {
        flex: 1,
        color: 'white',
        paddingLeft: 15,
        paddingRight: 15,
        borderWidth: 1,
        borderRadius: 30,
        borderColor: '#dadae8',
    },
    registerTextStyle: {
        color: '#FFFFFF',
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 14,
        alignSelf: 'center',
        padding: 10,
    },
    errorTextStyle: {
        color: 'red',
        textAlign: 'center',
        fontSize: 14,
    },
});

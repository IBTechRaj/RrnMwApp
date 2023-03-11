// Example of Splash, Login and Sign Up in React Native
// https://aboutreact.com/react-native-login-and-signup/

// Import React and Component
import React, { useState, createRef } from 'react';
import {
    StyleSheet,
    TextInput,
    View,
    Text,
    Image,
    KeyboardAvoidingView,
    Keyboard,
    TouchableOpacity,
    ScrollView,
    Button,
} from 'react-native';
import { isBefore, setHours, setMinutes, addMinutes, format } from 'date-fns'
import DateTimePicker from '@react-native-community/datetimepicker';
import SelectDropdown from 'react-native-select-dropdown'


import AsyncStorage from '@react-native-async-storage/async-storage';
import { Platform } from 'react-native';

// export const signupUrl = Platform.OS === 'android' ?
//     'http://10.0.2.2:3001/signup'
//     :
//     'http://localhost:3001/signup';
// export const emailUrl = Platform.OS === 'android' ?
//     'http://10.0.2.2:3001/contacts'
//     :
//     'http://localhost:3001/contacts';

import Loader from './Components/Loader';

const RegisterScreen = (props) => {

    const genders = ['Female', 'Male', 'Other']
    // const [open, setOpen] = useState(false);
    // const [value, setValue] = useState(['0', '1', '2']);
    // const [items, setItems] = useState([
    //     { label: 'Femail', value: '0' },
    //     { label: 'Male', value: '1' },
    //     { label: 'Other', value: '2' }
    // ]);

    const [isPickerShow, setIsPickerShow] = useState(false);
    const [userEmail, setUserEmail] = useState('');
    const [userPassword, setUserPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [gender, setGender] = useState('');
    const [dob, setDob] = useState('');
    const [mobile, setMobile] = useState('');
    const [pincode, setPincode] = useState('');
    const [loading, setLoading] = useState(false);
    const [errortext, setErrortext] = useState('');
    const [isRegistraionSuccess, setIsRegistraionSuccess] = useState(false);

    const showPicker = () => {
        setIsPickerShow(true);
    };

    const onDobChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        console.log('d', currentDate, dob)
        if (Platform.OS === 'android') {
            console.log('da', currentDate, dob)
            setIsPickerShow(false)
        }
        if (event.type === 'neutralButtonPressed') {
            console.log('dn', currentDate, dob)
            setDob(new Date(0));
            setIsPickerShow(false)
        } else {
            setDob(currentDate);
            setIsPickerShow(false)
            console.log('do', currentDate, dob)
        }
    };

    const emailInputRef = createRef();
    const passwordInputRef = createRef();
    const confirmPasswordInputRef = createRef();
    const firstNameRef = createRef();
    const lastNameRef = createRef();
    const genderRef = createRef();
    const dateRef = createRef();
    const mobileRef = createRef();
    const pincodeRef = createRef();

    const signupUrl = `https://motorwash-backend-lfxt.onrender.com/signup`
    const emailUrl = `https://motorwash-backend-lfxt.onrender.com/contacts`
    const handleSubmitButton = () => {
        setErrortext('');
        if (!userEmail) {
            alert('Please fill Email');
            return;
        }
        if (!firstName) {
            alert('Please fill first Name');
            return;
        }
        if (!lastName) {
            alert('Please fill last');
            return;
        }
        if (!gender) {
            alert('Please fill gender');
            return;
        }
        if (!dob) {
            alert('Please fill Dt of Birth');
            return;
        }
        if (!mobile) {
            alert('Please mobile number');
            return;
        }
        if (!pincode) {
            alert('Please fill Pincode');
            return;
        }
        if (userPassword !== confirmPassword) {
            alert('two passwords do not match');
            return;
        }
        //Show Loader
        setLoading(true);

        // const emailData = {
        //     "subject": 'Client Registration Success!',
        //     "name": firstName,
        //     "email": userEmail,
        //     "message":
        //         "Dear " + firstName
        //         + ",\n\n"
        //         + "Thank you for registering with MyMotorWash Services. Now you can login and book your vehicle service from the convenience of your home\n"
        //         + "For any queries please call Customer Care."
        //         + "\n\n"
        //         + "Team MyMotorWash"
        // }

        // var dataToSend = {
        //     email: userEmail,
        //     password: userPassword,
        //     first_name: firstName,
        //     last_name: lastName,
        //     gender: gender,
        //     date_of_birth: dob,
        //     mobile: mobile,
        //     pincode: pincode,
        //     usertype: 0
        // };
        // var formBody = [];
        // for (var key in dataToSend) {
        //     var encodedKey = encodeURIComponent(key);
        //     var encodedValue = encodeURIComponent(dataToSend[key]);
        //     formBody.push(encodedKey + '=' + encodedValue);
        // }
        // formBody = formBody.join('&');

        // console.log(formBody)
        // fetch(baseUrl, {
        //     method: 'POST',
        //     body: JSON.stringify({
        //         user: {
        //             "email": userEmail,
        //             "password": userPassword
        //         },
        //     }),
        //     headers: {
        //         'Content-Type':
        //             'application/json',
        //     },
        // })
        fetch(signupUrl, {
            method: 'POST',
            body: JSON.stringify({
                user: {
                    "email": userEmail,
                    "password": userPassword,
                    "first_name": firstName,
                    "last_name": lastName,
                    "gender": gender,
                    "date_of_birth": dob,
                    "mobile": mobile,
                    "pincode": pincode,
                    "usertype": 0
                },
            }),
            headers: {
                'Content-Type':
                    'application/json',
            },
        })
            .then((res) => {
                if (res.ok) {
                    console.log(res.headers.get("Authorization"));
                    AsyncStorage.setItem("token", res.headers.get("Authorization"));
                    setIsRegistraionSuccess(true);
                    console.log(
                        'Registration Successful. Please Login to proceed'
                    );
                    return res.json();
                } else {
                    console.log('Error signup')
                    alert('Email already taken ')
                    throw new Error(res);
                }
            })
            .then(() => {
                const jwt = AsyncStorage.getItem('token')

                try {
                    fetch(emailUrl, {
                        method: 'POST',
                        body: JSON.stringify({
                            contact:
                            {
                                "subject": 'Client Registration Success!',
                                "name": firstName,
                                "email": userEmail,
                                "message":
                                    "Dear " + firstName
                                    + ",\n\n"
                                    + "Thank you for registering with MyMotorWash Services. Now you can login and book your vehicle service from the convenience of your home\n"
                                    + "For any queries please call Customer Care."
                                    + "\n\n"
                                    + "Team MyMotorWash"
                            },
                        }),
                        headers: {
                            'Content-Type':
                                'application/json',
                            Authorization: `Bearer ${jwt}`
                        },

                    })
                }
                catch (error) {
                    console.log('oh, no', error);
                }
            })
            .catch((error) => {
                setLoading(false);
                console.error(error);
            });
    };

    // .then((response) => response.json())
    // .then((responseJson) => {
    //     setLoading(false);
    //     console.log(responseJson);
    //     if (responseJson.status === 'success') {
    //         setIsRegistraionSuccess(true);
    //         console.log(
    //             'Registration Successful. Please Login to proceed'
    //         );
    //     } else {
    //         setErrortext(responseJson.msg);
    //     }
    // })
    // .then((data) => {
    // setClientId(data.data.id)
    // if (data.data.usertype === 'client') {
    //     setClient(true)
    //     setClientName(data.data.first_name)
    //     setClientEmail(data.data.email)
    // }
    // else if (data.data.usertype === 'sprovider') {
    //     setSprovider(true)
    // } else if (data.data.usertype === 'admin') {
    //     setAdmin(true)
    // }
    // })
    // .then((json) => {
    // console.dir(json)
    // })
    if (isRegistraionSuccess) {
        return (
            <View
                style={{
                    flex: 1,
                    backgroundColor: '#307ecc',
                    justifyContent: 'center',
                }}>
                <Image
                    source={require('../Image/success.png')}
                    style={{
                        height: 150,
                        resizeMode: 'contain',
                        alignSelf: 'center'
                    }}
                />
                <Text style={styles.successTextStyle}>
                    Registration Successful
                </Text>
                <TouchableOpacity
                    style={styles.buttonStyle}
                    activeOpacity={0.5}
                    onPress={() => props.navigation.navigate('LoginScreen')}>
                    <Text style={styles.buttonTextStyle}>Login Now</Text>
                </TouchableOpacity>
            </View>
        );
    }
    return (
        <View style={{ flex: 1, backgroundColor: '#040342' }}>
            <Loader loading={loading} />
            <ScrollView
                keyboardShouldPersistTaps="handled"
                contentContainerStyle={{
                    justifyContent: 'center',
                    alignContent: 'center',
                }}>
                <Text
                    style={{
                        fontSize: 30,
                        fontWeight: 'bold',
                        textAlign: 'center',
                        color: '#FB6A33',
                        paddingTop: 5,
                    }} >
                    MyMotorWash
                </Text>
                {/* <View style={{ alignItems: 'center' }}>
                    <Image
                        source={require('../Image/bg2.jpg')}
                        style={{
                            width: '50%',
                            height: 100,
                            resizeMode: 'contain',
                            margin: 5,
                        }}
                    />
                </View> */}
                <KeyboardAvoidingView enabled>

                    <View style={styles.SectionStyle}>
                        <TextInput
                            style={styles.inputStyle}
                            onChangeText={(UserEmail) => setUserEmail(UserEmail)}
                            underlineColorAndroid="#f000"
                            placeholder="Enter Email"
                            placeholderTextColor="#8b9cb5"
                            keyboardType="email-address"
                            ref={emailInputRef}
                            returnKeyType="next"
                            onSubmitEditing={() =>
                                passwordInputRef.current &&
                                passwordInputRef.current.focus()
                            }
                            blurOnSubmit={false}
                        />
                    </View>
                    <View style={styles.SectionStyle}>
                        <TextInput
                            style={styles.inputStyle}
                            onChangeText={(UserPassword) =>
                                setUserPassword(UserPassword)
                            }
                            underlineColorAndroid="#f000"
                            placeholder="Enter Password"
                            placeholderTextColor="#8b9cb5"
                            ref={passwordInputRef}
                            returnKeyType="next"
                            secureTextEntry={true}
                            onSubmitEditing={() =>
                                confirmPasswordInputRef.current &&
                                confirmPasswordInputRef.current.focus()
                            }
                            blurOnSubmit={false}
                        />
                    </View>
                    <View style={styles.SectionStyle}>
                        <TextInput
                            style={styles.inputStyle}
                            onChangeText={(ConfirmPassword) =>
                                setConfirmPassword(ConfirmPassword)
                            }
                            underlineColorAndroid="#f000"
                            placeholder="Repeat Password"
                            placeholderTextColor="#8b9cb5"
                            ref={confirmPasswordInputRef}
                            returnKeyType="next"
                            secureTextEntry={true}
                            onSubmitEditing={() =>
                                firstNameRef.current &&
                                firstNameRef.current.focus()
                            }
                            blurOnSubmit={false}
                        />
                    </View>
                    <View style={styles.SectionStyle}>
                        <TextInput
                            style={styles.inputStyle}
                            onChangeText={(FirstName) => setFirstName(FirstName)}
                            underlineColorAndroid="#f000"
                            placeholder="Enter First Name"
                            placeholderTextColor="#8b9cb5"
                            // keyboardType="numeric"
                            ref={firstNameRef}
                            returnKeyType="next"
                            onSubmitEditing={() =>
                                lastNameRef.current &&
                                lastNameRef.current.focus()
                            }
                            blurOnSubmit={false}
                        />
                    </View>
                    <View style={styles.SectionStyle}>
                        <TextInput
                            style={styles.inputStyle}
                            onChangeText={(LastName) =>
                                setLastName(LastName)
                            }
                            underlineColorAndroid="#f000"
                            placeholder="Enter Last Name"
                            placeholderTextColor="#8b9cb5"
                            autoCapitalize="sentences"
                            ref={lastNameRef}
                            returnKeyType="next"
                            onSubmitEditing={Keyboard.dismiss}
                            blurOnSubmit={false}
                        />
                    </View>
                    <View style={styles.SectionStyle}>
                        {/* <View style={styles.inputStyle}>
                            <Text style={{ color: "#8b9cb5", paddingTop: 8 }} >Gender</Text>
                        </View> */}
                        <View style={styles.inputStyle}>
                            <SelectDropdown
                                defaultButtonText={'Gender'}
                                buttonStyle={styles.dropdown1BtnStyle}
                                buttonTextStyle={styles.dropdown1BtnTxtStyle}
                                dropdownStyle={styles.dropdown1DropdownStyle}
                                rowStyle={styles.dropdown1RowStyle}
                                rowTextStyle={styles.dropdown1RowTxtStyle}
                                data={genders}
                                onSelect={(selectedItem, index) => {
                                    setGender(index)
                                    console.log(selectedItem, index)
                                }}
                            />
                        </View>
                    </View>
                    <View style={styles.SectionStyle}>

                        <View style={styles.inputStyle}>
                            <Text style={{ color: "#8b9cb5", paddingTop: 8 }} onPress={() => showPicker()}
                                placeholder="Date of Birth">Date of Birth</Text>
                        </View>

                        <TouchableOpacity style={styles.inputStyle}>
                            <Text style={{ color: "#8b9cb5", paddingTop: 8 }} onPress={() => showPicker()} >{dob.toString()}</Text>
                            {/* style={{ color: "#8b9cb5", paddingTop: 8, backgroundColor: "red" }} */}
                        </TouchableOpacity>


                        {/* <View style={styles.container}> */}
                        {isPickerShow && (
                            <DateTimePicker
                                date={new Date()}
                                value={new Date()}
                                mode={'date'}
                                onChange={onDobChange}

                                style={styles.windowsPicker}
                                maxDate={new Date()}
                                minDate={"01/01/2012"}
                                dateFormat={('DD/MM/YYYY')}

                            />
                        )}
                    </View>

                    <View style={styles.SectionStyle}>
                        <TextInput
                            style={styles.inputStyle}
                            onChangeText={(Mobile) =>
                                setMobile(Mobile)
                            }
                            underlineColorAndroid="#f000"
                            placeholder="Enter Mobile"
                            placeholderTextColor="#8b9cb5"
                            autoCapitalize="sentences"
                            keyboardType='numeric'
                            ref={mobileRef}
                            returnKeyType="next"
                            onSubmitEditing={Keyboard.dismiss}
                            blurOnSubmit={false}
                        />
                    </View><View style={styles.SectionStyle}>
                        <TextInput
                            style={styles.inputStyle}
                            onChangeText={(Pincode) =>
                                setPincode(Pincode)
                            }
                            underlineColorAndroid="#f000"
                            placeholder="Enter Pincode"
                            placeholderTextColor="#8b9cb5"
                            autoCapitalize="sentences"
                            keyboardType='numeric'
                            ref={pincodeRef}
                            returnKeyType="next"
                            onSubmitEditing={Keyboard.dismiss}
                            blurOnSubmit={false}
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
                        onPress={handleSubmitButton}>
                        <Text style={styles.buttonTextStyle}>REGISTER</Text>
                    </TouchableOpacity>
                </KeyboardAvoidingView>
            </ScrollView>
        </View>
    );
};
export default RegisterScreen;

const styles = StyleSheet.create({
    SectionStyle: {
        flexDirection: 'row',
        height: 40,
        marginTop: 20,
        marginLeft: 35,
        marginRight: 35,
        margin: 10,
    },
    inputStyle: {
        flex: 1,
        color: 'white',
        paddingLeft: 15,
        paddingRight: 15,
        borderWidth: 1,
        borderRadius: 30,
        borderColor: '#dadae8',
        fontSize: 18,
    },
    buttonStyle: {
        backgroundColor: '#3369de',
        borderWidth: 0,
        color: '#FFFFFF',
        borderColor: '#7DE24E',
        height: 40,
        alignItems: 'center',
        borderRadius: 30,
        marginLeft: 35,
        marginRight: 35,
        marginTop: 20,
        marginBottom: 20,
    },
    buttonTextStyle: {
        color: '#FFFFFF',
        paddingVertical: 10,
        fontSize: 18,
    },
    errorTextStyle: {
        color: 'red',
        textAlign: 'center',
        fontSize: 18,
    },
    successTextStyle: {
        color: 'white',
        textAlign: 'center',
        fontSize: 18,
        padding: 30,
    },
    datePickerStyle: {
        width: 200,
        marginTop: 20,
    },
    windowsPicker: {
        flex: 1,
        paddingTop: 10,
        width: 350,
    },
    // dropdown1DropdownStyle: {
    // color: '#FFFFFF',
    // backgroundColor: '#111111',
    // borderBottomLeftRadius: 12,
    // borderBottomRightRadius: 12,
    // },
    dropdown1BtnStyle: {
        width: '50%',
        height: 30,
        backgroundColor: '#040342',
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#444',
        paddingBottom: 8,
    },
    dropdown1BtnTxtStyle: { color: '#8b9cb5', textAlign: 'left' },
    dropdown1DropdownStyle: { backgroundColor: '#040342' },
    dropdown1RowStyle: { backgroundColor: '#040342' },
    dropdown1RowTxtStyle: { color: '#FFFFFF', textAlign: 'left' },
    dropdown2BtnStyle: {
        width: '50%',
        height: 50,
        backgroundColor: '#040342',
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#444',
        paddingBottom: 8,
    },
});


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
} from "react-native";


import DateTimePicker from '@react-native-community/datetimepicker';
import SelectDropdown from 'react-native-select-dropdown'


import AsyncStorage from '@react-native-async-storage/async-storage';
import TimeSlots from './TimesSots'
import { Platform } from 'react-native';

export const bkgUrl = Platform.OS === 'android' ?
    'http://10.0.2.2:3001/bookings'
    :
    'http://localhost:3001/bookings';

export const emailUrl = Platform.OS === 'android' ?
    'http://10.0.2.2:3001/contacts'
    :
    'http://localhost:3001/contacts';

import Loader from '../Components/Loader';


const BookingScreen = (props, navigation) => {
    const { clId } = props.route.params
    console.log('Bkg params', props.route.params.params.params)
    // console.log('props', { props.navigation.params.paramKey })
    const services = ['Car Wash', 'Car Painting', 'Car Polishing', 'Car Repair', 'Music System', 'Scratch Removal', 'Car Checkup', 'Car Interior', 'Denting', 'Tyre Change', 'Car Exterior', 'Car Salon']
    const [areas, setAreas] = useState([500001, 500002, 500003])

    // const [areaId, setAreaId] = useState(0)
    const [showTime, setShowTime] = useState(false)
    const [bkgDate, setBkgDate] = useState('')
    const [bkgTime, setBkgTime] = useState('0:00')
    const [service, setService] = useState('Choose Service')
    const [address1, setAddress1] = useState('')
    const [address2, setAddress2] = useState('')
    const [pincode, setPincode] = useState('Choose Pincode')

    const handleServiceChange = (e) => {
        setService(e.target.value)
    }


    const handlePincodeChange = (e) => {
        setPincode(e.target.value)
    }


    const [isPickerShow, setIsPickerShow] = useState(false);
    const [isSlotsShow, setIsSlotsShow] = useState(false)
    const [loading, setLoading] = useState(false);
    const [errortext, setErrortext] = useState('');
    const [isRegistraionSuccess, setIsRegistraionSuccess] = useState(false);

    const showPicker = () => {
        setIsPickerShow(true);
    };
    // const showSlots = () => {
    //     setIsSlotsShow(true)
    // }

    const onBkgDateChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        console.log('d', currentDate, bkgDate)
        setIsSlotsShow(true)
        if (Platform.OS === 'android') {
            console.log('da', currentDate, bkgDate)
            // setIsPickerShow(false)
        }
        if (event.type === 'neutralButtonPressed') {
            console.log('dn', currentDate, bkgDate)
            setBkgDate(new Date(0));
            // setIsPickerShow(false)
        } else {
            setBkgDate(currentDate);
            // setIsPickerShow(false)
            console.log('do', currentDate, bkgDate)
        }
        setIsPickerShow(false)
    };

    const bkgDateInputRef = createRef();
    const bkgTimeInputRef = createRef();
    const serviceInputRef = createRef();
    const address1InputRef = createRef();
    const address2InputRef = createRef();
    const pincodeInputRef = createRef();


    const handleSubmitButton = () => {
        setErrortext('');
        if (!bkgDate) {
            alert('Please fill Booking Date');
            return;
        }
        if (!bkgTime) {
            alert('Please fill Booking Time');
            return;
        }
        if (!service) {
            alert('Please fill Service');
            return;
        }
        if (!address1) {
            alert('Please fill Address1');
            return;
        }
        if (!address2) {
            alert('Please fill Address2');
            return;
        }

        if (!pincode) {
            alert('Please fill Pincode');
            return;
        }
        //Show Loader
        setLoading(true);


        const booking = {
            bkg_date: bkgDate,
            bkg_time: bkgDate,
            service: service,
            address1: address1,
            address2: address2,
            pincode: pincode,
            user_id: props.route.params.params.params.clId,
            area_id: 1,
        }
        console.log('bkg', booking)

        // fetch(bkgUrl, {
        //     method: 'POST',
        //     body: JSON.stringify({
        //         booking: {
        //             bkg_date: startDate,
        //             bkg_time: apptTime,
        //             service: service,
        //             address1: address1,
        //             address2: address2,
        //             pincode: pincode,
        //             user_id: props.clientId,
        //             area_id: 1,
        //         }
        //     }),
        //     headers: {
        //         'Content-Type':
        //             'application/json',
        //     },
        // })
        //     .then((res) => {
        //         if (res.ok) {
        //             console.log(res.headers.get("Authorization"));
        //             AsyncStorage.setItem("token", res.headers.get("Authorization"));
        //             setIsRegistraionSuccess(true);
        //             console.log(
        //                 'Registration Successful. Please Login to proceed'
        //             );
        //             return res.json();
        //         } else {
        //             console.log('Error signup')
        //             throw new Error(res);
        //         }
        //     })
        //     // .then(() => {
        //     const jwt = AsyncStorage.getItem('token')

        //     try {
        //         fetch(emailUrl, {
        //             method: 'POST',
        //             body: JSON.stringify({
        //                 contact:
        //                 {
        //                     "subject": 'Booking Success!',
        //                     "name": firstName,
        //                     "email": userEmail,
        //                     "message":
        //                         "Dear " + firstName
        //                         + ",\n\n"
        //                         + "Thank you for registering with MyMotorWash Services. Now you can login and book your vehicle service from the convenience of your home\n"
        //                         + "For any queries please call Customer Care."
        //                         + "\n\n"
        //                         + "Team MyMotorWash"
        //                 },
        //             }),
        //             headers: {
        //                 'Content-Type':
        //                     'application/json',
        //                 Authorization: `Bearer ${jwt}`
        //             },

        //         })
        //     }
        //     catch (error) {
        //         console.log('oh, no', error);
        //     }
        // })
        // .catch((error) => {
        //     setLoading(false);
        //     console.error(error);
        // });
    };

    // if (isRegistraionSuccess) {
    //     return (
    //         <View
    //             style={{
    //                 flex: 1,
    //                 backgroundColor: '#307ecc',
    //                 justifyContent: 'center',
    //             }}>
    //             <Image
    //                 source={require('../Image/success.png')}
    //                 style={{
    //                     height: 150,
    //                     resizeMode: 'contain',
    //                     alignSelf: 'center'
    //                 }}
    //             />
    //             <Text style={styles.successTextStyle}>
    //                 Registration Successful
    //             </Text>
    //             <TouchableOpacity
    //                 style={styles.buttonStyle}
    //                 activeOpacity={0.5}
    //                 onPress={() => props.navigation.navigate('LoginScreen')}>
    //                 <Text style={styles.buttonTextStyle}>Login Now</Text>
    //             </TouchableOpacity>
    //         </View>
    //     );
    // }


    return (
        <View style={{ flex: 1, backgroundColor: '#307ecc' }}>
            <Loader loading={loading} />
            <ScrollView
                keyboardShouldPersistTaps="handled"
                contentContainerStyle={{
                    justifyContent: 'center',
                    alignContent: 'center',
                }}>
                <View style={{ alignItems: 'center' }}>
                    <Image
                        source={require('../../Image/aboutreact.png')}
                        style={{
                            width: '50%',
                            height: 100,
                            resizeMode: 'contain',
                            margin: 5,
                        }}
                    />
                </View>
                <KeyboardAvoidingView enabled>
                    {/* <View style={styles.SectionStyle}> */}
                    {/* <View style={styles.inputStyle}>
                            <Text style={{ color: "#8b9cb5", alignItems: 'center' }} >Booking Details</Text>
                        </View> */}
                    {/* <View> */}

                    <View style={styles.SectionStyle}>
                        <View style={styles.inputStyle}>
                            <Text style={{ color: "#8b9cb5", paddingTop: 8 }} >Date of Booking</Text>
                        </View>
                        <View style={styles.SectionStyle}>
                            <Button title="Enter Date of Booking" onPress={() => showPicker()} />
                        </View>
                        {isPickerShow && (
                            <DateTimePicker
                                value={new Date()}
                                mode={'date'}
                                onChange={onBkgDateChange}
                                style={styles.windowsPicker}
                                maxDate={'01/01/2023'}
                                minDate={new Date()}
                                dateFormat={('DD/MM/YYYY')}
                            />
                        )}
                    </View>
                    <View >
                        <Text style={{ color: "#8b9cb5", paddingTop: 8, position: 'relative' }} >Time Slots</Text>
                        {isSlotsShow && (
                            <TimeSlots

                            // setApptTime={setApptTime}
                            // setShowTime={setShowTime}
                            // startDate={startDate}
                            // pincode={pincode} 
                            />
                        )}

                        {/* // : null */}
                        {/* } */}

                    </View>
                    <View style={styles.SectionStyle}>
                        <View style={styles.inputStyle}>
                            <Text style={{ color: "#8b9cb5", paddingTop: 8 }} >Service</Text>
                        </View>
                        <View style={styles.inputStyle}>
                            <SelectDropdown
                                data={services}
                                onSelect={(selectedItem, index) => {
                                    setService(selectedItem)
                                    console.log(selectedItem, index)
                                }}
                            />
                        </View>
                    </View>

                    <View style={styles.SectionStyle}>
                        <TextInput
                            style={styles.inputStyle}
                            onChangeText={(address1) =>
                                setAddress1(address1)
                            }
                            underlineColorAndroid="#f000"
                            placeholder="Enter Address1"
                            placeholderTextColor="#8b9cb5"
                            autoCapitalize="sentences"
                            ref={address1InputRef}
                            returnKeyType="next"
                            onSubmitEditing={Keyboard.dismiss}
                            blurOnSubmit={false}
                        />
                    </View>

                    <View style={styles.SectionStyle}>
                        <TextInput
                            style={styles.inputStyle}
                            onChangeText={(address2) =>
                                setAddress2(address2)
                            }
                            underlineColorAndroid="#f000"
                            placeholder="Enter Address2"
                            placeholderTextColor="#8b9cb5"
                            autoCapitalize="sentences"
                            ref={address2InputRef}
                            returnKeyType="next"
                            onSubmitEditing={Keyboard.dismiss}
                            blurOnSubmit={false}
                        />
                    </View>

                    <View style={styles.SectionStyle}>
                        <View style={styles.inputStyle}>
                            <Text style={{ color: "#8b9cb5", paddingTop: 8 }} >Pincode</Text>
                        </View>
                        <View style={styles.inputStyle}>
                            <SelectDropdown
                                data={areas}
                                onSelect={(selectedItem, index) => {
                                    setPincode(selectedItem)
                                    console.log(selectedItem, index)
                                }}
                            />
                        </View>
                    </View>

                    {/* </View> */}

                    {/* </View> */}
                    <TouchableOpacity
                        style={styles.buttonStyle}
                        activeOpacity={0.5}
                        onPress={handleSubmitButton}>
                        <Text style={styles.buttonTextStyle}>Book Slot</Text>
                    </TouchableOpacity>
                </KeyboardAvoidingView>
            </ScrollView>
        </View>
    );
};


export default BookingScreen;

const styles = StyleSheet.create({
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
        marginBottom: 20,
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
    errorTextStyle: {
        color: 'red',
        textAlign: 'center',
        fontSize: 14,
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
    container: {
        flex: 1,
        // padding: 20,
    },
    button: {
        paddingHorizontal: 8,
        paddingVertical: 6,
        borderRadius: 4,
        backgroundColor: "oldlace",
        alignSelf: "center",
        marginHorizontal: "1%",
        marginBottom: 6,
        minWidth: "48%",
        textAlign: "center",
    },
    buttonLabel: {
        fontSize: 12,
        fontWeight: "500",
        color: "coral",
    },
    selected: {
        backgroundColor: "coral",
        borderWidth: 0,
    },
});


// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         // padding: 20,
//     },
//     button: {
//         paddingHorizontal: 8,
//         paddingVertical: 6,
//         borderRadius: 4,
//         backgroundColor: "oldlace",
//         alignSelf: "center",
//         marginHorizontal: "1%",
//         marginBottom: 6,
//         minWidth: "48%",
//         textAlign: "center",
//     },
//     buttonLabel: {
//         fontSize: 12,
//         fontWeight: "500",
//         color: "coral",
//     },
//     selected: {
//         backgroundColor: "coral",
//         borderWidth: 0,
//     },
// });

{/* <View style={styles.SectionStyle}>
                                <TextInput
                                    style={styles.inputStyle}
                                    onChangeText={(address1) =>
                                        setAddress1(address1)
                                    }
                                    underlineColorAndroid="#f000"
                                    placeholder="Enter Address1"
                                    placeholderTextColor="#8b9cb5"
                                    autoCapitalize="sentences"
                                    ref={address1Ref}
                                    returnKeyType="next"
                                    onSubmitEditing={Keyboard.dismiss}
                                    blurOnSubmit={false}
                                />
                            </View> */}
{/* <Text sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                                Service :
                                <select onChange={handleServiceChange}>
                                    <option value="choose">
                                    </option>
                                    {services.map((service) => <option key={service.index} value={service}>{service}</option>)}
                                </select>
                            </Text> */}

{/* <Text sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                                Booking Date :

                                <Row >
                                    <Col xs={6} style={{ marginLeft: 200, position: 'absolute' }}>

                                        {showTime ? <TimeSlots setApptTime={setApptTime} setShowTime={setShowTime} startDate={startDate} pincode={pincode} /> : null}
                                        {console.log('dt,tm', startDate.toLocaleDateString(), apptTime)}
                                    </Col>
                                    <Col xs={6} >
                                        <DatePicker
                                            selected={startDate}
                                            onChange={(date) => setStartDate(date)}
                                            shouldCloseOnSelect={false}
                                            onSelect={setDateShowTime}
                                        />
                                    </Col>

                                </Row>

                            </Text> */}

{/* <Text sx={{ fontSize: 14 }} color="text.secondary">
                                Booking Time : {apptTime}
                            </Text> */}
{/* <View>
                            <Button
                                size="small"
                                variant="outlined"
                                onClick={() => props.setBookingVisible(false)}
                            >Cancel</Button>
                            <Button size="small" variant="contained"
                                onClick={createAppointment}
                            >Confirm</Button>
                        </View> */}
{/* <Text sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                                PinCode :
                                <select onChange={handlePincodeChange}>
                                    <option value="choose">
                                    </option>
                                    {areas.map((area) => <option key={area.id} value={area.pincode}>{area.pincode}</option>)}

                                </select>
                            </Text> */}
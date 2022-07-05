import React, { useState, createRef } from "react";
// import { StyleSheet, Modal,Text, View, Pressable, TouchableOpacity } from "react-native";
import { color } from "react-native-reanimated";
import {
    StyleSheet,
    Modal,
    SafeAreaView,
    TextInput,
    View,
    Text,
    Image,
    KeyboardAvoidingView,
    Keyboard,
    TouchableOpacity,
    ScrollView,
    Pressable,
    Button,
} from "react-native";

import { isBefore, setHours, setMinutes, addMinutes } from 'date-fns'
import { Content, Card, Number, Item, Paragraph } from 'react-native-paper';

import DateTimePicker from '@react-native-community/datetimepicker';
import SelectDropdown from 'react-native-select-dropdown'
import AsyncStorage from '@react-native-async-storage/async-storage';
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

const HomeScreen = (props, navigation) => {


    const { clId, email, firstName } = props.route.params
    console.log('Bkg params', props.route.params.params.params)
    const services = ['Car Wash', 'Car Painting', 'Car Polishing', 'Car Repair', 'Music System', 'Scratch Removal', 'Car Checkup', 'Car Interior', 'Denting', 'Tyre Change', 'Car Exterior', 'Car Salon']
    const [areas, setAreas] = useState([500001, 500002, 500003])
    const [showTime, setShowTime] = useState(false)
    const [bkgDate, setBkgDate] = useState(new Date(Date.now()))
    const [bkgTime, setBkgTime] = useState('07:00 AM')
    const [service, setService] = useState('Choose Service')
    const [address1, setAddress1] = useState('')
    const [address2, setAddress2] = useState('')
    const [pincode, setPincode] = useState('Choose Pincode')
    const [isBookingSuccess, setIsBookingSuccess] = useState(false);


    const [modalVisible, setModalVisible] = useState(false);

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
    const [reserved, setReserved] = useState([])
    const showPicker = () => {
        setIsPickerShow(true);
    };

    const onBkgDateChange = (event, selectedDate) => {
        const currentDate = selectedDate || bkgDate;
        setBkgDate(currentDate)
        console.log('d', selectedDate)
        console.log('b', bkgDate)
        getCurrentAppts()
        setIsSlotsShow(true)
        setIsPickerShow(false)
    };

    const bkgDateInputRef = createRef();
    const bkgTimeInputRef = createRef();
    const serviceInputRef = createRef();
    const address1InputRef = createRef();
    const address2InputRef = createRef();
    const pincodeInputRef = createRef();

    const setTime = (x, h = 0, m = 0) => setHours(setMinutes(x, m), h)
    const from = setTime(new Date(), 7)
    const to = setTime(new Date(), 21)
    const step = (x) => addMinutes(x, 30)
    const rawblocks = []
    const blocks = []
    let cursor = from
    while (isBefore(cursor, to)) {
        rawblocks.push(cursor.toLocaleTimeString('en-US', { hour: 'numeric', hour12: true }).slice(-9, -3))
        cursor = step(cursor)
    }
    const ampm = rawblocks.map((tm) => {
        let H = tm.substr(0, 2)
        let h = H % 12 || 12
        let ampm = (H < 12 || H === 24) ? " AM" : " PM"
        tm = h + tm.substr(2, 3) + ampm
        console.log(tm)
        blocks.push(tm)
    })
    const apptUrl = Platform.OS === 'android' ?
        `http://10.0.2.2:3001/bookings/${bkgDate.toUTCString()}/${pincode}`
        :
        `http://localhost:3001/bookings/${bkgDate.toUTCString()}/${pincode}`

    const getCurrentAppts = async () => {
        try {
            const res = await fetch(apptUrl, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            }
            )
                .then((res) => {
                    console.log('res', res)
                    if (res.ok) {
                        return res.json();
                    }
                })
                .then((data) => {
                    console.log('working 2', data)
                    setReserved(data)
                    console.log('reserved', reserved)
                })

        } catch (err) {
            setReserved(null);
        }
    }

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
        setLoading(true);
        const booking = {
            bkg_date: bkgDate,
            bkg_time: bkgTime,
            service: service,
            address1: address1,
            address2: address2,
            pincode: pincode,
            user_id: props.route.params.params.params.clId,
            area_id: 1,
        }
        console.log('bkgDet', booking)
        setModalVisible(!modalVisible)
        const jwt = AsyncStorage.getItem('token')
        fetch(bkgUrl, {
            method: 'POST',
            body: JSON.stringify({
                booking: {
                    bkg_date: bkgDate,
                    bkg_time: bkgTime,
                    service: service,
                    address1: address1,
                    address2: address2,
                    pincode: pincode,
                    user_id: props.route.params.params.params.clId,
                    area_id: 1,
                },
            }),
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${jwt}`
            },
        })
            .then(response => {
                if (response.status === 201) {
                    alert('Your booking successful')
                    setIsBookingSuccess(true);
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
                                "subject": 'Booking Success!',
                                "name": props.route.params.params.params.firstName,
                                "email": props.route.params.params.params.email,
                                "message":
                                    "Dear " + props.route.params.params.params.firstName
                                    + ",\n\n"
                                    + "Thank you for booking your motor wash with MyMotorWash Services. The following are the details of your booking\n"
                                    + "\nAppointment Date :" + bkgDate
                                    + "\nAppointment Time : " + bkgTime
                                    + "\nService Name: " + service
                                    + "\n\n"
                                    + "Kindly be available to show your vehicle when our service person arrives. For any queries please call Customer Care."
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
            .then(() => {
                setBkgDate(new Date(Date.now()))
                 setBkgTime('07:00 AM')
                 setService('Choose Service')
                 setAddress1('')
                 setAddress2('')
                 setPincode('Choose Pincode')
            })
            .catch((error) => {
                setLoading(false);
                console.error(error);
            });

    };
    // if (isBookingSuccess) {
    //     return (
    //         <View
    //             style={{
    //                 flex: 1,
    //                 backgroundColor: '#307ecc',
    //                 justifyContent: 'center',
    //             }}>
    //             <Image
    //                 source={require('../../Image/success.png')}
    //                 style={{
    //                     height: 150,
    //                     resizeMode: 'contain',
    //                     alignSelf: 'center'
    //                 }}
    //             />
    //             <Text style={styles.successTextStyle}>
    //                 Booking Successful
    //             </Text>
    //             {/* <TouchableOpacity
    //                 style={styles.buttonStyle}
    //                 activeOpacity={0.5}
    //                 onPress={() => navigation.navigate('HomeScreen')}>
    //                 <Text style={styles.buttonTextStyle}>Home</Text>
    //             </TouchableOpacity> */}
    //         </View>
    //     );

    // }

    return (
        <View style={[styles.container, {
            flexDirection: "column"
        }]}>
            <View style={{ flex: 1, backgroundColor: "black" }} >
                <Text
                    style={{
                        fontSize: 30,
                        fontWeight: 'bold',
                        textAlign: 'center',
                        color: '#FB6A33',
                        paddingTop: 5,
                    }}>
                    MyMotorWash
                </Text>
            </View>
            <View style={{ flex: 9, backgroundColor: "skyblue", justifyContent: 'center' }} >
                <Text
                    style={{
                        fontSize: 18,
                        textAlign: 'center',
                        color: 'black',
                        marginBottom: 16,
                    }}>
                    Have your car serviced at home.
                    {'\n'}
                    Choose from wide list of our services
                </Text>
              
                
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => {
                        Alert.alert("Modal has been closed.");
                        setModalVisible(!modalVisible);
                    }}
                >
                    {/*BEGIN  code from other screenOptions */}
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
                            <View style={styles.SectionStyle}>
                                <TextInput
                                    style={styles.inputStyle}
                                    onChangeText={(address1) =>
                                        setAddress1(address1)
                                    }
                                    underlineColorAndroid="#f000"
                                    placeholder="Enter Address1"
                                    placeholderTextColor={styles.dropStyle} //"#8b9cb5"
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
                                {/* <View style={styles.inputStyle}>
                                    <Text style={{ color: "#8b9cb5", paddingTop: 8 }} >Pincode</Text>
                                </View> */}
                                <View
                                >
                                    <SelectDropdown
                                        defaultButtonText='Pincode'
                                        buttonTextStyle={styles.whiteText}
                                        buttonStyle={styles.dropStyle}
                                        rowStyle={styles.dropStyle}
                                        rowTextStyle={styles.whiteText}
                                        selectedRowStyle={styles.dropStyle}
                                        selectedRowTextStyle={styles.whiteText}
                                        data={areas}
                                        onSelect={(selectedItem, index) => {
                                            setPincode(selectedItem)
                                            console.log(selectedItem, index)
                                        }}
                                    />
                                </View>
                            </View>
                            <KeyboardAvoidingView enabled>
                                <View style={styles.SectionStyle}>
                                    {/* <View style={styles.inputStyle}>
                                        <Text style={{ color: "#8b9cb5", paddingTop: 8 }} >Booking Date</Text>
                                    </View> */}
                                    <TouchableOpacity onPress={() => showPicker()} >
                                        <Text style={styles.inputStyle}>Booking Date: {bkgDate.toLocaleDateString()}</Text>
                                    </TouchableOpacity>
                                    {isPickerShow && (
                                        <DateTimePicker
                                            value={bkgDate}
                                            mode={'date'}
                                            style={styles.windowsPicker}
                                            onChange={onBkgDateChange}
                                        />
                                    )}
                                </View>
                                <View style={styles.SectionStyle} >
                                    <View>
                                        {/* <Text style={styles.inputStyle}>{tmslot}</Text> */}
                                        <Text style={[{ color: "#8b9cb5", position: 'relative' }, styles.inputStyle]} >Time Slot: {bkgTime}</Text>
                                    </View>
                                    {isSlotsShow && (

                                        <SafeAreaView style={styles.container1}>
                                            <View style={styles.container1}>
                                                <Card style={styles.card}>
                                                    <Card.Title title="Time Slots"
                                                    />
                                                    <Card.Content style={styles.content}>
                                                        {rawblocks.map((tmslot, index) => (
                                                            <TouchableOpacity
                                                                key={index}
                                                                onPress={() => {
                                                                    if (!reserved.includes(tmslot)) {

                                                                        setBkgTime(tmslot)
                                                                        console.log('tmslot', tmslot)
                                                                        setIsSlotsShow(false)
                                                                    } else
                                                                        alert('Already reserved')


                                                                }}>

                                                                <Text style={{ color: 'blue', margin: 5, borderColor: 'green', backgroundColor: (reserved.includes(tmslot) ? '#42e3f5' : 'white'), marginLeft: 0 }}>{tmslot}</Text>

                                                            </TouchableOpacity>
                                                        ))}
                                                    </Card.Content>
                                                </Card>
                                            </View>
                                        </SafeAreaView>
                                    )}
                                </View>
                                <View style={styles.SectionStyle}>
                                    {/* <View
                                        style={styles.inputStyle}>
                                        <Text style={{ color: "#8b9cb5", paddingTop: 8 }} >Service</Text>
                                    </View> */}
                                    <View
                                        // style={styles.listStyle}
                                        // style={styles.inputStyle}
                                    >
                                        <SelectDropdown
                                            data={services}
                                            defaultButtonText='Select Service'
                                            buttonTextStyle={styles.whiteText}
                                            buttonStyle={styles.dropStyle}
                                            rowStyle={styles.dropStyle}
                                            rowTextStyle={styles.whiteText}
                                            selectedRowStyle={styles.dropStyle}
                                            selectedRowTextStyle={styles.whiteText}
                                            onSelect={(selectedItem, index) => {
                                                setService(selectedItem)
                                                console.log(selectedItem, index)
                                            }}
                                        />
                                    </View>
                                </View>

                                <TouchableOpacity
                                    style={styles.buttonStyle}
                                    activeOpacity={0.5}
                                    onPress={handleSubmitButton}>
                                    <Text style={styles.buttonTextStyle}>Book Slot</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={styles.cancelButtonStyle}
                                    activeOpacity={0.5}
                                    onPress={() => {
                        // alert("Modal has been closed.");
                        setModalVisible(!modalVisible);
                    }}>
                                    <Text style={styles.buttonTextStyle}>Cancel</Text>
                                </TouchableOpacity>
                            </KeyboardAvoidingView>
                        </ScrollView>
                    </View>

                    {/*END  code from other screenOptions */}

                    {/* <View style={styles.centeredView}>
                        <View style={styles.modalView}>
                            <Text style={styles.modalText}>Hello World!</Text>
                            <Pressable
                                style={[styles.button, styles.buttonClose]}
                                onPress={() => setModalVisible(!modalVisible)}
                            >
                                <Text style={styles.textStyle}>Hide Modal</Text>
                            </Pressable>
                        </View>
                    </View> */}
                </Modal>


                <Pressable
                    style={[
                        styles.button, styles.selected,
                    ]}
                    onPress={() => setModalVisible(true)}
                >
                    <Text style={{ color: 'white', textAlign: 'center' }}> Book Your Slot now</Text>
                </Pressable>
            </View>


            <View style={{ flex: 1, backgroundColor: "#FB6A33" }} />
        </View >
    );
};

export default HomeScreen;


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
    cancelButtonStyle: {
        backgroundColor: '#FB6A33',
        borderWidth: 0,
        color: '#FFFFFF',
        borderColor: '#7DE24E',
        height: 40,
        alignItems: 'center',
        borderRadius: 30,
        marginLeft: 35,
        marginRight: 35,
        marginTop: 3,
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
        fontSize: 20,
        paddingLeft: 15,
        paddingRight: 30,
        borderWidth: 1,
        borderRadius: 30,
        borderColor: '#dadae8',
    },
    dropStyle: {
        flex: 1,
        backgroundColor: '#307ecc',
        color: 'white',
        // paddingLeft: 15,
        // paddingRight: 30,
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
    container1: {
        flex: 1,
        justifyContent: 'center',
        position: 'relative',
        backgroundColor: 'white',
        // backgroundColor: '#ecf0f1',
        // height: 550,
        width: 150,
        zIndex: 1000,
    },
    content: {
        justifyContent: 'center',
        flexDirection: 'row',
        flexWrap: 'wrap',
        paddingRight: 15,
        height: 550,
        width: 150,
    },
    card: {
        height: '100%',
        width: 150,
        height: 550,
    },
    listStyle: {
        width: 50,
        backgroundColor: 'red',
        textAlign: 'left',
        justifyContent: 'center',
        marginRight: 15,
        borderRadius: 30,
        borderColor: '#dadae8',
    },
    whiteText: {
        color: 'white',
        fontSize: 20,
    },
    dimText: {
        color: '#d9dedb',
        fontSize: 16,
    },


    container: {
        flex: 1,
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
})

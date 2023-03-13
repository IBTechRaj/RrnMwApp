// Example of Splash, Login and Sign Up in React Native
// https://aboutreact.com/react-native-login-and-signup/

// Import React and Component
import React, { useState, useEffect } from 'react';
import { View, Text, SafeAreaView, StyleSheet, Image } from 'react-native';
import { DataTable } from 'react-native-paper';
const HomeScreen = () => {
    const servicesUrl = `https://motorwash-backend-lfxt.onrender.com/services/`
    const [serviceData, setServiceData] = useState([]);

    useEffect(() => {
        const getServices = async () => {
            try {
                const res = await fetch(servicesUrl, {
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
                        console.log('services', data)
                        setServiceData(data)
                    })
            } catch (err) {
                setServiceData(null);
                console.log('services error', err)
            }
        }

        getServices()
    }, [])

    return (


        <SafeAreaView style={{ flex: 1, backgroundColor: '#040342' }}>
            <View style={{ flex: 1, alignItems: 'center' }}>
                <Text
                    style={{
                        fontSize: 30,
                        fontWeight: 'bold',
                        textAlign: 'center',
                        color: '#FB6A33',
                        // paddingTop: 5,
                    }} >
                    MyMotorWash
                </Text>
            </View>
            <View style={{ flex: 1, alignItems: 'center' }}>
                <Image
                    source={require('../../Image/bg2.jpg')}
                    style={{
                        flex: 1,
                        width: '100%',
                        // height: auto,
                        resizeMode: 'contain',
                        // margin: 30,
                    }}
                />
            </View>

            <View style={{ flex: 5 }}>
                <View style={{ flex: 1 }}>
                    <Text style={styles.header}>
                        Our Services


                    </Text>

                </View>
                <View style={{ flex: 4 }}>
                    <DataTable>
                        <DataTable.Header>
                            <DataTable.Title><Text style={styles.header}>Service</Text></DataTable.Title>
                            <DataTable.Title ><Text style={styles.header}>Price</Text></DataTable.Title>
                            <DataTable.Title ><Text style={styles.header}>Offer Price</Text></DataTable.Title>
                        </DataTable.Header>
                        {serviceData && serviceData.map(({ id, sname, price, offerprice, description }) => (
                            <DataTable.Row>
                                <DataTable.Cell><Text style={styles.detail}>{sname}</Text></DataTable.Cell>
                                <DataTable.Cell ><Text style={styles.detail}>{price}</Text></DataTable.Cell>
                                <DataTable.Cell ><Text style={styles.detail}>{offerprice}</Text></DataTable.Cell>
                            </DataTable.Row>
                        ))}
                    </DataTable>
                </View>
            </View>
            <View style={{ flex: 1, backgroundColor: "#307ecc", alignItems: 'center', justifyContent: 'center' }} >
                <Text style={styles.footer}>
                    My Motor Washg @ 2022
                    {'\n\n'}

                </Text>
            </View>
        </SafeAreaView>
    );
};

export default HomeScreen;

const styles = StyleSheet.create({
    header: {
        fontSize: 20,
        textAlign: 'center',
        color: 'white',
    },
    subheader: {
        fontSize: 16,
        textAlign: 'center',
        color: 'white',
        backgroundColor: '#414880',
        padding: 8,
        margin: 0
    },
    detail: {
        fontSize: 14,
        textAlign: 'center',
        color: 'white',
        backgroundColor: '#414880',
        // padding: 8,
        margin: 0
    },
    table: {
        fontSize: 16,
        textAlign: 'left',
        color: 'white',
        backgroundColor: '#414880',
        // padding: 8,
        margin: 0
    }
});
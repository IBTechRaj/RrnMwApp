// Example of Splash, Login and Sign Up in React Native
// https://aboutreact.com/react-native-login-and-signup/

// Import React and Component
import React from 'react';
import { View, Text, SafeAreaView, Image, StyleSheet } from 'react-native';

const ContactScreen = () => {
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#040342' }}>
            <View style={{ alignItems: 'center' }}>
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
                <Image
                    source={require('../../Image/bg2.jpg')}
                    style={{
                        width: '50%',
                        height: 100,
                        resizeMode: 'contain',
                        margin: 30,
                    }}
                />
            </View>
            <View style={{ flex: 6, padding: 16 }}>
                <View style={styles.container}>
                    <Text style={styles.title}>Contact Us</Text>
                    <Text style={styles.info}>My Motor Wash</Text>
                    <Text style={styles.info}>201, Susheela Lahari Apartments</Text>
                    <Text style={styles.info}>Uppal Road, Monday Market</Text>
                    <Text style={styles.info}>Hyderabad 500039 Telangana, India</Text>
                    <Text style={styles.info}>Email: info@mymotorwash.com</Text>
                </View>
                {/* <View
                    style={{
                        flex: 1,
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}>
                    <Text
                        style={{
                            fontSize: 20,
                            textAlign: 'center',
                            marginBottom: 16,
                        }}>
                        Example of Splash, Login and Sign Up in React Native
                        {'\n\n'}
                        This is the Settings Screen
                    </Text>
                </View> */}
                {/* <Text
                    style={{
                        fontSize: 18,
                        textAlign: 'center',
                        color: 'grey',
                    }}>
                    Splash, Login and Register Example{'\n'}React Native
                </Text>
                <Text
                    style={{
                        fontSize: 16,
                        textAlign: 'center',
                        color: 'grey',
                    }}>
                    www.aboutreact.com
                </Text> */}
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

export default ContactScreen;


const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        padding: 20,
        marginTop: 20,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    info: {
        fontSize: 16,
        marginBottom: 5,
    },
    footer: {
        color: 'white',
        fontSize: 12,
        marginTop: 16
    },
});
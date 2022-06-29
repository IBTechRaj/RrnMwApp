// Example of Splash, Login and Sign Up in React Native
// https://aboutreact.com/react-native-login-and-signup/

// Import React
import React from 'react';

// Import Navigators from React Navigation
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';

// Import Screens
import HomeScreen from './DrawerScreens/HomeScreen';
import SettingsScreen from './DrawerScreens/SettingsScreen';
import BookingScreen from './DrawerScreens/BookingScreen';
import CustomSidebarMenu from './Components/CustomSidebarMenu';
import NavigationDrawerHeader from './Components/NavigationDrawerHeader';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

const HomeScreenStack = ({ route, navigation }) => {
    // const clId = route.params
    // console.log('Hs params', route.params)
    return (
        <Stack.Navigator initialRouteName="HomeScreen"
        // drawerContent={(props) => <CustomSidebarMenu {...props} />}
        >

            <Stack.Screen
                name="HomeScreen"
                // initialParams={{ params: route.params }}
                component={HomeScreen}
                options={{
                    title: 'Home', //Set Header Title
                    headerLeft: () => (
                        <NavigationDrawerHeader navigationProps={navigation} />
                    ),
                    headerStyle: {
                        backgroundColor: '#307ecc', //Set Header color
                    },
                    headerTintColor: '#fff', //Set Header text color
                    headerTitleStyle: {
                        fontWeight: 'bold', //Set Header text style
                    },
                }}
            />
        </Stack.Navigator>
    );
};

const BookingScreenStack = ({ route, navigation }) => {
    // const clId = route.params
    console.log('BkgSt params', route.params)
    return (
        <Stack.Navigator
            initialRouteName="BookingScreen"
        // drawerContent={(props) => <CustomSidebarMenu {...props} />}
        >


            <Stack.Screen
                name="BookingScreen"
                initialParams={{ params: route.params }}
                component={BookingScreen}
                options={{
                    title: 'Booking', //Set Header Title
                    headerLeft: () => (
                        <NavigationDrawerHeader navigationProps={navigation} />
                    ),
                    headerStyle: {
                        backgroundColor: '#307ecc', //Set Header color
                    },
                    headerTintColor: '#fff', //Set Header text color
                    headerTitleStyle: {
                        fontWeight: 'bold', //Set Header text style
                    },
                }}
            />
        </Stack.Navigator>
    );
};

const SettingScreenStack = ({ navigation }) => {
    return (
        <Stack.Navigator
            initialRouteName="SettingsScreen"
            screenOptions={{
                headerLeft: () => (
                    <NavigationDrawerHeader navigationProps={navigation} />
                ),
                headerStyle: {
                    backgroundColor: '#307ecc', //Set Header color
                },
                headerTintColor: '#fff', //Set Header text color
                headerTitleStyle: {
                    fontWeight: 'bold', //Set Header text style
                },
            }}>
            <Stack.Screen
                name="SettingsScreen"
                component={SettingsScreen}
                options={{
                    title: 'Settings', //Set Header Title
                }}
            />
        </Stack.Navigator>
    );
};


const DrawerNavigatorRoutes = ({ route, navigation }) => {
    // const clId = route.params
    console.log('Dnr params', route.params)
    return (

        <Drawer.Navigator
            screenOptions={{
                activeTintColor: '#cee1f2',
                color: '#cee1f2',
                itemStyle: { marginVertical: 5, color: 'white' },
                labelStyle: {
                    color: '#d8d8d8',
                },
                headerShown: false,
            }}
            // screenOptions={{ headerShown: false }}
            initialRouteName="BookingScreenStack"
        // drawerContent={(props) => <CustomSidebarMenu {...props} />}
        >
            {/* drawerContent= {CustomSidebarMenu}> */}
            <Drawer.Screen
                name="HomeScreenStack"
                // initialParams={{ params: route.params }}
                options={{ drawerLabel: 'Home Screen' }}
                component={HomeScreenStack}
            />
            <Drawer.Screen
                name="SettingScreenStack"
                options={{ drawerLabel: 'Setting Screen' }}
                component={SettingScreenStack}
            />
            <Drawer.Screen
                name="BookingScreenStack"
                initialParams={{ params: route.params }}
                // options={{ drawerLabel: 'Booking Screen' }}
                component={BookingScreenStack}
            />
        </Drawer.Navigator>
    );
};

export default DrawerNavigatorRoutes;

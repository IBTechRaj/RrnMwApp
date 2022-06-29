import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { color } from "react-native-reanimated";

const HomeScreen = () => {
    return (
        <View style={[styles.container, {
            // Try setting `flexDirection` to `"row"`.
            flexDirection: "column"
        }]}>
            {/* <View style={{ flex: 1, backgroundColor: "red" }} /> */}
            <View style={{ flex: 1, backgroundColor: "black" }} >
                <Text
                    style={{
                        fontSize: 30,
                        fontWeight: 'bold',
                        textAlign: 'center',
                        color: '#FB6A33',
                        paddingTop: 5,
                        // marginBottom: 16,
                    }}>
                    MyMotorWash
                </Text>
            </View>
            <View style={{ flex: 9, backgroundColor: "skyblue", justifyContent: 'center' }} >
                <Text
                    style={{
                        fontSize: 18,
                        // fontWeight: 'bold',
                        textAlign: 'center',
                        color: 'black',
                        // paddingTop: 5,
                        marginBottom: 16,
                    }}>
                    Have your car serviced at home.
                    {'\n'}
                    Choose from wide list of our services
                </Text>
                <TouchableOpacity
                    // onPress={() => setSelectedValue(value)}
                    style={[
                        styles.button, styles.selected,
                    ]}
                >
                    <Text
                        style={{ color: 'white', textAlign: 'center' }}
                    >
                        Book Your Slot now
                    </Text>
                </TouchableOpacity>
            </View>


            <View style={{ flex: 1, backgroundColor: "#FB6A33" }} />
        </View >
    );
};

const styles = StyleSheet.create({
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

export default HomeScreen;
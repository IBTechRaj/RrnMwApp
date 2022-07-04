import { isBefore, setHours, setMinutes, addMinutes } from 'date-fns'
import { useState, useEffect } from 'react'
import * as React from 'react';
import { Content, Card, Button, Number, Item, Paragraph } from 'react-native-paper';
import {
    SafeAreaView,
    Text,
    View,
    StyleSheet
} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';


export default function TimeSlots(props) {
    const setTime = (x, h = 0, m = 0) => setHours(setMinutes(x, m), h)
    const from = setTime(new Date(), 7)
    const to = setTime(new Date(), 21)
    const step = (x) => addMinutes(x, 30)
    const rawblocks = []
    const blocks = []
    let cursor = from
    while (isBefore(cursor, to)) {
        // console.log(cursor.toLocaleTimeString('en-US', { hour: 'numeric', hour12: false }))
        rawblocks.push(cursor.toLocaleTimeString('en-US', { hour: 'numeric', hour12: true }).slice(-9, -3))
        // + cursor.toLocaleTimeString().slice(-4)
        cursor = step(cursor)

    }
    // console.log(rawblocks)
    const ampm = rawblocks.map((tm) => {
        // console.log(tm)
        let H = tm.substr(0, 2)
        let h = H % 12 || 12
        let ampm = (H < 12 || H === 24) ? " AM" : " PM"
        tm = h + tm.substr(2, 3) + ampm
        // return tm
        // console.log(tm)

        console.log(tm)
        blocks.push(tm)
    })


    const Item = ({ title }) => (
        <View style={styles.item}>
            <Text style={styles.title}>{title}</Text>
        </View>
    );
    const renderItem = ({ item }) => (
        <Item title={item} />
    );
    return (
        <>
            <SafeAreaView style={styles.container}>
                <View style={styles.container}>
                    <Card style={styles.card}>
                        <Card.Title title="Time Slots" subtitle="Card Subtitle" />
                        <Card.Content style={styles.content}>
                            {rawblocks.map((tmslot, index) => (
                                <TouchableOpacity
                                    onPress={() => alert(tmslot)}>

                                    <Text style={{ color: 'blue', margin: 5, borderColor: 'green' }}>{tmslot}</Text>

                                </TouchableOpacity>
                            ))}
                            {/* </FlatList> */}
                        </Card.Content>
                        {/* <Card.Cover source={{ uri: 'https://picsum.photos/700' }} /> */}
                        <Card.Actions>
                            <Button>Cancel</Button>
                            <Button>Ok</Button>
                        </Card.Actions>
                    </Card>
                </View>
            </SafeAreaView>


        </>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        // padding: 20,
        backgroundColor: '#ecf0f1',
        width: 140
    },
    content: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        // width: 140,
    },
    card: {
        // flex: 1,
        width: 140,
    },
    // paragraph: {
    //     fontSize: 18,
    //     fontWeight: 'bold',
    //     textAlign: 'center',
    //     padding: 20
    // },
});

// const styles = StyleSheet.create({
//     card: {
//         flex: 1,
//         width: 140,
//     },
//     container: {
//         flex: 1,
//         width: 150,
//         // marginTop: StatusBar.currentHeight || 0,
//     },
//     item: {
//         backgroundColor: '#f9c2ff',
//         padding: 1,
//         marginVertical: 1,
//         marginHorizontal: 1,
//         justifyContent: 'right',
//     },
//     title: {
//         fontSize: 16,
//     },
//     content: {
//         flexDirection: 'row',
//         flexWrap: 'wrap',
//         width: 130,
//     },
// });
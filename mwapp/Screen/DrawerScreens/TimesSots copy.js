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
// import Card from '@mui/material/Card';
// import CardActions from '@mui/material/CardActions';
// import CardContent from '@mui/material/CardContent';
// import Typography from '@mui/material/Typography';
// import { experimentalStyled as styled } from '@mui/material/styles';
// import Box from '@mui/material/Box';
// import Paper from '@mui/material/Paper';
// import Grid from '@mui/material/Grid';
// import { makeStyles } from "@material-ui/styles";
// import axios from 'axios';

// const useStyles = makeStyles((theme) => ({
//     item: {
//         color: '#ccc',
//         justifyContent: "center",
//         paddingRight: 10,
//         paddingLeft: -10,
//         textAlign: 'center',
//         marginBottom: 3,
//         display: "flex",
//         '&:hover': {
//             '&>a': {
//                 color: 'red',
//             }
//         }
//     }
// }));

// const Item = styled(Paper)(({ theme }) => ({
//     backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
//     ...theme.typography.body2,
//     padding: theme.spacing(2),

//     textAlign: 'center',
//     color: theme.palette.text.secondary,
// }));

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

    // const slotsArr=['08:00','08:30','09:30','09:30','10:00','10:30','10:00','10:30','10:00','10:30','10:00','10:30',]
    // const classes = useStyles()
    // const [reserved, setReserved] = useState([])

    // const getApptTime = (tmslot) => {
    //     if (reserved.includes(tmslot)) {
    //         alert('Already reserved')
    //     }
    //     else {
    //         props.setApptTime(tmslot);
    //         props.setShowTime(false)
    //     }
    // }

    // useEffect(() => {
    //     const apptUrl = `http://localhost:3001/bookings/${props.startDate.toUTCString()}/${props.pincode}`;
    //     const getCurrentAppts = async () => {
    //         try {
    //             const response = await axios.get(
    //                 apptUrl
    //             )
    //                 .then(response => {
    //                     if (response.status === 200) {
    //                         const ampm = response.data.map((tm) => {
    //                             let H = tm.substr(0, 2)
    //                             let h = H % 12 || 12
    //                             let ampm = (H < 12 || H === 24) ? " AM" : " PM"
    //                             tm = h + tm.substr(2, 3) + ampm
    //                             return tm
    //                         })
    //                         setReserved(ampm)
    //                     }
    //                 })
    //         } catch (err) {
    //             setReserved(null);
    //         }
    //     }
    //     getCurrentAppts()

    // }, [])

    // var cardStyle = {
    //     display: 'block',
    //     width: '18vw',
    //     transitionDuration: '0.3s',
    //     height: '58vw',
    //     backgroundColor: 'white',
    //     position: 'absolute',
    //     zIndex: 'modal',
    //     border: '1',

    // }
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
            {/* </Container> */}
            {/* <Card style={cardStyle}
                sx={{ maxHeight: 900, border: 1, marginLeft: 6, position: 'absolute' }}
            >
                <CardContent>
                    <Typography gutterBottom variant="subtitle1" component="div" sx={{ textAlign: 'center' }}>
                        Time Slots
                        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                            <Box
                                sx={{
                                    width: 80,
                                    height: 30,
                                    backgroundColor: '#42e3f5',
                                    '&:hover': {
                                        backgroundColor: 'primary.main',
                                        opacity: [0.9, 0.8, 0.7],
                                    },
                                }}
                            />
                            <Box
                                sx={{
                                    width: 90,
                                    height: 30,
                                    border: 1,
                                    marginLeft: 2,
                                    backgroundColor: 'white',
                                    '&:hover': {
                                        backgroundColor: 'primary.main',
                                        opacity: [0.9, 0.8, 0.7],
                                    },
                                }}
                            />
                        </Box>
                    </Typography>
                    <Typography divider component='div' variant='subtitle1' sx={{ textAlign: 'center' }}>Booked : Free</Typography>
                    <Grid container columns={{ xs: 2, sm: 4, md: 6 }} sx={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)' }}>
                        {blocks.map((tmslot, index) => (
                            <Grid item
                                className=
                                {classes.item} key={index} sx={{ width: 95, height: 31, }}
                            >
                                <Item className=
                                    {classes.item} key={index} sx={{
                                        backgroundColor: (reserved.includes(tmslot) ? '#42e3f5' : 'white'), marginLeft: 0
                                    }}
                                    onClick={() => getApptTime(tmslot)
                                    }>
                                    <a href="#">{tmslot}</a></Item>
                            </Grid>
                        ))}
                    </Grid>
                </CardContent>
                <CardActions>
                </CardActions>
            </Card> */}
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
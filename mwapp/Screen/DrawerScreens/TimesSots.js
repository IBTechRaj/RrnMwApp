import { isBefore, setHours, setMinutes, addMinutes } from 'date-fns'
import { useState, useEffect } from 'react'
import * as React from 'react';
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

export default function ResponsiveGrid(props) {
    const setTime = (x, h = 0, m = 0) => setHours(setMinutes(x, m), h)
    const from = setTime(new Date(), 7)
    const to = setTime(new Date(), 21)
    const step = (x) => addMinutes(x, 30)
    const blocks = []
    let cursor = from
    while (isBefore(cursor, to)) {
        blocks.push(cursor.toLocaleTimeString().slice(-11, -6) + cursor.toLocaleTimeString().slice(-3))
        cursor = step(cursor)
    }

    // const classes = useStyles()
    const [reserved, setReserved] = useState([])

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

    var cardStyle = {
        display: 'block',
        width: '18vw',
        transitionDuration: '0.3s',
        height: '58vw',
        backgroundColor: 'white',
        position: 'absolute',
        zIndex: 'modal',
        border: '1',

    }

    return (
        <>
            <container>
                {/* <Header /> */}
                <Content>
                    {blocks.map((tmslot, index) => {
                        <ListItem>
                            <Text>
                                {item}
                                {blocks[index + 1] ? ' - ' + blocks[index + 1] : ''}
                            </Text>
                        </ListItem>
                    })}
                </Content>
            </container>
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


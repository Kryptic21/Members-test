import { Grid } from '@material-ui/core';
import payment_image from '../assets/payment_image.jpg';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import logo from '../assets/leap_club_black.png';
import React from 'react';
import { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';
import './Image.css';

const useStyles = makeStyles((theme) => ({
    radio: {
        textTransform: 'lowercase',
    },
}));

function PaymentEmandate900() {
    const classes = useStyles();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [text, setText] = useState('');
    const [disabled, setDisabled] = useState(true);
    const onChangeName = (event) => {
        setName(event.target.value);
        if (email && event.target.value && phone && validateEmail(email)) {
            setDisabled(false);
            document.getElementById('submit').style.backgroundColor = 'green';
        } else {
            setDisabled(true);
            document.getElementById('submit').style.backgroundColor = '#cfa25b';
        }
    };
    const onChangeEmail = (event) => {
        setEmail(event.target.value.trim());
        if (event.target.value && name && phone && validateEmail(event.target.value.trim())) {
            setDisabled(false);
            document.getElementById('submit').style.backgroundColor = 'green';
        } else {
            setDisabled(true);
            document.getElementById('submit').style.backgroundColor = '#cfa25b';
        }
    };
    const onChangePhone = (event) => {
        setPhone(event.target.value.trim());
        if (email && name && event.target.value && validateEmail(email)) {
            setDisabled(false);
            document.getElementById('submit').style.backgroundColor = 'green';
        } else {
            setDisabled(true);
            document.getElementById('submit').style.backgroundColor = '#cfa25b';
        }
    };
    function validateEmail(email) {
        const re =
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }
    const onClick = async (event) => {
        try {
            if (!email || !name || !phone) {
                setText('please enter values for all the fields');
                return;
            }
            if (!validateEmail(email)) {
                setText('please enter valid email address');
                return;
            }
            setDisabled(true);
            let result = '';
            let link = '';
            result = await axios.post('https://api.leap.club/v1/sparkEMandate/get900Link', {
                name: `${name}`,
                email: `${email}`,
                phoneNumber: `${phone}`,
            });
            console.log(result);
            link = result.data.data.short_url;
            setName('');
            setEmail('');
            setPhone('');
            setText(
                <Grid item xs={12}>
                    you'll shortly receive an email &amp; text (india only) with the payment link. you can also click on
                    the link below to proceed with the payment.
                    <br />
                    <br />
                    please checkout this link:{' '}
                    <a href={link} style={{ fontSize: '20px' }}>
                        {link}
                    </a>
                </Grid>,
            );
        } catch (e) {
            console.log(e);
            setText('please check the details entered');
            setDisabled(false);
        }
    };
    return (
        <div style={{ padding: '2% 5%', marginBottom: '10%' }}>
            <Grid container>
                <Grid item sm={12} md={6}>
                    <div>
                        <a href='https://www.leap.club'>
                            <img src={logo} style={{ width: '150px' }} alt='leap.club' />
                        </a>
                    </div>{' '}
                    <br />
                    <div>
                        INR 900 payment via emandate
                        <br />
                        <br />
                        <br />
                        <form>
                            <Grid container>
                                <Grid item xs={4} style={{ paddingTop: '1%' }}>
                                    full name*
                                </Grid>
                                <Grid item xs={8}>
                                    <TextField
                                        id='outlined'
                                        size='small'
                                        value={name}
                                        onChange={onChangeName}
                                        variant='outlined'
                                    />
                                    <br />
                                    <br />
                                </Grid>
                            </Grid>
                            <Grid container>
                                <Grid item xs={4} style={{ paddingTop: '1%' }}>
                                    email id*
                                </Grid>
                                <Grid item xs={8}>
                                    <TextField
                                        id='outlined'
                                        size='small'
                                        value={email}
                                        onChange={onChangeEmail}
                                        variant='outlined'
                                    />
                                    <br />
                                    <br />
                                </Grid>
                            </Grid>
                            <Grid container>
                                <Grid item xs={4} style={{ paddingTop: '1%', paddingRight: '1%' }}>
                                    10 digit phone number*
                                    <br />
                                    <span style={{ fontSize: '10px' }}>
                                        if you do not have an indian phone number, then use 9999999999
                                    </span>
                                </Grid>
                                <Grid item xs={8}>
                                    <TextField
                                        id='outlined'
                                        size='small'
                                        value={phone}
                                        onChange={onChangePhone}
                                        variant='outlined'
                                    />
                                    <br />
                                    <br />
                                </Grid>
                            </Grid>
                            <br />
                            <br />
                            <Button
                                variant='contained'
                                id='submit'
                                onClick={onClick}
                                disabled={disabled}
                                style={{ backgroundColor: '#cfa25b' }}
                                className={classes.radio}>
                                submit
                            </Button>
                        </form>
                    </div>
                    <br />
                    <br />
                    <Grid
                        container
                        style={{
                            paddingRight: '3%',
                            display: 'flex',
                            marginBottom: '5%',
                        }}>
                        {text}
                    </Grid>
                </Grid>
                <Grid item sm={false} md={6}>
                    <img
                        src={payment_image}
                        alt='payment'
                        style={{ width: '75%', paddingTop: '7%' }}
                        className='image'
                    />
                </Grid>
            </Grid>
        </div>
    );
}

export default PaymentEmandate900;

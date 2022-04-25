import { React, useState } from 'react';
import logo from '../assets/leap_club_black.png';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import axios from 'axios';
import image from '../assets/login-banner.jpeg';
import { Grid } from '@material-ui/core';
import './Image.css';

function ForgotPassword() {
    const [disabled, setDisabled] = useState(true);
    const [email, setEmail] = useState('');
    const [text, setText] = useState('');
    function validateEmail(email) {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }
    const onChange = (event) => {
        setEmail(event.target.value);
        if (validateEmail(event.target.value)) {
            setDisabled(false);
        } else {
            setDisabled(true);
        }
    };
    const onClick = async (event) => {
        try {
            if (!validateEmail(email)) {
                setText('please enter a valid email address');
                return;
            }
            const result = await axios.post(
                'https://api.leap.club/v1/forgot-password',
                {
                    email: `${email}`,
                }
            );
            console.log(result);
            setText('we have sent a link to reset password on your email id!');
            setDisabled(true);
        } catch (e) {
            console.log(e);
            setText("we don't recognize this email. please check!");
            setDisabled(false);
        }
    };
    return (
        <div style={{ padding: '0 5%' }}>
            <Grid
                container
                style={{
                    backgroundColor: 'rgba(207,162,91,.1)',
                    padding: '1%',
                }}
            >
                <Grid
                    item
                    sm={12}
                    md={6}
                    style={{ paddingTop: '2%', paddingRight: '5%' }}
                >
                    <div>
                        <br />
                        <a href="https://www.leap.club">
                            <img
                                src={logo}
                                style={{ width: '150px', marginLeft: '-10px' }}
                                alt="leap.club"
                            />
                        </a>
                    </div>{' '}
                    <br />
                    <br />
                    <br />
                    <br />
                    <div style={{ fontSize: 'large' }}>
                        <h2>recover password for your leap account.</h2>
                        <br />
                        <div style={{paddingLeft: '3%'}}>
                            <form>
                                <TextField
                                    id="outlined"
                                    variant="outlined"
                                    value={email}
                                    onChange={onChange}
                                    label="please enter email id"
                                />
                                <br />
                                <br />
                                <Button
                                    variant="contained"
                                    id="submit"
                                    onClick={onClick}
                                    style={{ backgroundColor: '#cfa25b' }}
                                    disabled={disabled}
                                >
                                    submit
                                </Button>
                            </form>
                            <br />
                            <div style={{ fontSize: 'x-large' }}>{text}</div>
                        </div>
                    </div>
                </Grid>
                <Grid item sm={false} md={6}>
                    <img
                        src={image}
                        alt="payment"
                        style={{ width: '75%' }}
                        className="image"
                    />
                </Grid>
            </Grid>
        </div>
    );
}

export default ForgotPassword;

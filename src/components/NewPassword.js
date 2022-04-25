import { Grid } from '@material-ui/core';
import image from '../assets/login-banner.jpeg';
import logo from '../assets/leap_club_black.png';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import React, { useEffect, useState } from 'react';
import './Image.css';
import axios from 'axios';

function NewPassword() {
    const [id, setId] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [disabled, setDisabled] = useState(true);
    const [text, setText] = useState('');
    const onChangeNewPassword = (event) => {
        setNewPassword(event.target.value);
        if (event.target.value === confirmPassword && event.target.value && confirmPassword) {
            setDisabled(false);
        }
        else {
            setDisabled(true);
        }
    };
    const onChangeConfirmPassword = (event) => {
        setConfirmPassword(event.target.value);
        if (newPassword === event.target.value && newPassword && event.target.value) {
            setDisabled(false);
        }
        else {
            setDisabled(true);
        }
    };
    const onClick = async () => {
        try {
            const result = await axios.post('https://api.leap.club/v1/setNewPassword',{
                token: `${id}`,
                newPassword: `${newPassword}`,
            });
            console.log(result);
            setDisabled(true);
            setText('your password has been updated!');
        } catch (e) {
            console.log(e);
            setDisabled(false);
            setText("unable to set new password.");
        }
    };
    useEffect(()=>{
        setId(window.location.href.split('new-password/')[1]);
    },[]);
    return (
        <div style={{padding: '0 5%'}}>
            <Grid container style={{backgroundColor: 'rgba(207,162,91,.1)', padding: '1%'}}>
                <Grid item sm={12} md={6} style={{paddingTop: '2%', paddingRight: '5%'}}>
                <div><br/>
                    <a href="https://www.leap.club"><img src={logo} style={{width: '150px', marginLeft: '-10px'}} alt="leap.club" /></a>
                </div> <br/><br/><br/>
                   <div style={{fontSize: 'large'}}>
                        <h3>reset password for your leap account.</h3><br/><br/>
                        <form>
                            <Grid container>
                                <Grid item xs={6} style={{padding: '2%'}}>
                                    new password
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField id="outlined" size="small" variant="outlined" type="password" value={newPassword} onChange={onChangeNewPassword} /><br/><br/>
                                </Grid>
                            </Grid>
                            <Grid container>
                                <Grid item xs={6} style={{padding: '2%'}}>
                                    re-enter new password
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField id="outlined" size="small" variant="outlined" type="password" value={confirmPassword} onChange={onChangeConfirmPassword} /><br/><br/>
                                </Grid>
                            </Grid><br/>
                            <Button variant="contained" id="submit" onClick={onClick} disabled={disabled} style={{backgroundColor: '#cfa25b'}}>submit</Button>
                            <br/><br/><span>{text}</span>
                        </form>
                    </div><br/><br/><br/><br/>
                    <div>
                        <span style={{color: '#899093'}}>forgot password? click <a href="/forgot-password" style={{color: '#899093'}}>here</a> to reset</span><br/><br/>
                        <span style={{color: '#899093'}}>don't have an account? <a href="https://www.leap.club#waitlist" style={{color: '#899093'}}>join our waitlist</a> to become a leap member</span><br/><br/>
                        <span style={{color: '#899093'}}>to go back to leap.club click <a href="https://www.leap.club" style={{color: '#899093'}}>here</a></span>
                    </div>
                </Grid>
                <Grid item sm={false} md={6}>
                    <img src={image} alt="payment" style={{width: '75%'}} className="image" />
                </Grid>
            </Grid>
        </div>
    )
}

export default NewPassword

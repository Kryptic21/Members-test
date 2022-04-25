import { Grid } from '@material-ui/core';
import image from '../assets/login-banner.jpeg';
import logo from '../assets/leap_club_black.png';
import appStore from '../assets/app-store.png';
import playStore from '../assets/play-store.png';
import React from 'react';
import './Image.css';

function Login() {
    return (
        <div style={{padding: '0 5%'}}>
            <Grid container style={{backgroundColor: 'rgba(207,162,91,.1)', padding: '1%'}}>
                <Grid item sm={12} md={6} style={{paddingTop: '2%', paddingRight: '5%'}}>
                <div><br/>
                    <a href="https://www.leap.club"><img src={logo} style={{width: '150px', marginLeft: '-10px'}} alt="leap.club" /></a>
                </div> <br/><br/><br/><br/>
                   <div style={{fontSize: 'large'}}>
                        members,
                        <br/>
                        we have great news!
                        <br/>
                        to make the experience even better for you, leap.club is now app only.
                        <br/><br/><br/>
                        <Grid container>
                            <Grid item sm={2}>
                                <a href="https://apps.apple.com/in/app/leap-club/id1534682865"><img src={appStore} width="50px" /></a>
                            </Grid>
                            <Grid item sm={2}>
                                <a href="https://play.google.com/store/apps/details?id=com.leapclub"><img src={playStore} width="50px" /></a>
                            </Grid>
                        </Grid>
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

export default Login;
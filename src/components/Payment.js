import { Grid, Typography } from "@material-ui/core";
// import payment_image from "../assets/payment_image.jpg";
import payment_image from "../assets/new-banner.jpeg";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
// import logo from "../assets/leap_club_black.png";
import logo from "../assets/leap_og_image_new.jpg";
import React from "react";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { withStyles } from "@material-ui/core/styles";
import axios from "axios";
import "./Image.css";
import { useEffect, useRef } from "react";
import { useLocation, Redirect, Link, NavLink } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  radio: {
    textTransform: "lowercase",
  },
}));

const GoldenRadio = withStyles({
  root: {
    "&$checked": {
      // color: "#cfa25b",
      color: "#fa541a",
    },
  },
  checked: {},
})((props) => <Radio color="default" {...props} />);

function Payment() {
  const location = useLocation();
  const paramEmail = new URLSearchParams(location.search).get("email");
  const paramPhone = new URLSearchParams(location.search).get("phonenumber");
  const paramWaitlistId = new URLSearchParams(location.search).get(
    "waitlistId"
  );

  const classes = useStyles();
  const [name, setName] = useState("");
  const [email, setEmail] = useState(paramEmail ? paramEmail : "");
  const [phone, setPhone] = useState(paramPhone ? paramPhone : "");
  const [text, setText] = useState("");
  const [inviteFrom, setInviteFrom] = useState("");
  const [disabled, setDisabled] = useState(true);
  const [description, setDescription] = useState(
    <div>
      <ul>
        <li>
          once you click on submit, you will be redirected to the razorpay
          website to complete the payment.
        </li>
        <li>
          once the payment is complete, you'll receive the onboarding form from
          team@leap.club. please fill this out within the next 24-48 hours.
        </li>
        <li>
          you will be debited rs 5000 upfront for 12 months (which comes up to
          rs 417/month). you can pay via net banking, upi, credit or debit card.
        </li>
        <li>
          you'll receive your leap.club login credentials on the membership
          start date.
        </li>
      </ul>
    </div>
  );
  const [inviteFromDisabled, setInviteFromDisabled] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("annual payment");
  const [nameError, setNameError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [phoneNumberError, setPhoneNumberError] = useState(false);
  const [paymentMethodError, setPaymentMethodError] = useState(false);
  const [paymentLink, setPaymentLink] = useState("");
  const linkRef = useRef();
  const nameRef = useRef();
  const emailRef = useRef();
  const phoneNumberRef = useRef();
  const paymentLinkRef = useRef();

  useEffect(() => {
    setInviteFrom(document.location.href.split("invitefrom=")[1]);
    if (document.location.href.split("invitefrom=")[1]) {
      setInviteFromDisabled(true);
    }
  }, []);

  const validatePhoneNumber = (number) => {
    if (Number(number)) {
      return true;
    } else {
      return false;
    }
  };

  function handleSubmitScroll() {
    linkRef.current.scrollIntoView({ behavior: "smooth" });
  }
  const handleRadioChange = (event) => {
    setPaymentMethod(event.target.value);
    console.log("event.target.value", event.target.value);
    if (event.target.value.length > 0) {
      setPaymentMethodError(false);
    }
    if (
      email &&
      name &&
      phone &&
      validatePhoneNumber(phone) &&
      validateEmail(email) &&
      event.target.value
    ) {
      setDisabled(false);
      document.getElementById("submit").style.backgroundColor =
        "linear-gradient(90deg,rgba(21,101,192,1),rgba(185,43,39,1))";
      // document.getElementById("submit").style.opacity = "1";
    } else {
      setDisabled(true);
      // document.getElementById("submit").style.backgroundColor = "#cfa25b";
      document.getElementById("submit").style.backgroundColor =
        "linear-gradient(90deg,rgba(21,101,192,1),rgba(185,43,39,1))";
      // document.getElementById("submit").style.opacity = "0.8";
    }
    switch (event.target.value) {
      case "upi":
        setDescription(
          <div>
            <ul>
              <li>
                once you click on submit, you will receive a payment link via
                email and sms.{" "}
              </li>
              <li>
                select the upi option and then the bank with which your upi
                account is linked.{" "}
                <b>
                  currently, the banks supported are hdfc, axis, icici and sbi
                  via paytm and bhim
                </b>
                .
              </li>
              <li>
                enter your upi id (for example abc123@paytm if you're using the
                paytm upi).
              </li>
              <li>head to your paytm/bhim app to make the payment.</li>
              <li>
                rs 1,800 will be charged towards two months of membership. the
                first payment of rs 1,800 will cover the first two months of
                your subscription. from the 25th of the second month, there will
                be a recurring monthly debit of rs 900 on the 25th of every
                month.
              </li>
              <li>
                once the payment is complete, you'll receive the onboarding form
                from team@leap.club. please fill this out within the next 24-48
                hours.
              </li>
              <li>
                this payment feature is currently not available on google pay or
                phonePe. we encourage you to create a new upi account on paytm,
                it will take less than 5 mins :){" "}
              </li>
              <li>
                you'll receive your leap.club login credentials on the
                membership start date along with a starter kit to help you get
                started.
              </li>
            </ul>
          </div>
        );
        break;
      case "annual payment":
        setDescription(
          <div>
            <ul>
              <li>
                once you click on submit, you will receive a payment link via
                email and sms.
              </li>
              <li>
                once the payment is complete, you'll receive the onboarding form
                from team@leap.club. please fill this out within the next 24-48
                hours.
              </li>
              <li>
                you will be debited rs 5000 upfront for 12 months (which comes
                up to rs 417/month). you can pay via net banking, upi, credit or
                debit card.
              </li>
              <li>
                you'll receive your leap.club login credentials on the
                membership start date.
              </li>
            </ul>
          </div>
        );
        break;
      case "recurring debit via net banking ":
        setDescription(
          <div>
            <ul>
              <li>
                once you click on submit, you will receive a payment link via
                email and sms.
              </li>
              <li>
                once the mandate is approved, the first payment of rs 1,800
                should get approved within 48 hours. the first payment of rs
                1,800 will cover the first two months of your subscription. from
                the 25th of the second month, there will be a recurring monthly
                debit of rs 900 on the 25th of every month.
              </li>
              <li>
                once the payment is complete, you'll receive the onboarding form
                from team@leap.club. please fill this out within next 24-48
                hours.
              </li>
              <li>
                this payment option requires a bit of patience but remember your
                leap.club membership is waiting on the other side :)
              </li>
            </ul>
          </div>
        );
        break;
      default:
        return <></>;
    }
  };
  const onChangeName = (event) => {
    setName(event.target.value);
    if (event.target.value.length > 0) {
      setNameError(false);
    }
    if (
      email &&
      event.target.value &&
      phone &&
      validateEmail(email) &&
      paymentMethod
    ) {
      setDisabled(false);
      document.getElementById("submit").style.backgroundColor =
        "linear-gradient(90deg,rgba(21,101,192,1),rgba(185,43,39,1))";
      // document.getElementById("submit").style.opacity = "1";
    } else {
      setDisabled(true);
      // document.getElementById("submit").style.backgroundColor = "#cfa25b";
      // document.getElementById("submit").style.opacity = "0.8";
    }
  };
  const onChangeEmail = (event) => {
    setEmail(event.target.value.trim());
    if (
      event.target.value.length > 0 &&
      validateEmail(event.target.value.trim())
    ) {
      setEmailError(false);
    }
    if (
      event.target.value &&
      name &&
      phone &&
      validateEmail(event.target.value.trim()) &&
      paymentMethod
    ) {
      setDisabled(false);
      document.getElementById("submit").style.backgroundColor =
        "linear-gradient(90deg,rgba(21,101,192,1),rgba(185,43,39,1))";
      // document.getElementById("submit").style.opacity = "1";
    } else {
      setDisabled(true);
      // document.getElementById("submit").style.backgroundColor = "#cfa25b";
      // document.getElementById("submit").style.opacity = "0.8";
    }
  };
  const onChangePhone = (event) => {
    setPhone(event.target.value.trim());
    if (
      event.target.value.length > 0 &&
      validatePhoneNumber(event.target.value.trim())
    ) {
      setPhoneNumberError(false);
    }
    if (
      email &&
      name &&
      event.target.value &&
      validateEmail(email) &&
      paymentMethod
    ) {
      setDisabled(false);
      document.getElementById("submit").style.backgroundColor =
        "linear-gradient(90deg,rgba(21,101,192,1),rgba(185,43,39,1))";
      // document.getElementById("submit").style.opacity = "1";
    } else {
      setDisabled(true);
      // document.getElementById("submit").style.backgroundColor = "#cfa25b";
      // document.getElementById("submit").style.opacity = "0.8";
    }
  };
  function validateEmail(email) {
    const re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

  const onOpenNewTab = (link) => {
    console.log("calling after 1st function");
    console.log("paymentLink", link);
    if (!link) {
      return window.open("http://www.google.com", "_blank", "noreferrer");
    }

    let a = document.createElement("a");
    // a.style.cursor = "pointer";
    a.href = `${link}`;
    // a.setAttribute("href", `${paymentLink}`);
    a.setAttribute("target", "_blank");
    // a.setAttribute("rel", "noreferrer,noopener");
    a.click();
    console.log("In last of new tab");
    // window.open(link, "_blank", "noreferrer");
  };

  const onClick = async (event) => {
    console.log("calling first");
    try {
      // if (!email || !name || !phone || !paymentMethod) {
      // 	setText("please enter values for all the fields");
      // 	return;
      // }
      if (!name) {
        nameRef.current.scrollIntoView({ behavior: "smooth" });
        nameRef.current.focus();
        return setNameError("please enter a valid name");
      }
      if (!email || !validateEmail(email)) {
        emailRef.current.scrollIntoView({ behavior: "smooth" });
        emailRef.current.focus();
        return setEmailError("please enter a valid email address");
      }
      if (!phone || !validatePhoneNumber(phone)) {
        phoneNumberRef.current.scrollIntoView({ behavior: "smooth" });
        phoneNumberRef.current.focus();
        return setPhoneNumberError(
          "please enter a valid phone number without any symbols"
        );
      }
      // if (!paymentMethod) {
      // 	return setPaymentMethodError("please choose a payment method");
      // }
      // if (!validateEmail(email)) {
      // 	setText("please enter valid email address");
      // 	return;
      // }
      setDisabled(true);
      let result = "";
      // let windowReference = window.open();
      switch (paymentMethod) {
        case "upi":
          if (inviteFrom) {
            result = await axios.post(
              "https://api.leap.club/v1/spark/paymentLink",
              {
                name: `${name}`,
                email: `${email}`,
                phoneNumber: `${phone}`,
                inviteFrom: `${inviteFrom}`,
                waitlistId: paramWaitlistId,
              }
            );
          } else {
            result = await axios.post(
              "https://api.leap.club/v1/spark/paymentLink",
              {
                name: `${name}`,
                email: `${email}`,
                phoneNumber: `${phone}`,
                waitlistId: paramWaitlistId,
              }
            );
          }

          paymentLinkRef.current = result.data.data.short_url;
          // setPaymentLink(result.data.data.short_url);
          // windowReference.location = paymentLinkRef.current;
          window.location.assign(result.data.data.short_url);
          break;

        case "annual payment":
          if (inviteFrom) {
            result = await axios.post(
              "https://api.leap.club/v1/sparkAnnual/getLink",
              {
                name: `${name}`,
                email: `${email}`,
                phoneNumber: `${phone}`,
                inviteFrom: `${inviteFrom}`,
                waitlistId: paramWaitlistId,
              }
            );
          } else {
            result = await axios.post(
              "https://api.leap.club/v1/sparkAnnual/getLink",
              {
                name: `${name}`,
                email: `${email}`,
                phoneNumber: `${phone}`,
                waitlistId: paramWaitlistId,
              }
            );
          }
          console.log(result);
          paymentLinkRef.current = result.data.data.short_url;
          // onOpenNewTab(link);
          // setPaymentLink(result.data.data.short_url);
          // windowReference.location = paymentLinkRef.current;
          window.location.assign(result.data.data.short_url);

          break;
        case "recurring debit via net banking ":
          if (inviteFrom) {
            result = await axios.post(
              "https://api.leap.club/v1/sparkEMandate/getLink",
              {
                name: `${name}`,
                email: `${email}`,
                phoneNumber: `${phone}`,
                inviteFrom: `${inviteFrom}`,
                waitlistId: paramWaitlistId,
              }
            );
          } else {
            result = await axios.post(
              "https://api.leap.club/v1/sparkEMandate/getLink",
              {
                name: `${name}`,
                email: `${email}`,
                phoneNumber: `${phone}`,
                waitlistId: paramWaitlistId,
              }
            );
          }
          console.log(result);
          // paymentLinkRef.current = result.data.data.short_url;
          // setPaymentLink(result.data.data.short_url);
          // windowReference.location = paymentLinkRef.current;
          // window.open(result.data.data.short_url, "_blank")?.focus();
          window.location.assign(result.data.data.short_url);

          break;
        default:
          return null;
      }
      setName("");
      setEmail("");
      setPaymentMethod("");
      setPhone("");
      if (!inviteFromDisabled) {
        setInviteFrom("");
      }
      setText(
        <Grid item xs={12}>
          <b>your details have been recorded.</b>
          <br />
          you'll shortly receive an email &amp; text (india only) with the
          payment link. you can also click on the link below to proceed with the
          payment.
          <br />
          <br />
          please checkout this link:{" "}
          <a
            href={paymentLinkRef.current}
            target="_blank"
            rel="noreferrer noopener"
            style={{ fontSize: "20px" }}
          >
            {paymentLinkRef.current}
          </a>
          {/* {onOpenNewTab(link)} */}
        </Grid>
      );
      console.log("present in the last of first");
    } catch (e) {
      console.log(e);

      setText("please check the details entered and resubmit");
      setDisabled(false);
    }
    handleSubmitScroll();
  };

  return (
    <div style={{ padding: "2% 5%", marginBottom: "10%" }}>
      <Grid container>
        <Grid item sm={12} md={6}>
          <div>
            <a href="https://www.leap.club">
              <img
                src={logo}
                style={{ width: "70px", height: "50%" }}
                alt="leap.club"
              />
            </a>
          </div>{" "}
          <br />
          <div>
            welcome to leap.club 👋
            <br />
            <br /> we are super excited to onboard you as a member. the world
            needs more leaders and role models - it's time for you to become
            one. you are joining thousands of women who have already taken the
            leap.
            <br />
            we look forward to building leap.club with you 🤝
            <br />
            <br />
            please enter following details to proceed.
            <br />
            <br />
            <br />
            <form>
              <Grid container>
                <Grid item xs={4} style={{ paddingTop: "1%" }}>
                  full name*
                </Grid>
                <Grid item xs={8}>
                  <TextField
                    type="text"
                    id="outlined"
                    size="small"
                    value={name}
                    onChange={onChangeName}
                    variant="outlined"
                    inputRef={nameRef}
                    autoComplete="on"
                  />
                  <br />
                  {nameError && (
                    <Typography color="error">{nameError}</Typography>
                  )}

                  <br />
                </Grid>
              </Grid>
              <Grid container>
                <Grid item xs={4} style={{ paddingTop: "1%" }}>
                  email id*
                </Grid>
                <Grid item xs={8}>
                  <TextField
                    id="outlined"
                    size="small"
                    value={email}
                    onChange={onChangeEmail}
                    variant="outlined"
                    inputRef={emailRef}
                    autoComplete="on"
                  />
                  <br />
                  {emailError && (
                    <Typography color="error">{emailError}</Typography>
                  )}
                  <br />
                </Grid>
              </Grid>
              <Grid container>
                <Grid
                  item
                  xs={4}
                  style={{ paddingTop: "1%", paddingRight: "1%" }}
                >
                  10 digit phone number*
                  <br />
                  <span style={{ fontSize: "10px" }}>
                    if you do not have an indian phone number, then use
                    9999999999
                  </span>
                </Grid>
                <Grid item xs={8}>
                  <TextField
                    id="outlined"
                    size="small"
                    value={phone}
                    onChange={onChangePhone}
                    variant="outlined"
                    inputRef={phoneNumberRef}
                    autoComplete="on"
                  />
                  <br />
                  {phoneNumberError && (
                    <Typography color="error">{phoneNumberError}</Typography>
                  )}
                  <br />
                </Grid>
              </Grid>
              {inviteFrom && (
                <Grid container>
                  <Grid
                    item
                    xs={4}
                    style={{ paddingTop: "1%", paddingRight: "2%" }}
                  >
                    invite code
                  </Grid>
                  <Grid item xs={8}>
                    <TextField
                      id="outlined"
                      size="small"
                      disabled={inviteFromDisabled}
                      value={inviteFrom}
                      variant="outlined"
                    />
                    <br />
                    <br />
                  </Grid>
                </Grid>
              )}
              <br />
              <br />
              <div>
                payment details* 💳 <br />
                <br />
              </div>
              <RadioGroup
                row
                value={paymentMethod}
                // onChange={handleRadioChange}
                className={classes.radio}
                defaultValue="annual payment"
              >
                <Grid container>
                  {/* <Grid item xs={12} md={3}>
                    <Button
                      style={{
                        justifyContent: "flex-start",
                      }}
                    >
                      <FormControlLabel
                        value="upi"
                        control={<GoldenRadio color="primary" />}
                        label="upi"
                       
                        className={classes.radio}
                      />
                    </Button>
                  </Grid> */}
                  <Grid item xs={12} md={4}>
                    <Button
                      style={{
                        justifyContent: "flex-start",
                      }}
                    >
                      <FormControlLabel
                        value="annual payment"
                        control={<GoldenRadio color="primary" />}
                        label="annual payment"
                        className={classes.radio}
                        checked={true}
                      />
                    </Button>
                  </Grid>
                  {/* <Grid item xs={12} md={5}>
										<Button
											style={{
												justifyContent: "flex-start",
											}}
										>
											<FormControlLabel
												value="recurring debit via net banking "
												control={<GoldenRadio color="primary" />}
												label="recurring debit via net banking "
												className={classes.radio}
											/>
										</Button>
									</Grid>*/}
                </Grid>
              </RadioGroup>
              {paymentMethodError && (
                <Typography color="error">{paymentMethodError}</Typography>
              )}
              <div>
                <br />
                {description}
                <br />
              </div>
              <Button
                variant="contained"
                id="submit"
                onClick={(event) => {
                  onClick();
                }}
                // disabled={disabled}
                // style={{ backgroundColor: "#cfa25b" }}
                style={{
                  background: disabled
                    ? "radial-gradient(100% 1267.36% at 0% 50%,rgba(244, 43, 77, 0.8) 0%,rgba(250, 84, 26, 0.8) 100%)"
                    : "radial-gradient(100% 1267.36% at 0% 50%,#f42b4d 0%,#fa541a 100%)",
                  // background:
                  // 	"linear-gradient(90deg,rgba(21,101,192,1),rgba(185,43,39,1))",
                  textTransform: "lowercase",
                  color: "#fff",
                  // opacity: "0.8",
                }}
                // className={classes.radio}
              >
                submit
              </Button>
            </form>
            <br />
            {/* {paymentLinkRef.current && onOpenNewTab(paymentLinkRef.current)} */}
            still unsure about taking the leap?{" "}
            <a
              target="_blank"
              href="https://calendly.com/aanchal25/"
              style={{ color: "orangered" }}
            >
              schedule
            </a>{" "}
            a call with aanchal mehta, our first team member on why this is
            going to be an investment worth making 🙂
            <br />
          </div>
          <br />
          <br />
          <Grid
            container
            style={{
              paddingRight: "3%",
              display: "flex",
              marginBottom: "30%",
            }}
          >
            <div ref={linkRef}>{text}</div>
          </Grid>
        </Grid>
        <Grid item sm={false} md={6}>
          <img
            src={payment_image}
            alt="payment"
            style={{ width: "450px", paddingTop: "10%", marginLeft: "3rem" }}
            className="image"
          />
        </Grid>
      </Grid>
    </div>
  );
}

export default Payment;

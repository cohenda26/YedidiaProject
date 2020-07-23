import React from 'react';
import { useState } from 'react';
import { useForm } from "react-hook-form";
import { Link} from 'react-router-dom';
import { Row, Col, Form, Button, Card, Container, Figure } from 'react-bootstrap';
import { GoogleLogin } from 'react-google-login';
import { LinkedIn } from 'react-linkedin-login-oauth2';
import Captcha from "demos-react-captcha";
import { FieldEmail } from "../components/FieldEmail";
import { FieldAvatar } from "../components/FieldAvatar";

import "../../assets/css/style.css";

// Code secret client Google : DhTmuhus2k3nrbXhdoF25-6U
// Code secret client Linkedin : AHiRJIjvym8cEaSg
// Cle recaptcha : 6LfXqbMZAAAAAJ51u2RR5suEy8y_Eea6QjC_9yaN
// cle secret recaptcha : 6LfXqbMZAAAAAIgRNOPwEfxKQa9fV7q91QMbXeTV

const socialConnection = 0;
const emailConnection = 1;

function CardEmailConnection ({register, errors, onClickEmail, onStateCaptcha}) {
    const clickEmail = onClickEmail;
    const stateCaptcha = onStateCaptcha;

    const clickToSocial = (event) => {
        event.preventDefault();
        clickEmail(socialConnection)
    }

    const captchaChange = (value) => {
        stateCaptcha(value);
    }
    
    const captchaRefresh = () => {
        stateCaptcha(false);
    }
    
    return (
        <div>
            <Card>
                <Card.Header>Your details</Card.Header>
                <Card.Body>
                    <Form.Row>
                        <Form.Group as={Col} controlId="formYourDetailName">
                            <Form.Label>Name</Form.Label>
                            <Form.Control  type="text"
                                    placeholder="John Doe" 
                                    name="myName" 
                                    ref={register({required : true, minLength : {value : 3, message :" At least 3 chars"}, maxLength : {value : 25, message :" Too long message"} }) } 
                            />
                            {errors.myName && <span className="alert-danger" role="alert"> My name is required </span>}
                        </Form.Group>

                        <FieldEmail register={register} errors={errors} />
                    </Form.Row>
                    <Form.Row className="justify-content-md-center">
                        <p> or use you <a href="" onClick={clickToSocial}>existing accounts</a> </p>
                    </Form.Row>
                </Card.Body>

            </Card>
            <Captcha onChange={captchaChange} onRefresh={captchaRefresh} placeholder="Type the caracters you see" />
        </div>
    )

}

function CardUser ({_userName, _avatar}) {
    
    console.log(' SignUp - Card User parameters ', _userName, _avatar);

    return (
        <Card>
            <Card.Header>Your details</Card.Header>
            <Card.Body>
                <Form.Row>
                    <Form.Group as={Col} controlId="formYourDetailsGoogle">
                        <Form.Label>Successfully connected as :</Form.Label>
                    </Form.Group>
                </Form.Row>
                <Form.Row>
                    <FieldAvatar _urlAvatar={_avatar} _captionAvatar={_userName} />

                    <Form.Group as={Col} controlId="formYourDetailsAvatar2">
                        <a href="">Not you ?</a>
                    </Form.Group>
                </Form.Row>

            </Card.Body>
        </Card>
    )

}

function CardSocialConnection( {onHandleData, onClickEmail}) {
    const handleData = onHandleData;
    const clickEmail = onClickEmail;

    console.log(' SignUp - CardSocialConnection  -  ');

    const successGoogle = (response) => {
        console.log(' SignUp - CardSocialConnection  -  GoogleSuccess');
        handleData(true, response.profileObj.email, response.profileObj.name, response.profileObj.imageUrl);
    }

    const failureGoogle = (error) => {
        console.log('Google Fail ', error);
        handleData(false, "", "");
    }

    const successLinkedIn = (response) => {
        console.log('Linkedin Success ', response);
        handleData(true, "", "");
    }

    const failureLinkedIn = (error) => {
        console.log('Linkedin Fail ', error);
        handleData(false, "", "");
    }

    const clickToEmail = (event) => {
        event.preventDefault();
        clickEmail(emailConnection)
    }

    return (
        <Card>
            <Card.Header>Your details</Card.Header>
            <Card.Body>
                <Form.Row>
                    <Form.Group as={Col} controlId="formYourDetailsGoogle">
                        <GoogleLogin
                            clientId="535889075089-mmvg7t7nfr1eddmrnfj661fa8gfq0k96.apps.googleusercontent.com"
                            buttonText="Connect to Google"
                            onSuccess={successGoogle}
                            onFailure={failureGoogle}
                            cookiePolicy={'single_host_origin'}
                        />
                    </Form.Group>
                    
                    <Form.Group as={Col} controlId="formYourDetailsLinkedin">

                        <LinkedIn
                            clientId="77y5wl8j0rcoqi"
                            onFailure={successLinkedIn}
                            onSuccess={failureLinkedIn}
                            scope={["profile","email"]}
                            redirectUri="http://localhost:1234/linkedin"
                        >
                            <img src={require('../../assets/img/linkedin.png')} alt="connect to Linked In" style={{ maxWidth: '180px' }} />
                        </LinkedIn>
                    </Form.Group>
                </Form.Row>

                <Form.Row className="justify-content-md-center">
                    <p> or signUp <a href="" onClick={clickToEmail}>by Email</a> </p>
                </Form.Row>
            </Card.Body>
        </Card>      
    )
}

function SignUpValidate ({_userName, _email}) {
    const [userName, setuserName] = useState(_userName);
    const [email, setemail] = useState(_email);

    console.log(' SignUp - SignUpValidate  (userName, email) -  ', userName, email);

    return (
        <Card>
            <Card.Header>Great You did it :)</Card.Header>
            <Card.Body>
                <Form.Row>
                    <Form.Group as={Col} controlId="formValidationUser1">
                        <Form.Label>Hi {_userName} and welcome aboard!</Form.Label>
                    </Form.Group>
                </Form.Row>
                <Form.Row>
                    <Form.Group as={Col} controlId="formValidationUser2">
                        <Form.Label>An email has been sent to your inbox ({_email}) with your connection details and platform link.</Form.Label>
                    </Form.Group>
                </Form.Row>
                <Form.Row>
                    <Form.Group as={Col} controlId="formValidationUser3">
                        <Form.Label>Don't forget to confirm your email so you can continue to use JTI services</Form.Label>
                    </Form.Group>
                </Form.Row>    
                <Form.Row>
                    <Form.Group as={Col} controlId="formValidationUser4">
                        <Form.Label>Now you'll be automatimatically redirected...Enjoy!</Form.Label>
                    </Form.Group>
                </Form.Row>            
                <Card.Footer><h2>Redirecting in... 10 seconds</h2></Card.Footer>
            </Card.Body>
        </Card>
    )

}

function SignUpRegister({_userName, _email, onHandleValidUser, onHandleData }) {
    const {register, handleSubmit, errors} = useForm();
    
    const [userName, setuserName] = useState(_userName);
    const [email, setemail] = useState(_email);
    const handleData = onHandleData;
    const handleValidUser= onHandleValidUser;

    const [typeConnection, setTypeConnection] = useState(socialConnection)
    const [socialConnected, setsocialConnected] = useState(false);
    const [avatar, setavatar] = useState("");
    const [captchaValid, setcaptchaValid] = useState(false);

    console.log(' SignUp - SignUpRegister  (userName, email) -  ', userName, email);

    const onSubmit = data => {
        console.log('Create my account' , data);
        handleValidUser(captchaValid);
      };

    const setData = (_socialConnected, _email, _userName, _avatar) => {
        setsocialConnected(_socialConnected);
        setavatar(_avatar);  
        setuserName(_userName);
        setemail(_email);
        handleData(_email, _userName);      
    }

    const clickEmail = (value) => {
        setTypeConnection(value);
    }

    const stateCaptcha = (value) => {
        setcaptchaValid(value);
    }

    function cardDetails () {
        let card;
        if (socialConnected == true) {
            card = <CardUser _userName={userName} _avatar={avatar} />
        }
        else {
            switch (typeConnection) {
                case socialConnection:
                    card = <CardSocialConnection 
                               onHandleData={setData} 
                               onClickEmail={clickEmail} />
                    break;
                case emailConnection:
                    card = <CardEmailConnection 
                               register={register}
                               errors={errors} 
                               onClickEmail={clickEmail}
                               onStateCaptcha={stateCaptcha} />
                    break;
                default:
                    card = <CardSocialConnection onHandleData={setData} onClickEmail={clickEmail} />
                    break;
            }           
        }
        return card;
    }

    return (
        <Row>
            <Col md={4}>
                <Row>
                    <h1>SinUp to JTI!</h1>
                </Row>
                <Row>
                    <p>
                        Et est admodum mirum videre plebem innumeram mentibus ardore quodam infuso cum dimicationum curulium eventu pendentem. haec similiaque memorabile nihil vel serium agi Romae permittunt. ergo redeundum ad textum.
                        Isdem diebus Apollinaris Domitiani gener, paulo ante agens palatii Caesaris curam, ad Mesopotamiam missus a socero per militares numeros immodice scrutabatur, an quaedam altiora meditantis iam Galli secreta susceperint scripta, qui conpertis Antiochiae gestis per minorem Armeniam lapsus Constantinopolim petit exindeque per protectores retractus artissime tenebatur.
                        Quid? qui se etiam nunc subsidiis patrimonii aut amicorum liberalitate sustentant, hos perire patiemur? 
                    </p>
                </Row>
            </Col>
            <Col xs={1}>
            </Col>
            <Col>
                <Container>
                    <Form onSubmit={handleSubmit(onSubmit)}>
                        <Card>
                            <Card.Header>Your Compagny's details</Card.Header>
                            <Card.Body>
                                <Form.Row>
                                    <Form.Group as={Col} controlId="formCompagnyName">
                                        <Form.Label>Name</Form.Label>
                                        <Form.Control  type="text" 
                                                placeholder="My Compagny LTD" 
                                                name="myCompagny" 
                                                ref={register({required : true, minLength : {value : 3, message :" At least 3 chars"}, maxLength : {value : 25, message :" Too long message"} }) } 
                                        />
                                        {errors.myCompagny && <span className="alert-danger" role="alert"> My Compagny is required </span>}
                                    </Form.Group>

                                    <Form.Group as={Col} controlId="formCompagnyWebSite">
                                        <Form.Label>WebSite</Form.Label>
                                        <Form.Control  type="text" 
                                                placeholder="https://company.com" 
                                                name="webSite" 
                                                ref={register({required:true, pattern: /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/ })} 
                                        />
                                        {errors.webSite?.type === "required" && <span className="alert-danger" role="alert"> Url is required </span>}
                                        {errors.webSite?.type === "pattern" && <span className="alert-danger" role="alert"> URL format is not valid </span>}
                                    </Form.Group>
                                </Form.Row>
                            </Card.Body>
                        </Card>
                        <p></p>
                        {cardDetails()}
                        <p></p>
                        <Form.Row>
                            <Form.Group controlId="formBasicCheckbox">
                                <Form.Check type="checkbox" label="I agree to the Terme & Consitions" 
                                name="checkConditions"
                                ref={register({required : true }) } />
                                {errors.checkConditions && <span className="alert-danger" role="alert"> Terme and Condition are required </span>}
                            </Form.Group>
                        </Form.Row>

                        <Form.Row  className="justify-content-center">
                            <Form.Group as={Col} sm={8} controlId="formBasicCreateAccount">
                                <Button variant="primary" type="submit"> Create My Account </Button>
                            </Form.Group>
                            <Form.Group as={Col} sm={4} controlId="formBasicCreateAccountExist">
                                <div><Link to="/SignIn">Already have one ?</Link> </div>
                            </Form.Group>
                        </Form.Row>                
                        
                    </Form>
                </Container>
            </Col>
        </Row>
    )
}

function SignUp(){
    const [userValid, setuserValid] = useState(false);
    const [userName, setuserName] = useState("");
    const [email, setemail] = useState("")

    console.log(' SignUp (userName, email) -  ', userName, email);


    const handleData = ( email, userName) => {
        setuserName(userName);
        setemail(email);     
    }

    const handleValidUser = (value) => {
        setuserValid(value);
    }

    function SignUpStepper () {
        let screen
        if (userValid === true) {
            screen = <SignUpValidate _userName={userName} _email={email}/>
        }
        else {
            screen = <SignUpRegister 
                          _userName={userName} 
                          _email={email} 
                          onHandleValidUser={handleValidUser} 
                          onHandleData={handleData} />
        }
        return screen;
    }

    return (
        <div>
            {SignUpStepper()}
        </div>
    )
}

export default SignUp;
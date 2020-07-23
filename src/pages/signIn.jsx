import React from 'react';
import { useState } from 'react';
import { useForm } from "react-hook-form";
import { Link} from 'react-router-dom';
import { Row, Col, Form, Button, Card, Container, InputGroup, Figure } from 'react-bootstrap';
import { GoogleLogin } from 'react-google-login';
import { LinkedIn } from 'react-linkedin-login-oauth2';
import Captcha from "demos-react-captcha";
import { FieldEmail } from "../components/FieldEmail";
import { FieldImgCompagny } from "../components/FieldImgCompagny";
import { FieldPassword } from "../components/FieldPassword";

import "../../assets/css/style.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

// Code secret client Google : DhTmuhus2k3nrbXhdoF25-6U
// Code secret client Linkedin : AHiRJIjvym8cEaSg
// Cle recaptcha : 6LfXqbMZAAAAAJ51u2RR5suEy8y_Eea6QjC_9yaN
// cle secret recaptcha : 6LfXqbMZAAAAAIgRNOPwEfxKQa9fV7q91QMbXeTV

const eye = <FontAwesomeIcon icon={faEye} />;
const eyeSlash = <FontAwesomeIcon icon={faEyeSlash} />;

export function SignIn() {
    const {register, handleSubmit, errors} = useForm();
    const [userValid, setuserValid] = useState(false);
    const [userName, setuserName] = useState("");
    const [email, setemail] = useState("");
    const [password, setpassword] = useState("")
    const [connected, setconnected] = useState(false);
    const [avatar, setavatar] = useState("");
    const [captchaValid, setcaptchaValid] = useState(false);

    const onSubmit = data => {
        console.log(data);
        setData(true, data.myEmail, data.myPassword);
        setuserValid(captchaValid);
      };

    const setData = (connected, email, password) => {
        setconnected(connected);
        setemail(email);
        setpassword(password);   
    }

    const captchaChange = (value) => {
        setcaptchaValid(value);
    }

    const captchaRefresh = () => {
        console.log('captcha refresh');
    }

    const successGoogle = (response) => {
        setData(true, response.profileObj.email, response.tokenId);
    }

    const failureGoogle = (error) => {
        console.log(error);
        setData(false, "", "");
    }

    const successLinkedIn = (response) => {
        console.log(response);
        setData(true, "", "");
    }

    const failureLinkedIn = (error) => {
        console.log(error);
        setData(false, "", "");
    }


    return (
        <Container>
            <Form onSubmit={handleSubmit(onSubmit)}>
                <Row>
                    <Col>
                        <Link to="/SignUp">Don't have a account ?</Link>
                    </Col>
                    <Col>
                    </Col>
                    <Col>
                        <Link to="/forgot">Forgot your details ?</Link>
                    </Col>
                </Row>
                <Row>
                    <Col>
                    </Col>
                    <Col>
                        <Form.Row>
                            <FieldImgCompagny />
                        </Form.Row>
                        <Form.Row>
                            <FieldEmail  register={register} errors={errors} />
                        </Form.Row>

                        <FieldPassword register={register} errors={errors} />

                        <Form.Row>
                            <Captcha onChange={captchaChange} onRefresh={captchaRefresh} placeholder="Type the caracters you see" />
                        </Form.Row>

                        <Form.Row>
                            <Form.Group controlId="formBasicCheckbox">
                                <Form.Check type="checkbox" label="Remember me" 
                                name="checkConditions"/>
                            </Form.Group>
                        </Form.Row>

                        <Form.Row  className="justify-content-center">
                            <Form.Group as={Col} sm={8} controlId="formBasicSignInAccount">
                                <Button variant="primary" type="submit"> Connect </Button>
                            </Form.Group>
                        </Form.Row>    
                    </Col>
                    <Col>
                    </Col>            
                </Row>
                <Row>
                    <Col>
                        <Form.Group as={Col} controlId="formYourDetailsGoogle">
                            <GoogleLogin
                                clientId="535889075089-mmvg7t7nfr1eddmrnfj661fa8gfq0k96.apps.googleusercontent.com"
                                buttonText="Connect to Google"
                                onSuccess={successGoogle}
                                onFailure={failureGoogle}
                                cookiePolicy={'single_host_origin'}
                            />
                        </Form.Group>
                    </Col>
                    <Col>
                    </Col>
                    <Col>
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
                    </Col>              
                </Row>
            </Form>
        </Container>

    )
}

export default SignIn;
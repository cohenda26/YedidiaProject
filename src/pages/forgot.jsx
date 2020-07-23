import React from 'react';
import { useState } from 'react';
import { useForm } from "react-hook-form";
import { Link} from 'react-router-dom';
import { Row, Col, Form, Button, Card, Container, InputGroup, Figure } from 'react-bootstrap';
import Captcha from "demos-react-captcha";
import { FieldEmail } from "../components/FieldEmail";
import { FieldImgCompagny } from "../components/FieldImgCompagny";

import "../../assets/css/style.css";

export function Forgot() {
    const {register, handleSubmit, errors} = useForm();
    const [userValid, setuserValid] = useState(false);
    const [captchaValid, setcaptchaValid] = useState(false);

    const onSubmit = data => {
        console.log(data);
        setuserValid(captchaValid);
      };

    const captchaChange = (value) => {
        setcaptchaValid(value);
    }

    const captchaRefresh = () => {
        console.log('captcha refresh');
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
                            <Link to="/SignIn">I remember!</Link>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                        </Col>
                        <Col>
                            <Form.Row>
                                <FieldImgCompagny />
                            </Form.Row>
                        </Col>
                        <Col>
                        </Col>
                    </Row>
                    {userValid  ?
                    <Row>
                        <Card>
                            <Card.Header>Success!</Card.Header>
                            <Card.Body>
                                <Form.Row>
                                    <Form.Group as={Col} controlId="formValidationUser2">
                                        <Form.Label>An email has been sent to you renew your password.</Form.Label>
                                    </Form.Group>
                                </Form.Row>
                            </Card.Body>
                        </Card>
                    </Row>
                    : 
                    <Row>
                        <Col>
                        </Col>
                        <Col>
                            <Form.Row>
                                <FieldEmail  register={register} errors={errors} />
                            </Form.Row>
                            
                            <Form.Row>
                                <Captcha onChange={captchaChange} onRefresh={captchaRefresh} placeholder="Type the caracters you see" />
                            </Form.Row>

                            <p></p>

                            <Form.Row  className="justify-content-center">
                                <Form.Group as={Col} sm={8} controlId="formBasicSignInAccount">
                                    <Button variant="primary" type="submit"> Send me my details </Button>
                                </Form.Group>
                            </Form.Row>    
                        </Col>
                        <Col>
                        </Col>            
                    </Row>
                    }
                </Form>
            </Container>  

    )
}

export default Forgot;
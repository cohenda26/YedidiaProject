import React from 'react';
import { useState, useRef, useEffect } from 'react';
import { useForm } from "react-hook-form";
import { Row, Col, Form, Button, Card, Container, InputGroup, Figure } from 'react-bootstrap';
import { FieldPassword } from '../components/FieldPassword';
import { FieldImgCompagny } from '../components/FieldImgCompagny';

import "../../assets/css/style.css";

// Code secret client Google : DhTmuhus2k3nrbXhdoF25-6U
// Code secret client Linkedin : AHiRJIjvym8cEaSg
// Cle recaptcha : 6LfXqbMZAAAAAJ51u2RR5suEy8y_Eea6QjC_9yaN
// cle secret recaptcha : 6LfXqbMZAAAAAIgRNOPwEfxKQa9fV7q91QMbXeTV

export function Reset() {
    const {register, handleSubmit, errors} = useForm();
    const [userValid, setuserValid] = useState(false);
    const [avatar, setavatar] = useState("");

    const onSubmit = data => {
        console.log(data);
    };

    return (
        <Container>
            <Form onSubmit={handleSubmit(onSubmit)}>
                <Row>
                    <Col>
                    </Col>
                    <Col  className="justify-content-center">
                        <Form.Row>
                            <FieldImgCompagny />
                        </Form.Row>

                        <FieldPassword register={register} errors={errors} _displayErrors="true" />

                        <p></p>

                        <Form.Group as={Col} sm={8} controlId="formBasicResetAccount">
                            <Button variant="primary" type="submit"> Validate </Button>
                        </Form.Group>

                    </Col>
                    <Col>
                    </Col>            
                </Row>
            </Form>
        </Container>

    )
}

export default Reset;
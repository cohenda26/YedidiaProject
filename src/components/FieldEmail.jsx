import React from 'react';
import { useState } from 'react';
import { useForm } from "react-hook-form";
import { Row, Col, Form, Button, Card, Container, InputGroup, Figure } from 'react-bootstrap';

import "../../assets/css/style.css";

export function FieldEmail({register, errors}) {
    return (
        <React.Fragment>
            <Form.Group as={Col} controlId="formYourDetailEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control  type="text" 
                        placeholder="jdoe@compagny.com" 
                        name="myEmail" 
                        ref={register({required:true, pattern: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/ })} 
                />
                {errors.myEmail?.type === "required" && <span className="alert-danger" role="alert"> Email is required </span>}
                {errors.myEmail?.type === "pattern" && <span className="alert-danger" role="alert"> Email format is not valid </span>}
            </Form.Group>
        </React.Fragment>      
    )
}

export default FieldEmail;
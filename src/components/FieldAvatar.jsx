import React from 'react';
import { useState } from 'react';
import { Row, Col, Form, Button, Card, Container, InputGroup, Figure } from 'react-bootstrap';

import "../../assets/css/style.css";

export function FieldAvatar( {_urlAvatar, _captionAvatar} ) {
    return (
        <React.Fragment>
            <Form.Group as={Col} controlId="formYourDetailsPhoto">
                <Figure>
                    <Figure.Image
                        width={100}
                        height={100}
                        alt="100x100"
                        src={_urlAvatar}
                        roundedCircle={true}
                    />
                    <Figure.Caption>
                        {_captionAvatar}
                    </Figure.Caption>
                </Figure>
            </Form.Group>
        </React.Fragment>
    )
}

export default FieldAvatar;
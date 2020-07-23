import React from 'react';
import { useState } from 'react';
import { Row, Col, Form, Button, Card, Container, InputGroup, Figure } from 'react-bootstrap';

import "../../assets/css/style.css";

import  logoCompagny from "../../assets/img/compagny.jpg";

export function FieldImgCompagny() {

return (
        <React.Fragment>
            <Form.Group as={Col} controlId="formYourImgCompagny">
                <Figure>
                    <Figure.Image
                        width={100}
                        height={100}
                        alt="100x100"
                        src={logoCompagny}
                    />
                    <Figure.Caption>
                        my name compagny
                    </Figure.Caption>
                </Figure>
            </Form.Group>
        </React.Fragment>
    )
}

export default FieldImgCompagny;
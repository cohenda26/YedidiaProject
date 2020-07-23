import React from 'react';
import { useState, useRef, useEffect } from 'react';
import { useForm } from "react-hook-form";
import { Row, Col, Form, Button, Card, Container, InputGroup, Figure } from 'react-bootstrap';

import "../../assets/css/style.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

// Code secret client Google : DhTmuhus2k3nrbXhdoF25-6U
// Code secret client Linkedin : AHiRJIjvym8cEaSg
// Cle recaptcha : 6LfXqbMZAAAAAJ51u2RR5suEy8y_Eea6QjC_9yaN
// cle secret recaptcha : 6LfXqbMZAAAAAIgRNOPwEfxKQa9fV7q91QMbXeTV

const eye = <FontAwesomeIcon icon={faEye} />;
const eyeSlash = <FontAwesomeIcon icon={faEyeSlash} />;

export function FieldPassword({register, errors, _displayErrors}) {
    const [passwordShown, setPasswordShown] = useState(false);
    const [displayErrors, setdisplayErrors] = useState(_displayErrors ? _displayErrors : false);
    const [password, setpassword] = useState("")
    const [passwordErrors, setpasswordErrors] = useState(["invisible", "invisible", "invisible", "invisible"])

    useEffect(() => {
        if(displayErrors){
            setpasswordErrors([checkControls(), controlNbCharacters(), controlLettersAndNumbers(), controlLeastOneCapitalLetters()])
        }
    }, [password])

    const togglePasswordVisiblity = () => {
        setPasswordShown(passwordShown ? false : true);
      };

    const checkControls = () => {
        let nameClass = "";
        if (password.length === 0) {
            nameClass = "invisible"
        }
        else {
            if (controlNbCharacters() == "visibleGreen"  && 
                controlLettersAndNumbers()  == "visibleGreen"  &&
                controlLeastOneCapitalLetters()  == "visibleGreen" ) {
                    nameClass = "visibleGreen"

            } else {
                nameClass = "visibleRed"
            }
        }
        return nameClass;
    }

    const controlNbCharacters = () => {
        let nameClass = "";
        console.log(' controlNbCharacters ', password, password.length);
        if (password.length === 0) {
            nameClass = "invisible"
        }
        else {
            if (password.length >= 6) {
                nameClass = "visibleGreen"
            } else { 
                nameClass = "visibleRed"
            }
        }
        return nameClass;
    }

    const controlLettersAndNumbers = () => {
        let nameClass = "";
        console.log(' controlLettersAndNumbers ', password, password.length);
        let letterNumber = /^.*(?=.*\d)(?=.*[A-zA-Z]).*$/;
        if (password.length === 0) {
            nameClass = "invisible"
        }
        else {
            if (password.match(letterNumber)) {
                nameClass = "visibleGreen"
            } else { 
                nameClass = "visibleRed"
            }
        }
        return nameClass;
    }

    const controlLeastOneCapitalLetters = () => {
        let nameClass = "";
        console.log(' controlLeastOneCapitalLetters ', password, password.length);
        let CapitalLetter = /^.*(?=.*[A-Z]).*$/;
        if (password.length == 0) {
            nameClass = "invisible"
        }
        else {
            if (password.match(CapitalLetter)) {
                nameClass = "visibleGreen"
            } else { 
                nameClass = "visibleRed"
            }
        } 
        return nameClass;       
    }

    const handleChangePassword = (event) => {
       setpassword(event.target.value);
    }

    return (
        <React.Fragment>
            <Form.Row>
                <Form.Group as={Col} controlId="formCompagnyPassword">
                    <Form.Label>Please set your new password</Form.Label>
                    <InputGroup>
                        <Form.Control  type={passwordShown ? "text" : "password"}
                                placeholder="*********" 
                                aria-describedby="passwordGroupAppend"
                                name="myPassword"
                                onChange={handleChangePassword}
                                ref={ register({required : true, minLength : {value : 6}, maxLength : {value : 25} })}
                        />
                        <InputGroup.Append>
                            <InputGroup.Text id="passwordGroupAppend">
                                <i onClick={togglePasswordVisiblity}>{passwordShown ? eyeSlash : eye}</i>
                            </InputGroup.Text>
                        </InputGroup.Append>
                    </InputGroup>
                    {errors.myPassword?.type === "required" && <span className="alert-danger" role="alert"> Password is required </span>}
                    {errors.myPassword?.type === "minLength" && <span className="alert-danger" role="alert"> At least 6 chars </span>}
                    {errors.myPassword?.type === "maxLength" && <span className="alert-danger" role="alert"> Too long message </span>}
                </Form.Group>
            </Form.Row>
            { displayErrors ? 
                <React.Fragment>
                    <Form.Row>
                        <span className={passwordErrors[0]} > Password must be </span>
                    </Form.Row>
                    <Form.Row>
                        <span className={passwordErrors[1]} >   - At least 6 characters long </span>
                    </Form.Row>
                    <Form.Row>
                        <span className={passwordErrors[2]} >  - Composed by letters and numbers </span>
                    </Form.Row>
                    <Form.Row>
                        <span className={passwordErrors[3]} >  - At least one capital letter </span>
                    </Form.Row> 
                </React.Fragment>
             :  <div></div>
             }
        </React.Fragment>
    )
}

export default FieldPassword;
import React, {useState, useContext} from 'react';
import { render } from 'react-dom';
import "../assets/css/style.css";
import {BrowserRouter as Router, Route, Switch, Link} from 'react-router-dom';
import { Container} from 'react-bootstrap';
import { LinkedInPopUp } from 'react-linkedin-login-oauth2';
import Layout from './components/layout.jsx';
import SignIn from './pages/signIn.jsx';
import SignUp from './pages/signUp.jsx';
import Forgot from './pages/forgot.jsx';
import Reset from './pages/reset.jsx';

// Importing the Bootstrap CSS
import 'bootstrap/dist/css/bootstrap.min.css';

function App () {
    const [state, setState] = useState([]);
    
    return (
        <Layout>
            <Router>
                <div className="App">

                    <Container className="containerHeaderApp" fluid>
                    </Container>

                    <div>
                        <Switch>
                            <Route exact path="/" component={SignIn}></Route>
                            <Route exact path="/signIn" component={SignIn}></Route>
                            <Route exact path="/signUp" component={SignUp}></Route>
                            <Route exact path="/forgot" component={Forgot}></Route>
                            <Route exact path="/reset" component={Reset}></Route>
                            <Route exact path="/linkedin" component={LinkedInPopUp} />
                        </Switch>
                    </div>

                    <Container className="containerFooterApp" fluid>
                    </Container>
                </div>
            </Router>
        </Layout>
    );
}

const application = (
      <App/>
  )
  
render(application, document.getElementById('app'));

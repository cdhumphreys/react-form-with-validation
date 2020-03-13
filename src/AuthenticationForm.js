import React, { useState } from 'react';
import CSSTransition from 'react-transition-group/CSSTransition';

import LoginForm from './components/LoginForm';
import SignUpForm from './components/SignUpForm';

import './styles/anims.css';

const AuthenticationForm = ({onSignUp, onLogin}) => {
    const [loggingIn, setLoggingIn] = useState(false);
    
    function switchForm() {
        setLoggingIn(!loggingIn)
    }

    return (
        <div>
            <CSSTransition
                in={loggingIn}
                timeout={500}
                classNames="scale"
                unmountOnExit
            >
                <LoginForm onLogin={onLogin} switchForm={switchForm}/>
            </CSSTransition>
            <CSSTransition
                in={!loggingIn}
                timeout={500}
                classNames="scale"
                unmountOnExit
            >
                <SignUpForm onSignUp={onSignUp} switchForm={switchForm}/>
            </CSSTransition>
        </div>
    );
}

export default AuthenticationForm;
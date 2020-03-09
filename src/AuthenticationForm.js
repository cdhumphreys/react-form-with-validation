import React, { useState } from 'react';

import LoginForm from './components/LoginForm';
import SignUpForm from './components/SignUpForm';

const AuthenticationForm = () => {
    const [loggingIn, setLoggingIn] = useState(false);
    
    function switchForm() {
        setLoggingIn(!loggingIn)
    }

    return (
        <div>
            {loggingIn ? 
                <LoginForm switchForm={switchForm}/>
                :
                <SignUpForm switchForm={switchForm}/>
            }
        </div>
    );
}

export default AuthenticationForm;
import React, { useState } from 'react';

import PasswordInput from './PasswordInput';
import EmailInput from './EmailInput';

const SignUpForm = (props) => {
    const [userDetails, setUserDetails] = useState({email: '', password: '', password2: ''});

    function onInputChange (e){
        const { name, value } = e.target;
        console.log(name, value);

        setUserDetails({
            ...userDetails,
            [name]: value
        });
    }

    return (
        <div className="form-container">
            <h2>Sign Up</h2>
            <form className="form" onSubmit={props.onRegister}>
                <EmailInput name="email" placeholder="Enter your email address" label="Email" onChange={onInputChange} value={userDetails.email}/>
                <PasswordInput name="password" placeholder="Enter your password" label="Password" onChange={onInputChange} value={userDetails.password}/>
                <PasswordInput name="password2" placeholder="Confirm your password" label="Confirm Password" onChange={onInputChange} value={userDetails.password2}/>
                {props.errors.length > 0 && props.formErrors.map(e => <div key={e.length}>{e}</div>)}
                <button className="button button--primary" type="submit">Sign Up</button>
                <button className="button button--secondary" onClick={props.switchForm}>Log In</button>
            </form>
        </div>
    )
}

export default SignUpForm;
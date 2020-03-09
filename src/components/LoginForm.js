import React, { useState } from 'react';


const LoginForm = (props) => {
    const [userDetails, setUserDetails] = useState({email: '', password: ''});

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
            <h2>Log In</h2>
            <form className="form" onSubmit={props.onLogin}>
                {props.formErrors && props.formErrors.length > 0 && props.formErrors.map(e => <div key={e.length}>{e}</div>)}
                <button className="button button--primary" type="submit">Log In</button>
                <button className="button button--secondary" onClick={props.switchForm}>Sign Up</button>
            </form>
        </div>
    );
}

export default LoginForm;
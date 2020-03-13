import React from 'react';

import Form from './Form';

import { emailRe } from '../utils/regex';

const LoginForm = (props) => {
    const initialFormConfig = {
        inputs: {
            email: {
                inputElType: 'input',
                type: 'email',
                value: '',
                placeholder: 'Enter your email address',
                label: 'Email',
                validators: {
                    required: true,
                    regex: emailRe
                },
                valid: false,
                touched: false,
                errors: []
            },
            password: {
                inputElType: 'input',
                type: 'password',
                value: '',
                placeholder: 'Enter a password',
                label: 'Password',
                validators: {
                    required: true,
                },
                valid: false,
                touched: false,
                errors: []
            },
        },
        valid: false,
        errors: []
    };

    function onSubmit(formState) {
        const email = formState.inputs.email.value;
        const password = formState.inputs.password.value;

        props.onLogin({email, password});
    }

    return (
        <Form initialFormConfig={initialFormConfig} heading="Log In" onSubmit={onSubmit}>
            <button className="button button--secondary" onClick={props.switchForm}>Sign Up</button> 
        </Form>
    );
}

export default LoginForm;
import React from 'react';

import Form from './Form';

import { emailRe } from '../utils/regex';

const SignUpForm = (props) => {
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
                    minLength: 6
                },
                valid: false,
                touched: false,
                errors: []
            },
            password2: {
                inputElType: 'input',
                type: 'password',
                value: '',
                placeholder: 'Confirm your password',
                label: 'Confirm Password',
                validators: {
                    required: true,
                    minLength: 6
                },
                valid: false,
                touched: false,
                errors: []
            }
        },
        valid: false,
        errors: []
    };

    function checkPasswordsMatch(formState, errorsState) {
        let validState = true;
        // Inputs are valid, check if passwords match
        if (formState.inputs.password.value !== formState.inputs.password2.value) {
            validState = false;
            errorsState.push('Passwords do not match');
        }

        return validState;
    }

    function onSubmit(formState) {
        const email = formState.inputs.email.value;
        const password = formState.inputs.password.value;

        props.onSignUp({email, password});
    }

    return (
        <Form initialFormConfig={initialFormConfig} heading="Sign Up" onSubmit={onSubmit} extraValidator={checkPasswordsMatch}>
            <button className="button button--secondary" onClick={props.switchForm}>Log In</button> 
        </Form>
    );
}

export default SignUpForm;
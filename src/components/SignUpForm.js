import React, { useState } from 'react';

import Input from './Input';

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
        errors: [],
        method: 'POST',
        action: '?'
    };

    const [formState, setFormState] = useState(initialFormConfig);

    function validateInput(inputName, value) {
        const validators = formState.inputs[inputName].validators;
        let isValid = true;
        let pass;
        const errors = [];

        // No validators so is always valid
        if (Object.keys(validators).length === 0) return [true, []];

        // Go through validators and test value against the rule for that validator
        // Add errors to above array as appropriate
        for (const validatorKey in validators) {
            if (validators.hasOwnProperty(validatorKey)) {
                const rule = validators[validatorKey];

                switch (validatorKey) {
                    case 'required':
                        if (rule) {
                            pass = value.trim() !== '';
                            if (!pass) {
                                errors.push('This field is required');
                            }
                            isValid = pass && isValid;
                        }
                        break;
                    case 'minLength':
                        pass = value.length >= rule;
                        if (!pass) {
                            errors.push(`Must be at least ${rule} characters long`);
                        }
                        isValid = pass && isValid;
                        break;
                    case 'maxLength':
                        pass = value.length <= rule;
                        if (!pass) {
                            errors.push(`Must be less than ${rule} characters long`);
                        }
                        isValid = pass && isValid;
                        break;
                    case 'regex':
                        pass = rule.test(value);
                        if (!pass) {
                            errors.push(`This is not a valid ${inputName}`);
                        }
                        isValid = pass && isValid;
                        break;
                    default:
                        break;
                }
            }
        }

        return [isValid, errors];
    }

    function validateForm(formState) {
        let isValid = true;
        const errors = [];

        // Check inputs are valid
        isValid = Object.values(formState.inputs).reduce((acc, inputState) => {
            return acc && inputState.valid;
        }, true);

        // Error found in one of the inputs
        if (!isValid) return [false, []];

        // Inputs are valid, check if passwords match
        if (formState.inputs.password.value !== formState.inputs.password2.value) {
            isValid = false;
            errors.push('Passwords do not match');
        }

        return [isValid, errors];
    }

    function onInputChange (e){
        const { name, value } = e.target;
        console.log(name, value);


        const [isValid, errors] = validateInput(name, value);

        const updatedFormState = {
            ...formState,
            inputs: {
                ...formState.inputs,
                [name]: {
                    ...formState.inputs[name],
                    value: value,
                    valid: isValid,
                    touched: true,
                    errors: errors
                }
            }
        };

        const [formIsValid, formErrors] = validateForm(updatedFormState);

        updatedFormState.valid = formIsValid;
        updatedFormState.errors = formErrors;

        setFormState(updatedFormState);
    }

    function onSubmit(e) {
        e.preventDefault();
        console.log('submit!');
    }

    return (
        <div className="form-container">
            <h2>Sign Up</h2>
            <form className="form" onSubmit={onSubmit} action={initialFormConfig.action} method={initialFormConfig.method}>
                {Object.keys(formState.inputs).map((inputName) => {
                    const {validators, ...config} = formState.inputs[inputName];
                    return (
                        <Input
                            key={inputName}
                            name={inputName}
                            onChange={onInputChange}
                            required={validators.required || false}
                            {...config}
                            // inputElType={formState.inputs[inputName].inputElType}
                            // type={formState.inputs[inputName].type}
                            // placeholder={formState.inputs[inputName].placeholder}
                            // value={formState.inputs[inputName].value}
                            // label={formState.inputs[inputName].label}
                            // valid={formState.inputs[inputName].valid}
                            // touched={formState.inputs[inputName].touched}
                            // errors={formState.inputs[inputName].errors}
                            // options={formState.inputs[inputName].options || null}
                        />
                    );
                })}
                {formState.errors.length > 0 && formState.errors.map(e => <div key={e.length} className="form__error">{e}</div>)}
                <button className="button button--primary" type="submit" disabled={!formState.valid}>Sign Up</button>
                <button className="button button--secondary" onClick={props.switchForm}>Log In</button>
            </form>
        </div>
    );
}

export default SignUpForm;
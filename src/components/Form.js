import React, { useState } from 'react';

import Input from './Input';

const Form = (props) => {
    const [formState, setFormState] = useState(props.initialFormConfig);

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


        if (props.extraValidator) {
            const valid = props.extraValidator(formState, errors);
            isValid = isValid && valid;
        }
        // // Inputs are valid, check if passwords match
        // if (formState.inputs.password.value !== formState.inputs.password2.value) {
        //     isValid = false;
        //     errors.push('Passwords do not match');
        // }

        return [isValid, errors];
    }

    function onInputChange (e){
        const { name, value } = e.target;
        
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
        props.onSubmit(formState);
    }

    return (
        <div className="form-container">
            <h2>{props.heading}</h2>
            <form className="form" onSubmit={onSubmit}>
                {Object.keys(formState.inputs).map((inputName) => {
                    const {validators, ...config} = formState.inputs[inputName];
                    return (
                        <Input
                            key={inputName}
                            name={inputName}
                            onChange={onInputChange}
                            required={validators.required || false}
                            {...config}
                        />
                    );
                })}
                {formState.errors.length > 0 && formState.errors.map(e => <div key={e.length} className="form__error">{e}</div>)}
                <button className="button button--primary" type="submit" disabled={!formState.valid}>{props.heading}</button>
                {props.children}
            </form>
        </div>
    );
}

export default Form;
import React, { useState } from 'react';

import Input from './Input';

const PasswordInput = (props) => {
    const [errors, setErrors] = useState([]);
    const reLetters = /[a-zA-Z]+/;
    const reNumbers = /[0-9]+/;
    
    function onChange(e) {
        const { value } = e.target;
        validatePassword(value);
        props.onChange(e);
    }

    function validatePassword(value) {
        const errors = [];
        if (!value) {
            errors.push('Password is required');
        }

        if (value.length < 6) {
            errors.push('Password must be at least 6 characters long');
        }

        if (!reLetters.test(value) || !reLetters.test(value)) {
            errors.push('Password must contain both letters and numbers');
        }

        setErrors(errors);
    }

    return (
        <Input
            name={props.name}
            type="password"
            placeholder={props.placeholder}
            label={props.label}
            onChange={onChange}
            value={props.value}
            errors={errors}
            required
        />
    )
}

export default PasswordInput;
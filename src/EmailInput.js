import React, { useState } from 'react';
import Input from './Input';

const EmailInput = (props) => {
    const [errors, setErrors] = useState([]);

    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    
    function validateEmail(value) {
        if (re.test(String(value).toLowerCase())) {
            setErrors([]);
        } else {
            setErrors(['Please enter a valid email address']);
        }
    }

    function onChange(e) {
        const { value } = e.target;

        validateEmail(value);
        props.onChange(e);
    }

    return (
        <Input
            name={props.name}
            type="email"
            placeholder={props.placeholder}
            label={props.label}
            onChange={onChange}
            value={props.value}
            errors={errors}
            required
    />
    );
};

export default EmailInput;
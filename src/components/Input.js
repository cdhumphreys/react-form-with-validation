import React from "react";
import '../styles/input.css';

const Input = (props) => {
    const {inputElType, name, label, valid, touched, errors, ...rest} = props;

    let inputEl;

    const input = <input className={`input__field ${touched && !valid && 'input__field--error'}`} name={name} {...rest}/>;
    const textarea = <textarea className={`input__field ${touched && !valid && 'input__field--error'}`} name={name} {...rest} />

    switch (inputElType) {
        case 'input':
            inputEl = input;
            break;
        case 'textarea':
            inputEl = textarea;
            break;
        case 'select':
            const {options, ...restOfProps} = rest;
            inputEl = (
                <select name={name} {...restOfProps}>
                    {options.map(opt => <option key={opt.value} value={opt.value}>{opt.displayValue}</option>)}
                </select>
            );
            break;
        default:
            inputEl = input;
            break;
    }

    return (
        <div className="input-container">
            <label className={`input__label ${touched && !valid && 'input__label--error'}`} htmlFor={name}>{label}</label>
            {inputEl}
            {errors.length > 0 && errors.map((e) => <div key={e.length} className="input__error">{e}</div>)}
        </div>
    );
};

export default Input;
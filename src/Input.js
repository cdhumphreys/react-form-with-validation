import React from "react";
import './styles/input.css';

const Input = (props) => {
    return (
        <div className="input-container">
            <label className="input__label" htmlFor={props.name}>{props.label}</label>
            <input
                className={`input__field ${props.errors.length > 0 && 'input__field--error'}`}
                type={props.type}
                placeholder={props.placeholder}
                name={props.name}
                id={props.name}
                onChange={props.onChange}
                value={props.value}
                required={props.required}
            />
            {props.errors.length > 0 && props.errors.map((e) => <div key={e.length} className="input__error">{e}</div>)
            }
        </div>
    );
};

export default Input;
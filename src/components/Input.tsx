import React from "react";

interface InputProps {
    label: string;
    value: string;
    handler(event: React.ChangeEvent<HTMLInputElement>): void;
    sup: string;
    className: string;
}

const Input: React.FC<InputProps> = (props) => {
    return (
        <label>
            {props.label}
            <sup>{props.sup}</sup>
            <input type="text" value={props.value} onChange={props.handler} className={props.className} />
        </label>
    );
};

export default Input;

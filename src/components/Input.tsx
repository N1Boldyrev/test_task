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
        <div className="field">
            <label>
                <span>
                    {props.label}
                    <sup>{props.sup}</sup>
                </span>
                <input type="text" value={props.value} onChange={props.handler} className={props.className} />
            </label>
        </div>
    );
};

export default Input;

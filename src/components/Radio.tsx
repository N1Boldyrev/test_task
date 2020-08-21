import React from "react";

interface radioProps {
    value: string;
    radioState: string;
    handler(event: React.ChangeEvent<HTMLInputElement>): void;
}

const Radio: React.FC<radioProps> = (props) => {
    return (
        <>
            <input
                type="radio"
                name="days"
                id={props.value}
                value={props.value}
                onChange={props.handler}
                checked={props.radioState === props.value}
            />
            <label htmlFor={props.value}>{props.value}</label>
        </>
    );
};

export default Radio;

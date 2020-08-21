import React from "react";

interface radioProps {
    value: string;
    radioState: string;
    handler(event: React.ChangeEvent<HTMLInputElement>): void;
}

const Radio: React.FC<radioProps> = (props) => {
    return (
        <label>
            <input
                type="radio"
                name="days"
                value={props.value}
                onChange={props.handler}
                checked={props.radioState === props.value}
            />
            {props.value}
        </label>
    );
};

export default Radio;

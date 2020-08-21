import React from "react";

interface selectProps {
    selectState: string;
    selectHandler(event: React.ChangeEvent<HTMLSelectElement>): void;
    sup: string;
}

const Select: React.FC<selectProps> = (props) => {
    return (
        <div className="field">
            <label>
                <span>
                    Тип исполнителя
                    <sup>{props.sup}</sup>
                </span>
                <select value={props.selectState} onChange={props.selectHandler}>
                    <option value="Механик">Механик</option>
                    <option value="Водитель">Водитель</option>
                </select>
            </label>
        </div>
    );
};

export default Select;

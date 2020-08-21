import React from "react";

interface selectProps {
    selectState: string;
    selectHandler(event: React.ChangeEvent<HTMLSelectElement>): void;
}

const Select: React.FC<selectProps> = (props) => {
    return (
        <label>
            Тип исполнителя
            <select name="" id="" defaultValue={props.selectState} onChange={props.selectHandler}>
                <option value="Механик">Механик</option>
                <option value="Водитель">Водитель</option>
            </select>
        </label>
    );
};

export default Select;

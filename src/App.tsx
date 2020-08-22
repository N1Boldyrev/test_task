import React, { useState, useEffect } from "react";
import Input from "./components/Input";
import Radio from "./components/Radio";
import Select from "./components/Select";

const spaceReg: RegExp = new RegExp(/^[ ]/g); // Пробелы в начале и конце строки

const App: React.FC = () => {
    const [state, setState] = useState({
        routeName: "",
        routeAuthor: "",
        routeNameClass: "",
        routeAuthorClass: "",
        selectState: "Механик",
        checkboxState: false,
        supState: "",
        radioState: "Пн",
        buttonDisabled: false,
        localStorageLoaded: false,
        wasValidated: false,
    });

    useEffect(() => {
        if (!state.localStorageLoaded) {
            setState((state) => ({ ...state, localStorageLoaded: true }));
            const data: string | null = localStorage.getItem("data");
            if (data != null) {
                const pharse = JSON.parse(data);
                setState((state) => ({
                    ...state,
                    routeName: pharse.routeName,
                    routeAuthor: pharse.routeAuthor,
                    selectState: pharse.selectState,
                    checkboxState: pharse.checkboxState,
                    radioState: pharse.radioState,
                    supState: pharse.supState,
                    buttonDisabled: pharse.buttonDisabled,
                }));
            }
        }
        if (state.checkboxState && !state.wasValidated) validation();
    });

    const routeNameHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        let value: string = event.target.value;
        value = value.replace(spaceReg, "");
        setState((state) => ({ ...state, routeName: value, wasValidated: false }));
    };

    const routeAuthorHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        let value: string = event.target.value;
        value = value.replace(spaceReg, "");
        setState((state) => ({ ...state, routeAuthor: value, wasValidated: false }));
    };

    const selectHandler = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const eventTargetValue: string = event.target.value;
        setState((state) => ({ ...state, selectState: eventTargetValue }));
    };

    const checkboxHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        let checked: boolean = event.target.checked;
        if (checked) {
            setState((state) => ({ ...state, checkboxState: checked, supState: "*", wasValidated: false }));
        } else {
            setState((state) => ({
                ...state,
                checkboxState: checked,
                supState: "",
                buttonDisabled: false,
                routeNameClass: "",
                routeAuthorClass: "",
            }));
        }
    };

    const radioHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        const eventTargetValue: string = event.target.value;
        setState((state) => ({ ...state, radioState: eventTargetValue }));
    };

    const validation = () => {
        let valid: boolean = true;
        console.log("valid");
        const numReg: RegExp = new RegExp(/^\d{1,}$/); // Проверка на число
        const nameReg: RegExp = new RegExp(/^[a-zA-Zа-яА-Я'][a-zA-Zа-яА-Я-' ]+[a-zA-Zа-яА-Я']?$/);
        if (numReg.test(state.routeName) || state.routeName === "") {
            valid = false;
            setState((state) => ({ ...state, routeNameClass: "error" }));
        } else setState((state) => ({ ...state, routeNameClass: "" }));
        if (!nameReg.test(state.routeAuthor) || state.routeAuthor === "") {
            valid = false;
            setState((state) => ({ ...state, routeAuthorClass: "error" }));
        } else setState((state) => ({ ...state, routeAuthorClass: "" }));
        if (valid)
            setState((state) => ({
                ...state,
                buttonDisabled: false,
                wasValidated: true,
            }));
        else setState((state) => ({ ...state, buttonDisabled: true, wasValidated: true }));
        return valid;
    };

    const sendData = (event: React.FormEvent) => {
        event.preventDefault();
        localStorage.setItem("data", JSON.stringify(state));
    };

    return (
        <form onSubmit={sendData}>
            <p>Информация о маршруте</p>
            <div className="fields">
                <Input
                    label="Наименование"
                    value={state.routeName}
                    sup={state.supState}
                    className={state.routeNameClass}
                    handler={routeNameHandler}
                />
                <Input
                    label="Автор маршрута"
                    value={state.routeAuthor}
                    sup={state.supState}
                    className={state.routeAuthorClass}
                    handler={routeAuthorHandler}
                />
                <Select selectState={state.selectState} selectHandler={selectHandler} sup={state.supState} />
            </div>
            <div className="form-footer">
                <div>
                    Дни обходов <sup>{state.supState}</sup>
                </div>
                <div className="radio">
                    <Radio value="Пн" radioState={state.radioState} handler={radioHandler} />
                    <Radio value="Вт" radioState={state.radioState} handler={radioHandler} />
                    <Radio value="Ср" radioState={state.radioState} handler={radioHandler} />
                    <Radio value="Чт" radioState={state.radioState} handler={radioHandler} />
                    <Radio value="Пт" radioState={state.radioState} handler={radioHandler} />
                    <Radio value="Сб" radioState={state.radioState} handler={radioHandler} />
                    <Radio value="Вс" radioState={state.radioState} handler={radioHandler} />
                </div>
                <label>
                    <input type="checkbox" checked={state.checkboxState} onChange={checkboxHandler} /> Длительный обход
                </label>
            </div>
            <button type="submit" disabled={state.buttonDisabled}>
                Сохранить
            </button>
        </form>
    );
};

export default App;

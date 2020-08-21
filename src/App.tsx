import React, { useState, useEffect } from "react";
import Input from "./components/Input";
import Radio from "./components/Radio";
import Select from "./components/Select";

const spaceReg: RegExp = new RegExp(/^[ s]+|[ s]+$/g); // Пробелы в начале и конце строки

const App: React.FC = () => {
    const [routeName, setRouteName] = useState<string>(""); //Стейт для первого инпута
    const [routeAuthor, setRouteAuthor] = useState<string>(""); //Стейт для второго инпута
    const [routeNameClass, setRouteNameClass] = useState<string>("");
    const [routeAuthorClass, setRouteAuthorClass] = useState<string>("");

    const [selectState, setSelectState] = useState<string>("Механик");
    const [checkboxState, setCheckboxState] = useState<boolean>(false);
    const [supState, setSupState] = useState<string>("");
    const [radioState, setRadioState] = useState<string>("Пн");
    const [buttonDisabled, setButtonDisabled] = useState<boolean>(false);
    const [localStorageLoaded, setLocalStorageLoaded] = useState<boolean>(false);

    useEffect(() => {
        if (checkboxState == true) validation();
        if (!localStorageLoaded) {
            const data: string | null = localStorage.getItem("data");
            if (data != null) {
                const pharse = JSON.parse(data);
                setRouteName(pharse.routeName);
                setRouteAuthor(pharse.routeAuthor);
                setSelectState(pharse.selectState);
                setCheckboxState(pharse.checkboxState);
                setRadioState(pharse.radioState);
                setSupState(pharse.supState);
                setButtonDisabled(pharse.buttonDisabled);
            }
            setLocalStorageLoaded(true);
        }
    });

    const routeNameHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        let value = event.target.value;
        value.replace(spaceReg, "");
        setRouteName(value);
    };

    const routeAuthorHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        let value = event.target.value;
        value.replace(spaceReg, "");
        setRouteAuthor(value);
    };

    const selectHandler = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectState(event.target.value);
    };

    const checkboxHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        let checked = event.target.checked;
        setCheckboxState(checked);
        if (checked) {
            setSupState("*");
        } else {
            setSupState("");
            setButtonDisabled(false);
            setRouteNameClass("");
            setRouteAuthorClass("");
        }
    };

    const radioHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRadioState(event.target.value);
    };

    const validation = () => {
        let valid: boolean = true;
        const numReg: RegExp = new RegExp(/^\d{1,}$/); // Проверка на число
        const nameReg: RegExp = new RegExp(/^[a-zA-Zа-яА-Я'][a-zA-Zа-яА-Я-' ]+[a-zA-Zа-яА-Я']?$/);
        if (numReg.test(routeName) || numReg.test(routeAuthor) || routeAuthor == "") {
            valid = false;
            setRouteNameClass("error");
            setButtonDisabled(true);
        } else {
            setRouteNameClass("");
            setButtonDisabled(false);
        }
        if (nameReg.test(routeAuthor) == false || routeAuthor == "") {
            valid = false;
            setRouteAuthorClass("error");
            setButtonDisabled(true);
        } else {
            setRouteAuthorClass("");
            setButtonDisabled(false);
        }
        return valid;
    };

    const sendData = (event: React.FormEvent) => {
        event.preventDefault();
        const sendingObject: object = {
            routeName: routeName,
            routeAuthor: routeAuthor,
            selectState: selectState,
            checkboxState: checkboxState,
            radioState: radioState,
            supState: supState,
            buttonDisabled: buttonDisabled,
        };
        localStorage.setItem("data", JSON.stringify(sendingObject));
    };

    return (
        <form onSubmit={sendData}>
            <Input
                label="Наименование"
                value={routeName}
                handler={routeNameHandler}
                sup={supState}
                className={routeNameClass}
            />
            <Input
                label="Автор маршрута"
                value={routeAuthor}
                handler={routeAuthorHandler}
                sup={supState}
                className={routeAuthorClass}
            />
            <Select selectState={selectState} selectHandler={selectHandler} />
            <span>
                Дни обходов
                <Radio value="Пн" radioState={radioState} handler={radioHandler} />
                <Radio value="Вт" radioState={radioState} handler={radioHandler} />
                <Radio value="Ср" radioState={radioState} handler={radioHandler} />
                <Radio value="Чт" radioState={radioState} handler={radioHandler} />
                <Radio value="Пт" radioState={radioState} handler={radioHandler} />
                <Radio value="Сб" radioState={radioState} handler={radioHandler} />
                <Radio value="Вс" radioState={radioState} handler={radioHandler} />
                <label>
                    <input type="checkbox" checked={checkboxState} onChange={checkboxHandler} /> Длительный обход
                </label>
            </span>
            <button type="submit" disabled={buttonDisabled}>
                Сохранить
            </button>
        </form>
    );
};

export default App;

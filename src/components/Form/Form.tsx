import "./Form.css"
import { useState } from 'react';

export const Form = () => {
    const [name, setName] = useState<string>('')
    const [nameError, setNameError] = useState<boolean>(false)
    const [phone, setPhone] = useState<string>('')
    const [phoneError, setPhoneError] = useState<boolean>(false)
    const [email, setEmail] = useState<string>('')
    const [emailError, setEmailError] = useState<boolean>(false)
    const [birthday, setBirthday] = useState<string>('')
    const [massage, setMassage] = useState<string>('')
    const [massageError, setMassageError] = useState<boolean>(false)

    const handleEmailChange = (e: {target: {value: string}}) => {
        setEmail(e.target.value)
        const isValid =  e.target.value
            .toLowerCase()
            .match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            );
        !isValid ? setEmailError(true) : setEmailError(false)
    }

    const handleNameChange = (e: {target: {value: string}}) => {
        const result = e.target.value.toUpperCase();
        setName(result)
        const isValid =  e.target.value
            .toLowerCase()
            .match(
                /^([a-zA-Z]{3,30})+ ([a-zA-Z]{3,30})+$/
            );
        !isValid ? setNameError(true) : setNameError(false)
    }

    const handlePhoneChange = (e: {target: {value: string}}) => {
        let val = e.target.value;
        val = val.replace(/\D/g, '');
        console.log(val)
        let num = `+${val.substring(0, 1)} ${val.length > 1 ? "(" : ""}${val.substring(1, 4)}${val.length > 4 ? ")" : ""} ${val.substring(4, 7)}${val.length > 7 ? "-" : ""}${val.substring(7, 9)}${val.length > 9 ? "-" : ""}${val.substring(9, 11)}`;
        num = num.trim();
        if (num.length !== 18) {
            setPhoneError(true)
        } else {
            setPhoneError(false)
        }
        setPhone(num)
    }

    const handleMassageChange = (e: {target: {value: string}}) => {
        const value = e.target.value
        setMassage(value)
        if (value.length > 300 || value.length < 10) {
            setMassageError(true)
        } else {
            setMassageError(false)
        }
    }



    return (
        <main>
            <div className="circle" />
            <div className="form__container">
                <h1>Оставить заявку</h1>
                <div className="form__inputs-wrapper">
                    <div className="form__input">
                        <input
                            type="text"
                            placeholder="Имя Фамилия"
                            value={name}
                            onChange={(e) => handleNameChange(e)}
                        />
                        {nameError &&
                            <div className="input_error">Пожалуйста, введите корректно имя и фамилию</div>}
                    </div>
                    <div className="form__input">
                        <input
                            type="text"
                            placeholder="E-mail"
                            value={email}
                            onChange={(e) => handleEmailChange(e)}
                        />
                        {emailError &&
                        <div className="input_error">Пожалуйста, введите корректно email</div>}
                    </div>
                    <div className="form__input">
                        <input
                            type="text"
                            placeholder="Номер телефона"
                            value={phone}
                            onChange={(e) => handlePhoneChange(e)}
                        />
                        {phoneError &&
                        <div className="input_error">Пожалуйста, введите корректно номер телефона</div>}

                    </div>
                    <div className="form__input">
                        <input
                            type="date"
                            placeholder="Дата рождения"
                            value={birthday}
                            onChange={({ target: {value} }) => setBirthday(value)}
                        />
                    </div>
                    <div className="form__input">
                        <textarea
                            placeholder="Сообщение"
                            minLength={10}
                            maxLength={301}
                            value={massage}
                            onChange={(e) => handleMassageChange(e)}
                        />
                        {massageError &&
                        <div className="input_error">Сообщение слишком {massage.length > 300 && "длинное"}{massage.length < 10 && "короткое"}</div>}
                    </div>
                </div>
                <button type="submit">Отправить</button>
            </div>
        </main>
    )
}

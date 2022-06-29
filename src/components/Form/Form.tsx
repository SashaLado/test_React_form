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

    const handleEmailChange = (e: {target: {value: string}}) => {
        setEmail(e.target.value)
        const isValid =  e.target.value
            .toLowerCase()
            .match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            );
        !isValid ? setEmailError(true) : setEmailError(false)
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
                            onChange={({ target: {value} }) => setName(value)}
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
                            onChange={({ target: {value} }) => setPhone(value)}
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
                            value={massage}
                            onChange={({ target: {value} }) => setMassage(value)}
                        />
                    </div>
                </div>
                <button type="submit">Отправить</button>
            </div>
        </main>
    )
}

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

    const [responseMessage, setResponseMessage] = useState<string>("")
    const [isLoading, setIsLoading] = useState<boolean>(false)

    const handleEmailChange = (e: {target: {value: string}}) => {
        setEmail(e.target.value)
        emailValidation(e.target.value)
    }

    const emailValidation = (value: string) => {
        const isValid = value.toLowerCase().match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
        !isValid ? setEmailError(true) : setEmailError(false)
    }

    const handleNameChange = (e: {target: {value: string}}) => {
        const result = e.target.value.toUpperCase();
        setName(result)
        nameValidation(result)
    }

    const nameValidation = (value: string) => {
        const isValid =  value.toLowerCase().match(/^([a-zA-Z]{3,30})+ ([a-zA-Z]{3,30})+$/);
        !isValid ? setNameError(true) : setNameError(false)
    }

    const handlePhoneChange = (e: {target: {value: string}}) => {
        let val = e.target.value;
        val = val.replace(/\D/g, '');
        let num = `
            +${val.substring(0, 1)} 
               ${val.length > 1 ? "(" : ""}
               ${val.substring(1, 4)}
               ${val.length > 4 ? ")" : ""} 
               ${val.substring(4, 7)}
               ${val.length > 7 ? "-" : ""}
               ${val.substring(7, 9)}
               ${val.length > 9 ? "-" : ""}
               ${val.substring(9, 11)}`;
        num = num.trim();
        phoneValidation(num)
        setPhone(num)
    }

    const phoneValidation = (value: string) => {
        setPhoneError(value.length !== 18)
    }

    const handleMassageChange = (e: {target: {value: string}}) => {
        const value = e.target.value
        setMassage(value)
        massageValidation(value)
    }

    const massageValidation = (value: string) => {
        setMassageError(value.length > 300 || value.length < 10)
    }

    const handleSubmitForm = () => {
        nameValidation(name)
        phoneValidation(phone)
        emailValidation(email)
        massageValidation(massage)

        if (!nameError && !phoneError && !emailError && !massageError) {
            setIsLoading(true)

            submitForm()
                .then(r => {
                    setResponseMessage(r.success)
                    setName('')
                    setPhone('')
                    setEmail('')
                    setBirthday('')
                    setMassage('')
                }, (r) => {
                    setResponseMessage(r.error)
                    throw new Error(r);
                })
                .finally(() => setIsLoading(false))
        }
    }

    const submitForm = async () => {
        try {
            const response = await fetch("url", {
                method: 'POST',
                body: JSON.stringify({
                    name: name,
                    email: email,
                    phone: phone,
                    birthday: birthday,
                    massage: massage
                }),
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const json = await response.json();
            return json
        } catch (error) {
            console.log(error)
            return error
        }
    }

    return (
        <main>
            <div className="circle" />
            <div className="form__container">
                <h1>???????????????? ????????????</h1>
                <div className="form__inputs-wrapper">
                    <div className="form__input">
                        <input
                            type="text"
                            placeholder="?????? ??????????????"
                            value={name}
                            onChange={(e) => handleNameChange(e)}
                        />
                        {nameError &&
                            <div className="input_error">????????????????????, ?????????????? ?????????????????? ?????? ?? ??????????????</div>}
                    </div>
                    <div className="form__input">
                        <input
                            type="text"
                            placeholder="E-mail"
                            value={email}
                            onChange={(e) => handleEmailChange(e)}
                        />
                        {emailError &&
                        <div className="input_error">????????????????????, ?????????????? ?????????????????? email</div>}
                    </div>
                    <div className="form__input">
                        <input
                            type="text"
                            placeholder="?????????? ????????????????"
                            value={phone}
                            onChange={(e) => handlePhoneChange(e)}
                        />
                        {phoneError &&
                        <div className="input_error">????????????????????, ?????????????? ?????????????????? ?????????? ????????????????</div>}

                    </div>
                    <div className="form__input">
                        <input
                            type="date"
                            placeholder="???????? ????????????????"
                            value={birthday}
                            onChange={({ target: {value} }) => setBirthday(value)}
                        />
                    </div>
                    <div className="form__input">
                        <textarea
                            placeholder="??????????????????"
                            minLength={10}
                            maxLength={301}
                            value={massage}
                            onChange={(e) => handleMassageChange(e)}
                        />
                        {massageError &&
                        <div className="input_error">?????????????????? ?????????????? {massage.length > 300 && "??????????????"}{massage.length < 10 && "????????????????"}</div>}
                    </div>
                </div>
                <button
                    type="submit"
                    disabled={isLoading}
                    onClick={handleSubmitForm}>
                    ??????????????????
                </button>
            </div>
            {responseMessage && (
                <div className="response">{responseMessage}</div>
            )}
        </main>
    )
}

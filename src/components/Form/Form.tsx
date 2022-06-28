import "./Form.css"

export const Form = () => {
    return (
        <>
            <div className="circle" />
            <div className="form__container">
                <h1>Оставить заявку</h1>
                <div className="form__inputs-wrapper">
                    <div className="form__input">
                        <input type="text" placeholder="Имя Фамилия"/>
                    </div>
                    <div className="form__input">
                        <input type="text" placeholder="E-mail"/>
                    </div>
                    <div className="form__input">
                        <input type="text" placeholder="Номер телефона"/>
                    </div>
                    <div className="form__input">
                        <input type="date" placeholder="Дата рождения"/>
                    </div>
                    <div className="form__input">
                        <textarea placeholder="Сообщение"/>
                    </div>
                </div>
                <button>Отправить</button>
            </div>
        </>
    )
}

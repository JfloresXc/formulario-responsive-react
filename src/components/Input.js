import React from 'react'
import '../css/input.css'

function Input(props) {
    const { name, title, example, messageError } = props

    const expresiones = {
        user: /^[a-zA-Z0-9\_\-]{4,16}$/, // Letras, numeros, guion y guion_bajo
        name: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
        password: /^.{4,12}$/, // 4 a 12 digitos.
        email: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
        phone: /^\d{7,9}$/ // 7 a 14 numeros.
    }

    const handleValidateInput = (e) => {
        const { name, value } = e.target

        if (name === 'password2') {
            confirmPassword()
            return 0
        }

        if (name === 'password') {
            confirmPassword()
        }

        validateInput(name, expresiones[`${name}`], value)

    }

    const validateInput = (name, expresion, value) => {
        if (expresion.test(value)) {
            document.querySelector(`.form__group-${name}`).classList.remove('form__group-wrong')
            document.querySelector(`.form__group-${name}`).classList.add('form__group-success')
            document.querySelector(`.form__group-${name} .form__icon`).innerHTML = 'task_alt'
            props.confirmInput(true, name)
        } else {
            document.querySelector(`.form__group-${name}`).classList.remove('form__group-success')
            document.querySelector(`.form__group-${name}`).classList.add('form__group-wrong')
            document.querySelector(`.form__group-${name} .form__icon`).innerHTML = 'highlight_off'
            props.confirmInput(false, name)
        }
    }

    const confirmPassword = () => {
        const password = document.getElementById('password').value
        const password2 = document.getElementById('password2').value

        if (password === password2) {
            document.querySelector(`.form__group-password2`).classList.remove('form__group-wrong')
            document.querySelector(`.form__group-password2`).classList.add('form__group-success')
            document.querySelector(`.form__group-password2 .form__icon`).innerHTML = 'task_alt'
            props.confirmInput(true, 'password2')
        } else {
            document.querySelector(`.form__group-password2`).classList.remove('form__group-success')
            document.querySelector(`.form__group-password2`).classList.add('form__group-wrong')
            document.querySelector(`.form__group-password2 .form__icon`).innerHTML = 'highlight_off'
            props.confirmInput(false, 'password2')
        }
    }

    return (
        <div className={`form__group form__group-${name}`}>
            <label htmlFor={name} className="form__title-input">{title}</label>
            <div className="form__group-input">
                <input type={name === 'password' || name === 'password2' ? 'password' : 'text'} 
                className="form__input" name={name} placeholder={example} id={name} 
                onKeyUp={handleValidateInput} onBlur={handleValidateInput} />
                <span className="material-icons form__icon"></span>
            </div>
            <div className="form__message-error">{messageError}</div>
        </div>
    )
}

export default Input
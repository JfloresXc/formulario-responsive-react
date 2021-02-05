import React, { useState } from 'react'
import Input from './Input.js'
import '../css/form.css'

function Form() {
    const initialsValuesValidated = {
        user: false,
        name: false,
        password: false,
        password2: false,
        email: false,
        phone: false
    }
    const [valuesValidated, setValuesValidated] = useState(initialsValuesValidated)

    const handleSubmit = (e) => {
        e.preventDefault()

        const terms = document.getElementById('terms').checked
        const { name, user, password, password2, email, phone } = valuesValidated
        if (user && name && password && password2 && email && phone && terms) {
            document.querySelector('.form').reset()
            document.querySelectorAll('.form__icon').forEach((icon) => {
                icon.innerHTML = ''
            })
            document.querySelector('.form').classList.remove('form__wrong')
            document.querySelector('.form').classList.add('form__success')
            setTimeout(() => {
                document.querySelector('.form').classList.remove('form__success')
            }, 4000);
        } else {
            document.querySelector('.form').classList.add('form__wrong')
        }
    }

    const confirmInput = (validateInput, name) => {
        setValuesValidated({ ...valuesValidated, [name]: validateInput })
    }

    return (
        <form className="form" onSubmit={handleSubmit}>
            {/* Group user */}
            <Input name="user" title="User" example="john_wick"
                messageError="El usuario tiene que ser de 4 a 16 dígitos y solo puede contener numeros, letras y guion bajo."
                confirmInput={confirmInput} />

            {/* Group name */}
            <Input name="name" title="Name" example="John Wick"
                messageError="El nombre solo puede contener letras y espacios."
                confirmInput={confirmInput} />

            {/* Group password */}
            <Input name="password" title="Password" example=""
                messageError="La contraseña debe ser de 4 a 12 dígitos."
                confirmInput={confirmInput} />

            {/* Group password2 */}
            <Input name="password2" title="Re-enter password" example=""
                messageError="Ambas contraseñas deben ser iguales."
                confirmInput={confirmInput} />

            {/* Group email */}
            <Input name="email" title="Email" example="john_wick@email.com"
                messageError="El correo solo puede contener letras, números, puntos guiones y guion bajo."
                confirmInput={confirmInput} />

            {/* Group phone */}
            <Input name="phone" title="Phone" example="961750240"
                messageError="El teléfono solo puede contener números y el máximo son 14 dígitos."
                confirmInput={confirmInput} />

            {/* Group terms */}
            <div className="form__group-terms">
                <input type="checkbox" name="terms" id="terms" />
                <label htmlFor="terms" className="form__terms">Terms and conditions</label>
            </div>

            {/* Submit error */}
            <div className="form__group-message-submit-error">
                <span className="material-icons">warning_amber</span>
                <p className="form__message-submit-error">Please fill the form correctly.</p>
            </div>

            {/* Button submit */}
            <div className="form__group-button-submit">
                <button type="submit" className="form__button-submit">Send</button>
                <p className="form__message-success">Sent successfully</p>
            </div>
        </form>
    )
}

export default Form
import React, { useState } from "react"
import "../Form/Form.css"
import Form from "../Form/Form"
import useForm from "../../hooks/useForm"
import { EMAIL_VALIDATION } from "../../utils/constants"

function Login({ onAuthorization, isLoading }) {
  // Использование пользовательского хука useForm()
  const { enteredValues, errors, handleChangeInput, isFormValid } = useForm()
  // Обработчик отправки формы
  function onSubmitUserForm(event) {
    event.preventDefault()
    // Вызов функции onAuthorization с данными введенных значений формы
    onAuthorization({
      email: enteredValues.email,
      password: enteredValues.password,
    })
  }

  return (
    <Form
      title="Рады видеть!"
      buttonText="Войти"
      question="Еще не зарегистрированы?"
      linkText=" Регистрация"
      link="/signup"
      formName="login"
      onSubmit={onSubmitUserForm}
      isDisabled={!isFormValid}
      isLoading={isLoading}
      noValidate
    >
      <label className="page__form-label">
        E-mail
        <input
          name="email"
          className="page__form-input"
          id="email-input"
          type="email"
          minLength="5"
          maxLength="40"
          required
          placeholder="почта"
          onChange={handleChangeInput}
          pattern={EMAIL_VALIDATION}
          value={enteredValues.email || ""}
        />
        <span className="page__form-input-error">{errors.email}</span>
      </label>
      <label className="page__form-label">
        Пароль
        <input
          name="password"
          className="page__form-input"
          id="password-input"
          type="password"
          minLength="4"
          maxLength="40"
          required
          placeholder="пароль"
          onChange={handleChangeInput}
          value={enteredValues.password || ""}
        />
        <span className="page__form-input-error">{errors.password}</span>
      </label>

      {/*  <button
        type='submit'
        className={`page__form-save-btn ${!isValid ? 'page__form-save-btn_inactive' : ''}`}
        disabled={!isValid}
      >
        Войти
      </button>*/}
    </Form>
  )
}

export default Login

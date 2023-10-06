import React from "react"
import "../Form/Form.css"
import Form from "../Form/Form"
import { EMAIL_VALIDATION } from "../../utils/constants"
import useForm from "../../hooks/useForm"

function Register({ isLoading, onRegister }) {
  const { enteredValues, errors, handleChangeInput, isFormValid } = useForm()

  function onSubmitUserForm(event) {
    event.preventDefault()
    onRegister({
      name: enteredValues.name,
      email: enteredValues.email,
      password: enteredValues.password,
    })
  }


  return (
    <Form
      title='Добро пожаловать!'
      buttonText='Зарегистрироваться'
      question='Уже зарегистрированы?'
      linkText=' Войти'
      link='/signin'
      formName='register'
      onSubmit={onSubmitUserForm}
      isDisabled={!isFormValid}
      isLoading={isLoading}
    >
      <label className='page__form-label'>
        Имя
        <input
          name='name'
          className='page__form-input'
          id='name-input'
          type='text'
          minLength='2'
          maxLength='40'
          required
          placeholder='имя'
          onChange={handleChangeInput}
          value={enteredValues.name || ""}
        />
        <span
          className="page__form-input-error"
        >
          {errors.name}
        </span>
      </label>
      <label className='page__form-label'>
        E-mail
        <input
          name='email'
          className='page__form-input'
          id='email-input'
          type='email'
          minLength='5'
          maxLength='40'
          required
          placeholder='почта'
          onChange={handleChangeInput}
          pattern={EMAIL_VALIDATION}
          value={enteredValues.email || ""}
        />
        <span
          className="page__form-input-error"
        >
          {errors.email}
        </span>
      </label>
      <label className='page__form-label'>
        Пароль
        <input
          name='password'
          className='page__form-input'
          id='password-input'
          type='password'
          minLength='4'
          maxLength='40'
          required
          placeholder='пароль'
          onChange={handleChangeInput}
          value={enteredValues.password || ""}
        />
        <span
          className="page__form-input-error"
        >
          {errors.password}
        </span>
      </label>

    {/*  <button
        type='submit'
        className="page__form-input-error"
        disabled={!isValid}
      >
        Зарегистрироваться
      </button>*/} 
    </Form>
  );
}

export default Register;

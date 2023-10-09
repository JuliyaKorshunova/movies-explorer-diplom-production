import React, { useEffect, useContext, useState } from "react"
import CurrentUserContext from "../CurrentUserContext/CurrentUserContext"
import useForm from "../../hooks/useForm"
import "./Profile.css"
import Header from "../Header/Header"
import { EMAIL_VALIDATION } from "../../utils/constants"

function Profile({ isLoading, signOut, onUpdateUser, loggedIn }) {
  const currentUser = useContext(CurrentUserContext)
  const { enteredValues, errors, handleChangeInput, isFormValid, resetForm } =
    useForm()
  const [isLastValues, setIsLastValues] = useState(false)

  useEffect(() => {
    if (currentUser) {
      resetForm(currentUser)
    }
  }, [currentUser, resetForm])

  function onSubmitUserForm(e) {
    e.preventDefault()
    onUpdateUser({
      name: enteredValues.name,
      email: enteredValues.email,
    })
    console.log("click")
  }

  useEffect(() => {
    if (
      currentUser.name === enteredValues.name &&
      currentUser.email === enteredValues.email
    ) {
      setIsLastValues(true)
    } else {
      setIsLastValues(false)
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [enteredValues])

  return (
    <>
      <Header loggedIn={loggedIn} />
      <main className="profile">
        <section className="profile__container">
          <h1 className="profile__titlle">Привет, {currentUser.name}!</h1>
          <form
            id="form"
            className="profile__form"
            onSubmit={onSubmitUserForm}
            noValidate
          >
            <label className="profile__label">
              Имя
              <input
                className="profile__input"
                type="text"
                name="name"
                id="name-input"
                minLength="2"
                maxLength="40"
                required
                onChange={handleChangeInput}
                value={enteredValues.name || ""}
              />
            </label>
            <span className="profile__input-error">{errors.name}</span>
            <label className="profile__label">
              E-mail
              <input
                className="profile__input"
                type="email"
                name="email"
                id="email-input"
                minLength="5"
                maxLength="40"
                required
                onChange={handleChangeInput}
                pattern={EMAIL_VALIDATION}
                value={enteredValues.email || ""}
              />
            </label>
            <span className="profile__input-error">{errors.email}</span>

            <div className="profile__buttons">
              <button
                type="submit"
                aria-label="редактировать профиль"
                disabled={!isFormValid ? true : false}
                className={
                  !isFormValid || isLoading || isLastValues
                    ? "profile__edit-button page__form-save-btn_inactive"
                    : "profile__edit-button"
                }
              >
                Редактировать
              </button>

              <button to="/" className="profile__exit" onClick={signOut}>
                Выйти из&nbsp;аккаунта
              </button>
            </div>
          </form>
        </section>
      </main>
    </>
  )
}

export default Profile

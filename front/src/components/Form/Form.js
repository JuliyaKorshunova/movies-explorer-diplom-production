import React from "react"
import { Link } from "react-router-dom"
import "./Form.css"
import logo from "../../images/logo.png"

function Form({
  linkText,
  link,
  children,
  title,
  buttonText,
  question,
  onSubmit,
  isDisabled,
  isLoading,
}) {
  return (
    <main className="page__form">
      <section className="page__form-container">
        <Link to="/" className="page__form-logo">
          <img src={logo} alt="логотип cайта" />
        </Link>
        <h1 className="page__form-title">{title}</h1>
        <form
          className="page__form-form"
          id="form"
          noValidate
          onSubmit={onSubmit}
        >
          {children}

          <button
            type="submit"
            disabled={isDisabled ? true : false}
            className={
              isDisabled || isLoading
                ? "page__form-save-btn page__form-save-btn_inactive"
                : "page__form-save-btn"
            }
          >
            {buttonText}
          </button>
        </form>
        <p className="page__form-text">
          {question}
          <Link to={link} className="page__form-link">
            {linkText}
          </Link>
        </p>
      </section>
    </main>
  )
}

export default Form

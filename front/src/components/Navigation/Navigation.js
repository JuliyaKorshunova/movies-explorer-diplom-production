import React from "react"
import { Link, NavLink } from "react-router-dom"
import "./Navigation.css"
import account from "../../images/profile777.svg"

function Navigation({ handleClose }) {
  // Функция для смены цвета для активной ссылки
  const setActive = ({ isActive }) =>
    isActive ? "navigation__link_active" : "navigation__link"

  return (
    <div className="navigation__page-overlay">
      <div className="navigation__overlay-container"></div>
      <nav className="navigation__menu">
        <button
          className="navigation__close-button"
          onClick={handleClose}
        ></button>
        <nav className="navigation__links">
          <NavLink to="/" className={setActive} onClick={handleClose}>
            Главная
          </NavLink>
          <NavLink to="/movies" className={setActive} onClick={handleClose}>
            Фильмы
          </NavLink>
          <NavLink to="/saved-movies" className={setActive} onClick={handleClose}>
            Сохранённые фильмы
          </NavLink>
        </nav>
        <Link to="/profile" className="navigation__account-button">
          <img src={account} alt="аккаунт" onClick={handleClose}/>
        </Link>
      </nav>
    </div>
  )
}

export default Navigation

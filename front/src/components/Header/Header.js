import React from "react"
import { Link, NavLink, useLocation } from "react-router-dom"
import "./Header.css"
import logo from "../../images/logo.png"
import account from "../../images/profile777.svg"
import menu from "../../images/menu-button.svg"
import Navigation from "../Navigation/Navigation"

function Header({ loggedIn }) {
  const location = useLocation()

  const [isClicked, setIsClicked] = React.useState(false)

  // Функция для смены цвета для активной ссылки
  const setActive = ({ isActive }) =>
    isActive ? "header__button_active" : "header__button"

  function handleOpen() {
    setIsClicked(true)
  }

  function handleClose() {
    setIsClicked(false)
  }

  return (
    <>
      {!loggedIn ? (
        <header className="header" id="header">
          <Link to="/" className="header__logo">
            <img src={logo} alt="логотип сайта" />
          </Link>
          <div className="header__button-container">
            <Link to="/signup" className="header__button">
              Регистрация
            </Link>
            <Link to="/signin" className="header__button header__button-green">
              Войти
            </Link>
          </div>
        </header>
      ) : (
        <header className="header header_gray" id="header-gray">
          <Link to="/" className="header__logo">
            <img src={logo} alt="логотип сайта" />
          </Link>
          <div className="header__films-container">
            <NavLink to="/movies" className={setActive}>
              Фильмы
            </NavLink>
            <NavLink to="/saved-movies" className={setActive}>
              Сохранённые фильмы
            </NavLink>
          </div>
          <nav className="header__button-container">
            <Link to="/profile" className="header__account-button">
              <img
                className="header__account-image"
                src={account}
                alt="изображение кнопки аккаунта"
              />
            </Link>
            <button className="header__menu-button" onClick={handleOpen}>
              <img src={menu} alt="меню" />
            </button>
          </nav>
          {isClicked ? <Navigation handleClose={handleClose} /> : ""}
        </header>
      )}
    </>
  )
}

export default Header

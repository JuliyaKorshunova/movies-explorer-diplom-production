import React, { useState, useEffect } from "react"
import { useLocation } from "react-router-dom"
import "./SearchForm.css"
import FilterCheckbox from "../../FilterCheckbox/FilterCheckbox"

function SearchForm({ isShortMovies, searchAndFilterMovies, onFilterMovies }) {
  const [request, setRequest] = useState("")
  const [isQueryError, setisQueryError] = useState(false)
  const location = useLocation()

  function onSubmitUserForm(e) {
    e.preventDefault()
    if (request.trim().length === 0) {
      setisQueryError(true)
    } else {
      setisQueryError(false)
      searchAndFilterMovies(request)
    }
  }

  function handleChangeInputRequest(e) {
    setRequest(e.target.value)
  }

  useEffect(() => {
    if (
      location.pathname === "/movies" &&
      localStorage.getItem("movieSearch")
    ) {
      const localRequest = localStorage.getItem("movieSearch")
      setRequest(localRequest)
    }
  }, [location])

  return (
    <section className="search" aria-label="поиск фильмов">
      <form className="search__form" id="form" onSubmit={onSubmitUserForm}>
        <div className="search-form__input-container">
          <input
            name="query"
            className="search__input"
            id="search-input"
            type="text"
            placeholder="Фильм"
            onChange={handleChangeInputRequest}
            value={request || ""}
          ></input>
          <button
            className="search__button"
            type="submit"
            aria-label="Поиск фильмов"
          ></button>
        </div>

        <FilterCheckbox
          isShortMovies={isShortMovies}
          onFilterMovies={onFilterMovies}
        />

        {isQueryError && (
          <span className="search__form-error">Введите ключевое слово</span>
        )}
        <div className="search__border-bottom"></div>
      </form>
    </section>
  )
}

export default SearchForm

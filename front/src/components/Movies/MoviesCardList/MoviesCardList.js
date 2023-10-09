import React, { useEffect, useState } from "react"
import "./MoviesCardList.css"
import MoviesCard from "../MoviesCard/MoviesCard"
import Preloader from "../../Preloader/Preloader"
import SearchError from "../../SearchError/SearchError"
import { useLocation } from "react-router-dom"

function MoviesCardList({
  cards,
  isLoading,
  isNotFound,
  isSavedFilms,
  savedMovies,
  isReqError,
  handleLikeFilm,
  onDeleteCard,
}) {
  const { pathname } = useLocation()

  const [shownMovies, setShownMovies] = useState(0)

  function setMoviesShownCount() {
    const display = window.innerWidth
    if (display > 1279) {
      setShownMovies(16)
    } else if (display > 767) {
      setShownMovies(8)
    } else {
      setShownMovies(5)
    }
  }

  function getMovieFromSaved(savedMovies, card) {
    return savedMovies.find((savedMovie) => savedMovie.movieId === card.id)
  }

  function expandMoviesDisplay() {
    const display = window.innerWidth
    if (display > 1279) {
      setShownMovies(shownMovies + 4)
    } else if (display > 767) {
      setShownMovies(shownMovies + 2)
    } else {
      setShownMovies(shownMovies + 2)
    }
  }

  useEffect(() => {
    setTimeout(() => {
      window.addEventListener("resize", setMoviesShownCount)
    }, 500)
    return () => {
      window.removeEventListener("resize", setMoviesShownCount)
    }
  })

  useEffect(() => {
    setMoviesShownCount()
  }, [cards])

  return (
    <section className="cards">
      {isLoading && <Preloader />}
      {isNotFound && !isLoading && (
        <SearchError errorText={"Ничего не найдено"} />
      )}
      {isReqError && !isLoading && (
        <SearchError
          errorText={
            "Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз"
          }
        />
      )}
      {!isLoading && !isReqError && !isNotFound && (
        <>
          {pathname === "/saved-movies" ? (
            <>
              <ul className="cards__list">
                {cards.map((card) => (
                  <MoviesCard
                    key={isSavedFilms ? card._id : card.id}
                    saved={getMovieFromSaved(savedMovies, card)}
                    cards={cards}
                    card={card}
                    handleLikeFilm={handleLikeFilm}
                    isSavedFilms={isSavedFilms}
                    onDeleteCard={onDeleteCard}
                    savedMovies={savedMovies}
                  />
                ))}
              </ul>
              <div className="cards__button-wrapper"></div>
            </>
          ) : (
            <>
              <ul className="cards__list">
                {cards.slice(0, shownMovies).map((card) => (
                  <MoviesCard
                    key={isSavedFilms ? card._id : card.id}
                    saved={getMovieFromSaved(savedMovies, card)}
                    cards={cards}
                    card={card}
                    handleLikeFilm={handleLikeFilm}
                    isSavedFilms={isSavedFilms}
                    onDeleteCard={onDeleteCard}
                    savedMovies={savedMovies}
                  />
                ))}
              </ul>
              <div className="cards__button-wrapper">
                {cards.length > shownMovies ? (
                  <button
                    className="cards__button-wrapper cards__button"
                    onClick={expandMoviesDisplay}
                  >
                    Ещё
                  </button>
                ) : (
                  ""
                )}
              </div>
            </>
          )}
        </>
      )}
    </section>
  )
}

export default MoviesCardList

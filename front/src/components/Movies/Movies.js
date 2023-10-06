import React, { useState, useEffect } from "react"
import "./Movies.css"
import SearchForm from "../Movies/SearchForm/SearchForm"
import MoviesCardList from "../Movies/MoviesCardList/MoviesCardList"
import Header from "../Header/Header"
import Footer from "../Footer/Footer"
import * as movies from "../../utils/MoviesApi"
import { filterMovies, filterDurationMovies } from "../../utils/utils"

function Movies({ loggedIn, handleLikeFilm, savedMovies, onDeleteCard }) {
  const [isShortMovies, setisShortMovies] = useState(false)
  const [isQueryError, setisQueryError] = useState(false)
  const [isNotFound, setIsNotFound] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [initialCardsMovies, setInitialCardsMovies] = useState([])
  const [filteredMovies, setFilteredMovies] = useState([])

  function handleShortFilmFilterToggle() {
    setisShortMovies(!isShortMovies)
    if (!isShortMovies) {
      if (filterDurationMovies(initialCardsMovies).length === 0) {
        setFilteredMovies(filterDurationMovies(initialCardsMovies))
      } else {
        setFilteredMovies(filterDurationMovies(initialCardsMovies))
      }
    } else {
      setFilteredMovies(initialCardsMovies)
    }
    localStorage.setItem("shortMovies", !isShortMovies)
  }

  function updateFilteredMoviesList(movies, query, short) {
    const moviesCardList = filterMovies(movies, query, short)
    setInitialCardsMovies(moviesCardList)
    setFilteredMovies(
      short ? filterDurationMovies(moviesCardList) : moviesCardList
    )
    localStorage.setItem("movies", JSON.stringify(moviesCardList))
    localStorage.setItem("allMovies", JSON.stringify(movies))
  }

  useEffect(() => {
    if (localStorage.getItem("shortMovies") === "true") {
      setisShortMovies(true)
    } else {
      setisShortMovies(false)
    }
  }, [])

  function searchAndFilterMovies(query) {
    localStorage.setItem("movieSearch", query)
    localStorage.setItem("shortMovies", isShortMovies)

    if (localStorage.getItem("allMovies")) {
      const movies = JSON.parse(localStorage.getItem("allMovies"))
      updateFilteredMoviesList(movies, query, isShortMovies)
    } else {
      setIsLoading(true)
      movies
        .getMovies()
        .then((cardsData) => {
          updateFilteredMoviesList(cardsData, query, isShortMovies)
          setisQueryError(false)
        })
        .catch((err) => {
          setisQueryError(true)
          console.log(err)
        })
        .finally(() => {
          setIsLoading(false)
        })
    }
  }

  useEffect(() => {
    if (localStorage.getItem("movieSearch")) {
      setIsNotFound(filteredMovies.length === 0)
    } else {
      setIsNotFound(false)
    }
  }, [filteredMovies])

  useEffect(() => {
    if (localStorage.getItem("movies")) {
      const movies = JSON.parse(localStorage.getItem("movies"))
      setInitialCardsMovies(movies)
      if (localStorage.getItem("shortMovies") === "true") {
        setFilteredMovies(filterDurationMovies(movies))
      } else {
        setFilteredMovies(movies)
      }
    }
  }, [])

  return (
    <>
      <main className="movies">
        <Header loggedIn={loggedIn} />
        <SearchForm
          searchAndFilterMovies={searchAndFilterMovies}
          isShortMovies={isShortMovies}
          onFilterMovies={handleShortFilmFilterToggle}
        />
        <MoviesCardList
          cards={filteredMovies}
          isQueryError={isQueryError}
          isNotFound={isNotFound}
          isLoading={isLoading}
          isSavedFilms={false}
          savedMovies={savedMovies}
          handleLikeFilm={handleLikeFilm}
          onDeleteCard={onDeleteCard}
        />
        <Footer />
      </main>
    </>
  )
}

export default Movies

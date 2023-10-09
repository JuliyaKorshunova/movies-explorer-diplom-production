import React, { useState, useEffect } from "react"
import SearchForm from "../SearchForm/SearchForm"
import MoviesCardList from "../MoviesCardList/MoviesCardList"
import Header from "../../Header/Header"
import Footer from "../../Footer/Footer"
import { filterMovies, filterDurationMovies } from "../../../utils/utils"

function SavedMovies({ loggedIn, onDeleteCard, savedMovies }) {
  const [isNotFound, setIsNotFound] = useState(false)
  const [isSearchRequest, setSearchRequest] = useState("")
  const [isFilteredMovies, setFilteredMovies] = useState(savedMovies)
  const [isShortMovies, setShortFilm] = useState(false)

  useEffect(() => {
    if (isFilteredMovies.length === 0) {
      setIsNotFound(true)
    } else {
      setIsNotFound(false)
    }
  }, [isFilteredMovies])

  useEffect(() => {
    const moviesCardList = filterMovies(savedMovies, isSearchRequest)
    setFilteredMovies(
      isShortMovies ? filterDurationMovies(moviesCardList) : moviesCardList
    )
  }, [savedMovies, isShortMovies, isSearchRequest])

  function handleShortFilmFilterToggle() {
    setShortFilm(!isShortMovies)
  }

  function searchAndFilterMovies(request) {
    setSearchRequest(request)
  }

  return (
    <>
      <section className="movies">
        <Header loggedIn={loggedIn} />
        <SearchForm
          onFilterMovies={handleShortFilmFilterToggle}
          searchAndFilterMovies={searchAndFilterMovies}
        />
        <MoviesCardList
          cards={isFilteredMovies}
          isSavedFilms={true}
          savedMovies={savedMovies}
          onDeleteCard={onDeleteCard}
          isNotFound={isNotFound}
        />
        <Footer />
      </section>
    </>
  )
}

export default SavedMovies

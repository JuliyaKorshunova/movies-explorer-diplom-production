import React, { useState } from "react"
import "./MoviesCard.css"
import { useLocation } from "react-router-dom"
import CardImg from "../../../images/pic__COLOR_pic.png"
import { durationConverterMovies } from "../../../utils/utils"

function MoviesCard({
  card,
  isSavedFilms,
  savedMovies,
  saved,
  handleLikeFilm,
  onDeleteCard,
}) {
  function onDelete() {
    onDeleteCard(card)
  }

  function onCardClick() {
    if (saved) {
      onDeleteCard(savedMovies.filter((m) => m.movieId === card.id)[0])
    } else {
      handleLikeFilm(card)
    }
  }

  const cardLikeButtonClassName = `${
    saved ? "card__like-button card__like-button_active" : "card__like-button"
  }`

  return (
    <>
      <li className="card" key={card.id}>
        <a href={card.trailerLink} target="_blank" rel="noreferrer">
          <img
            className="card__image"
            alt={card.nameRU}
            src={
              isSavedFilms
                ? card.image
                : `https://api.nomoreparties.co/${card.image.url}`
            }
          />
        </a>

        <div className="card__container">
          <div className="card__title-block">
            <h2 className="card__title">{card.nameRU}</h2>
            <p className="card__time">
              {durationConverterMovies(card.duration)}
            </p>
          </div>

          {isSavedFilms ? (
            <button
              type="button"
              className="card__delete-button"
              onClick={onDelete}
            ></button>
          ) : (
            <button
              type="button"
              className={cardLikeButtonClassName}
              onClick={onCardClick}
            ></button>
          )}
        </div>
      </li>
    </>
  )
}

export default MoviesCard

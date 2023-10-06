import React, { useState, useEffect } from "react"
import {
  Route,
  Routes,
  useNavigate,
  useLocation,
  Navigate,
} from "react-router-dom"
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute"
import "./App.css"
import Header from "../Header/Header"
import Profile from "../Profile/Profile"
import Main from "../Main/Main"
import Footer from "../Footer/Footer"
import CurrentUserContext from "../CurrentUserContext/CurrentUserContext"
import InfoToolTipEdit from "../InfoToolTipEdit/InfoToolTipEdit"
import Login from "../Login/Login"
import Register from "../Register/Register"
import Movies from "../Movies/Movies"
import SavedMovies from "../Movies/SavedMovies/SavedMovies"
import InfoToolTip from "../InfoToolTip/InfoToolTip"
import NotFound from "../NotFound/NotFound"
import * as api from "../../utils/MainApi"

function App() {
  const navigate = useNavigate()
  const location = useLocation()
  const path = location.pathname
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [savedMovies, setSavedMovies] = useState([])
  const [currentUser, setCurrentUser] = useState({})
  const [isLoading, setIsLoading] = useState(false)
  const [isEdit, setisEdit] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [isInfoToolTipPopupOpen, setInfoToolTipPopupOpen] = useState(false)
  const [isInfoToolTipUpdatePopupOpen, setInfoToolTipUpdatePopupOpen] =
    useState(false)

  useEffect(() => {
    const jwt = localStorage.getItem("jwt")
    if (jwt) {
      api
        .fetchUserContent(jwt)
        .then((res) => {
          if (res) {
            localStorage.removeItem("allMovies")
            setIsLoggedIn(true)
          }
          navigate(path)
        })
        .catch((err) => {
          console.log(err)
        })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (isLoggedIn) {
      api
        .getUserProfile()
        .then((profileInfo) => {
          setCurrentUser(profileInfo)
        })
        .catch((err) => {
          console.log(err)
        })
      api
        .getMovies()
        .then((cardsData) => {
          setSavedMovies(cardsData.reverse())
        })
        .catch((err) => {
          console.log(err)
        })
    }
  }, [isLoggedIn])

  function handleRegistrationUser({ name, email, password }) {
    api
      .register(name, email, password)
      .then(() => {
        setInfoToolTipPopupOpen(true)
        setIsSuccess(true)
        handleAuthorizationUser({ email, password })
      })
      .catch((err) => {
        setInfoToolTipPopupOpen(true)
        setIsSuccess(false)
        console.log(err)
      })
  }

  function handleAuthorizationUser({ email, password }) {
    setIsLoading(true)
    api
      .authorize(email, password)
      .then((res) => {
        if (res) {
          setInfoToolTipPopupOpen(true)
          setIsSuccess(true)
          localStorage.setItem("jwt", res.token)
          navigate("/movies", { replace: true })
          setIsLoggedIn(true)
        }
      })
      .catch((err) => {
        setInfoToolTipPopupOpen(true)
        setIsSuccess(false)
        console.log(err)
      })
      .finally(() => {
        setIsLoading(false)
      })
  }

  function handleEditorUser(newUserInfo) {
    setIsLoading(true)
    api
      .modifyUserInfo(newUserInfo)
      .then((data) => {
        setInfoToolTipUpdatePopupOpen(true)
        setisEdit(true)
        setCurrentUser(data)
      })
      .catch((err) => {
        setInfoToolTipUpdatePopupOpen(true)
        setisEdit(false)
        console.log(err)
        handleUnauthorizedError(err)
      })
      .finally(() => {
        setIsLoading(false)
      })
  }

  function handleCardLikeFilm(card) {
    api
      .createMovieOnServer(card)
      .then((newMovie) => {
        setSavedMovies([newMovie, ...savedMovies])
      })
      .catch((err) => {
        setIsSuccess(false)
        console.log(err)
        handleUnauthorizedError(err)
      })
  }

  function handleCardDeleteFilm(card) {
    api
      .deleteMovieOnServer(card._id)
      .then(() => {
        setSavedMovies((state) => state.filter((item) => item._id !== card._id)) // Удаляем карточку из списка избранных карточек
      })
      .catch((err) => {
        setIsSuccess(false)
        console.log(err)
        handleUnauthorizedError(err)
      })
  }

  function handleUnauthorizedError(err) {
    if (err === "Error: 401") {
      handleSignOut()
    }
  }

  const handleSignOut = () => {
    setIsLoggedIn(false)
    localStorage.removeItem("jwt")
    localStorage.removeItem("shortMovies")
    localStorage.removeItem("movieSearch")
    localStorage.removeItem("allMovies")
    localStorage.removeItem("movies")

    navigate("/")
  }

  const isOpen = isInfoToolTipPopupOpen || isInfoToolTipUpdatePopupOpen

  useEffect(() => {
    function closeByEscape(evt) {
      if (evt.key === "Escape") {
        closeAllPopups()
      }
    }
    if (isOpen) {
      document.addEventListener("keydown", closeByEscape)
      return () => {
        document.removeEventListener("keydown", closeByEscape)
      }
    }
  }, [isOpen])

  function closeAllPopups() {
    setInfoToolTipPopupOpen(false)
    setInfoToolTipUpdatePopupOpen(false)
  }

  function closeByOverlay(event) {
    if (event.target === event.currentTarget) {
      closeAllPopups()
    }
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="root">
        <div className="page">
          <Routes>
            <Route
              path={"/"}
              element={
                <>
                  <Header loggedIn={isLoggedIn} />
                  <Main />
                  <Footer />
                </>
              }
            />
            <Route
              path={"/signin"}
              element={
                isLoggedIn ? (
                  <Navigate to="/movies" replace />
                ) : (
                  <Login
                    isLoading={isLoading}
                    onAuthorization={handleAuthorizationUser}
                  />
                )
              }
            />
            <Route
              path={"/signup"}
              element={
                isLoggedIn ? (
                  <Navigate to="/movies" replace />
                ) : (
                  <Register
                    onRegister={handleRegistrationUser}
                    isLoading={isLoading}
                  />
                )
              }
            />
            <Route path={"*"} element={<NotFound />} />
            <Route
              path={"/movies"}
              element={
                <ProtectedRoute
                  path="/movies"
                  loggedIn={isLoggedIn}
                  component={Movies}
                  handleLikeFilm={handleCardLikeFilm}
                  onDeleteCard={handleCardDeleteFilm}
                  savedMovies={savedMovies}
                />
              }
            />
            <Route
              path={"/saved-movies"}
              element={
                <ProtectedRoute
                  path="/saved-movies"
                  savedMovies={savedMovies}
                  loggedIn={isLoggedIn}
                  onDeleteCard={handleCardDeleteFilm}
                  component={SavedMovies}
                />
              }
            />
            <Route
              path={"/profile"}
              element={
                <ProtectedRoute
                  path="/profile"
                  component={Profile}
                  isLoading={isLoading}
                  signOut={handleSignOut}
                  onUpdateUser={handleEditorUser}
                  loggedIn={isLoggedIn}
                />
              }
            />
          </Routes>
          <InfoToolTip
            isOpen={isInfoToolTipPopupOpen}
            isSuccess={isSuccess}
            onCloseOverlay={closeByOverlay}
            onClose={closeAllPopups}
          />
          <InfoToolTipEdit
            isOpen={isInfoToolTipUpdatePopupOpen}
            isEdit={isEdit}
            onCloseOverlay={closeByOverlay}
            onClose={closeAllPopups}
          />
        </div>
      </div>
    </CurrentUserContext.Provider>
  )
}

export default App

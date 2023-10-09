import React from "react"
import "./SearchError.css"

function SearchError({ errorText }) {
  return (
    <div className="search">
      <p className="search__error search__error_center">{errorText}</p>
    </div>
  )
}

export default SearchError

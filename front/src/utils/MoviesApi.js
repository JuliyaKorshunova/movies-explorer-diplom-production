import { BASE_URL_MOVIE_API_YANDEX } from "./UrlApi"
import { handleSendingReq } from "./utils"

export function getMovies() {
  return fetch(BASE_URL_MOVIE_API_YANDEX, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  }).then((res) => handleSendingReq(res))
}

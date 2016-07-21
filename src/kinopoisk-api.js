import got from 'got'
import mem from 'mem'
import flatten from 'lodash.flatten'

const api = 'http://api.kinopoisk.cf'
const memgot = mem(got, { maxAge: 1000 })
const f = uri => memgot(`${api}/${uri}`, { json: true }).then(res => res.body)

export function getFilm (filmID) {
  return f(`getFilm?filmID=${filmID}`)
}

export function getStaff (filmID) {
  return f(`getStaff?filmID=${filmID}`)
}

export function getGallery (filmID) {
  return f(`getGallery?filmID=${filmID}`)
}

export function getSimilar (filmID) {
  return f(`getSimilar?filmID=${filmID}`)
}

export function getReviews (filmID) {
  return f(`getReviews?filmID=${filmID}`)
}

export function getReviewDetail (reviewID) {
  return f(`getReviewDetail?reviewID=${reviewID}`)
}

export function getSeance (filmID) {
  return f(`getSeance?filmID=${filmID}`)
}

export function searchFilms (...keywords) {
  return f(`searchFilms?keyword=${flatten(keywords).join(',')}`)
}

export function getTodayFilms () {
  return f('getTodayFilms')
}

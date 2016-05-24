import path from 'path'
import test from 'ava'
import nock from 'nock'
import * as kinopoisk from '../src/kinopoisk-api'

const filmID = 333
const scope = nock('http://api.kinopoisk.cf')

test('get film', async t => {
  scope
    .get('/getFilm')
    .query({ filmID })
    .replyWithFile(200, path.join(__dirname, 'fixtures', 'film.json'))

  const film = await kinopoisk.getFilm(filmID)
  t.truthy(film)
})

test('get staff', async t => {
  scope
    .get('/getStaff')
    .query({ filmID })
    .replyWithFile(200, path.join(__dirname, 'fixtures', 'staff.json'))

  const staff = await kinopoisk.getStaff(filmID)
  t.truthy(staff)
})

test('get gallery', async t => {
  scope
    .get('/getGallery')
    .query({ filmID })
    .replyWithFile(200, path.join(__dirname, 'fixtures', 'gallery.json'))

  const gallery = await kinopoisk.getGallery(filmID)
  t.truthy(gallery)
})

test('get similar', async t => {
  scope
    .get('/getSimilar')
    .query({ filmID })
    .replyWithFile(200, path.join(__dirname, 'fixtures', 'similar.json'))

  const similar = await kinopoisk.getSimilar(filmID)
  t.truthy(similar)
})

test('get reviews', async t => {
  scope
    .get('/getReviews')
    .query({ filmID })
    .replyWithFile(200, path.join(__dirname, 'fixtures', 'reviews.json'))

  const reviews = await kinopoisk.getReviews(filmID)
  t.truthy(reviews)
})

test('get full review', async t => {
  scope
    .get('/getReviewDetail')
    .query({ reviewID: 2341463 })
    .replyWithFile(200, path.join(__dirname, 'fixtures', 'detailReview.json'))

  const fullReview = await kinopoisk.getReviewDetail(2341463)
  t.truthy(fullReview)
})

test('get seance', async t => {
  scope
    .get('/getSeance')
    .query({ filmID })
    .replyWithFile(200, path.join(__dirname, 'fixtures', 'seance.json'))

  const seance = await kinopoisk.getSeance(filmID)
  t.truthy(seance)
})

test('search films', async t => {
  scope
    .get('/searchFilms')
    .query({ keyword: 'star,wars' })
    .times(2)
    .replyWithFile(200, path.join(__dirname, 'fixtures', 'search.json'))

  const result1 = await kinopoisk.searchFilms(['star', 'wars'])
  const result2 = await kinopoisk.searchFilms('star', 'wars')
  t.deepEqual(result1, result2)
})

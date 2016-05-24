import path from 'path'
import test from 'ava'
import nock from 'nock'
import fs from 'mz/fs'
import * as kinopoisk from '../src/kinopoisk-api'

const filmID = 333
const scope = nock('http://api.kinopoisk.cf')

test('get film', async t => {
  const fixturePath = path.join(__dirname, 'fixtures', 'film.json')
  scope
    .get('/getFilm')
    .query({ filmID })
    .replyWithFile(200, fixturePath)

  const expected = await fs.readFile(fixturePath, { encoding: 'utf8' })
  const film = await kinopoisk.getFilm(filmID)
  t.deepEqual(film, JSON.parse(expected))
})

test('get staff', async t => {
  const fixturePath = path.join(__dirname, 'fixtures', 'staff.json')
  scope
    .get('/getStaff')
    .query({ filmID })
    .replyWithFile(200, fixturePath)

  const expected = await fs.readFile(fixturePath, { encoding: 'utf8' })
  const staff = await kinopoisk.getStaff(filmID)
  t.deepEqual(staff, JSON.parse(expected))
})

test('get gallery', async t => {
  const fixturePath = path.join(__dirname, 'fixtures', 'gallery.json')
  scope
    .get('/getGallery')
    .query({ filmID })
    .replyWithFile(200, fixturePath)

  const expected = await fs.readFile(fixturePath, { encoding: 'utf8' })
  const gallery = await kinopoisk.getGallery(filmID)
  t.deepEqual(gallery, JSON.parse(expected))
})

test('get similar', async t => {
  const fixturePath = path.join(__dirname, 'fixtures', 'similar.json')
  scope
    .get('/getSimilar')
    .query({ filmID })
    .replyWithFile(200, fixturePath)

  const expected = await fs.readFile(fixturePath, { encoding: 'utf8' })
  const similar = await kinopoisk.getSimilar(filmID)
  t.deepEqual(similar, JSON.parse(expected))
})

test('get reviews', async t => {
  const fixturePath = path.join(__dirname, 'fixtures', 'reviews.json')
  scope
    .get('/getReviews')
    .query({ filmID })
    .replyWithFile(200, fixturePath)

  const expected = await fs.readFile(fixturePath, { encoding: 'utf8' })
  const reviews = await kinopoisk.getReviews(filmID)
  t.deepEqual(reviews, JSON.parse(expected))
})

test('get full review', async t => {
  const fixturePath = path.join(__dirname, 'fixtures', 'detailReview.json')
  scope
    .get('/getReviewDetail')
    .query({ reviewID: 2341463 })
    .replyWithFile(200, fixturePath)

  const expected = await fs.readFile(fixturePath, { encoding: 'utf8' })
  const fullReview = await kinopoisk.getReviewDetail(2341463)
  t.deepEqual(fullReview, JSON.parse(expected))
})

test('get seance', async t => {
  const fixturePath = path.join(__dirname, 'fixtures', 'seance.json')
  scope
    .get('/getSeance')
    .query({ filmID })
    .replyWithFile(200, fixturePath)

  const expected = await fs.readFile(fixturePath, { encoding: 'utf8' })
  const seance = await kinopoisk.getSeance(filmID)
  t.deepEqual(seance, JSON.parse(expected))
})

test('search films', async t => {
  const fixturePath = path.join(__dirname, 'fixtures', 'search.json')
  scope
    .get('/searchFilms')
    .query({ keyword: 'star,wars' })
    .times(2)
    .replyWithFile(200, fixturePath)

  const result1 = await kinopoisk.searchFilms(['star', 'wars'])
  const result2 = await kinopoisk.searchFilms('star', 'wars')
  t.deepEqual(result1, result2)
})

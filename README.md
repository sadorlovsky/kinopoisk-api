# Unofficial API Wrapper for kinopoisk.ru

[![Build Status](https://travis-ci.org/sadorlovsky/kinopoisk-api.svg?branch=master)](https://travis-ci.org/sadorlovsky/kinopoisk-api)
[![Coverage Status](https://coveralls.io/repos/github/sadorlovsky/kinopoisk-api/badge.svg?branch=master)](https://coveralls.io/github/sadorlovsky/kinopoisk-api?branch=master)

## Usage
```javascript
import kinopoisk from 'kinopoisk-api'

kinopoisk.getFilm(333).then(film => console.log(film))
```

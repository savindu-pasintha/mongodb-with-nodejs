const { BookModelSchema } = require('../model/index')
var express = require('express')
const puppeter = require('puppeteer')
var jwt = require('jsonwebtoken')

var router = express.Router()
var tokens = []

const autorizedHeader = (req) => {
  if (
    typeof req.headers['token'] !== 'undefined' &&
    req.headers['token'] !== null &&
    req.headers['token'] != ''
  ) {
    return true
  }
}

router.get('/book/create/token', function (req, res, next) {
  var userData = req?.body
    ? req.body
    : {
        id: Math.round(Math.random(100000)),
        role: 'admin',
        username: 'savindu',
        password: '12345',
      }
  var expireTimeOneHour = Math.floor(Date.now() / 1000) + 60 * 60
  jwt.sign(
    {
      user: userData,
      exp: expireTimeOneHour,
    },
    'secret',
    (err, token) => {
      if (err) {
        res.json({ error: err })
      } else {
        tokens[0] = token
        res.json({
          token: token,
          exp: { time: '1hour', num: expireTimeOneHour },
          expActualDate: new Date(expireTimeOneHour),
        })
      }
    },
  )
})

router.get('/book', function (req, res, next) {
  if (!autorizedHeader(req)) {
    BookModelSchema.find({}, function (err, users) {
      res.status(200).json(users)
    })
  } else {
    res.status(200).json({ err: 'unauthorized access/request' })
  }
})

router.get('/book/save', function (req, res, next) {
  const id = Math.random(1000)
  const bookObj = new BookModelSchema({
    _id: id,
    bookId: id,
    name: 'book1',
  })
  bookObj.save((err, data) => {
    if (err) {
      res.status(200).json({
        msg: 'not saved.(will be dublicate _id)',
        error: err,
        data: data,
      })
    } else {
      res.status(200).json({ msg: 'saved.', error: err, data: data })
    }
  })
})

router.get('/book/create', function (req, res, next) {
  const id = Math.random(1000)
  const arrayOfBook = [
    { _id: id, bookId: id, name: 'book' + id },
    { _id: id + 1, bookId: id, name: 'book' + id + 1 },
    { _id: id + 2, bookId: id, name: 'book' + id + 2 },
  ]
  BookModelSchema.create(arrayOfBook, (err, callback) => {
    if (err) {
      res.status(200).json({
        msg: 'not created.(will be dublicate _id)',
        error: err,
        callback: callback,
      })
    } else {
      res.status(200).json({ msg: 'created.', error: err, callback: callback })
    }
  })
})

router.get('/book/findId/:id', function (req, res, next) {
  BookModelSchema.findById({ _id: req.params?.id }, function (err, data) {
    if (err) {
      res.status(200).json({
        msg: 'not found _id.(will be missing _id)',
        error: err,
        data: data,
      })
    } else {
      res.status(200).json({ msg: 'found.', error: err, data: data })
    }
  })
})

router.get('/book/deleteById/:id', function (req, res, next) {
  BookModelSchema.findByIdAndDelete(req.params?.id, function (err, data) {
    if (err) {
      res.status(200).json({
        msg: 'not found _id.(will be missing _id)',
        error: err,
        data: data,
      })
    } else {
      res.status(200).json({
        msg: data == null ? 'not found to delete id' : 'deleted.',
        error: err,
        data: data,
      })
    }
  })
})

router.get('/book/findByIdAndRemove/:id', function (req, res, next) {
  BookModelSchema.findByIdAndRemove(req.params?.id, function (err, data) {
    if (err) {
      res.status(200).json({
        msg: 'not found _id.(will be missing _id)',
        error: err,
        data: data,
      })
    } else {
      res.status(200).json({
        msg: data == null ? 'not found to delete id' : 'deleted.',
        error: err,
        data: data,
      })
    }
  })
})

router.get('/book/findByIdAndUpdate/:id', function (req, res, next) {
  BookModelSchema.findByIdAndUpdate(
    req.params?.id,
    { bookId: 45, name: 'updated' },
    function (err, data) {
      if (err) {
        res.status(200).json({
          msg: 'not found _id.(will be missing _id)',
          error: err,
          data: data,
        })
      } else {
        res.status(200).json({
          msg: data == null ? 'not found to update id' : 'updated.',
          error: err,
          data: data,
        })
      }
    },
  )
})

//name : value thin obj hama ekm delete wenw
router.get('/book/removeByName/:name', function (req, res, next) {
  BookModelSchema.remove({ name: req.params?.name }, function (err, data) {
    if (err) {
      res.status(200).json({
        msg: 'not found name.(will be missing _id)',
        error: err,
        data: data,
      })
    } else {
      res.status(200).json({
        msg:
          data == null || data.deletedCount <= 0
            ? 'not found to delete name'
            : 'deleted.',
        error: err,
        data: data,
      })
    }
  })
})

router.get('/book/findAll/:name', function (req, res, next) {
  BookModelSchema.find({ name: req.params?.name }, function (err, data) {
    if (err) {
      res.status(200).json({
        msg: 'not found name.(will be missing name)',
        error: err,
        data: data,
      })
    } else {
      res.status(200).json({
        msg: data == null ? 'not found to matching name' : 'found.',
        error: err,
        data: data, //array
      })
    }
  })
})

router.get('/book/findOne/:name', function (req, res, next) {
  BookModelSchema.findOne({ name: req.params?.name }, function (err, data) {
    if (err) {
      res.status(200).json({
        msg: 'not found name.(will be missing name)',
        error: err,
        data: data,
      })
    } else {
      res.status(200).json({
        msg: data == null ? 'not found to matching name' : 'found.',
        error: err,
        data: data, //obj
      })
    }
  })
})

router.get('/book/queryChain/:name', function (req, res, next) {
  BookModelSchema.find({ name: req.params?.name })
    .sort({ name: 1 })
    .limit(2)
    .select({ age: 0 })
    .exec(function (err, data) {
      if (err) {
        res.status(200).json({
          msg: 'not found queryChain name.(will be missing name)',
          error: err,
          data: data,
        })
      } else {
        res.status(200).json({
          msg:
            data == null ? 'not found to matching queryChain name' : 'found.',
          error: err,
          data: data, //obj
        })
      }
    })
})

module.exports = router

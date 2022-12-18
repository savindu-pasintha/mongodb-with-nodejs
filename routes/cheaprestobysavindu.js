var express = require('express');
const puppeter = require('puppeteer');
var router = express.Router();
const { QueryExecute } = require('./mysq_database');
const ab = require('./js advanced theories.js');
const { result } = require('lodash');

router.get('/', function (req, res, next) {
    var query = "SELECT id, username, email, password, create_datetime FROM test_db1.users;";
    QueryExecute(query)
        .then((result) => {
            if (result) {
                console.log(result);
                res.send(result);
            }
        })
        .catch((err) => {
            if (err) {
                console.log("err", err);
            }
        });
    //res.render('index', { title: 'WELCOME TO CHEAP RESTO BACKEND SERVICE', athour: "by savindupasingtha@gmail.com" });
});
router.get('/signin', function (req, res, next) {
    res.render('index', { title: 'WELCOME TO CHEAP RESTO BACKEND SERVICE', athour: "by savindupasingtha@gmail.com" });
});
router.get('/signup', function (req, res, next) {
    res.render('index', { title: 'WELCOME TO CHEAP RESTO BACKEND SERVICE', athour: "by savindupasingtha@gmail.com" });
});
router.post('/signup', function (req, res, next) {
    const { email, password } = { email: req.body?.email, password: req.body?.password };
    if (email && password) {
        var query = "INSERT INTO users (email,password) VALUES ('" + email + "','" + password + "')";
        QueryExecute(query)
            .then((result) => {
                if (result) {
                    res.send({ status: true, data: { 'error': "no", 'email': email, 'password': password }, mysqldb: result });
                }
            })
            .catch((err) => {
                if (err) {
                    res.send({ status: true, data: { 'error': "yes", 'email': email, 'password': password }, mysqldb: err });
                }
            });
    } else {
        res.send({ status: false, data: { 'error': "No data for email/password", 'email': email, 'password': password }, mysqldb: {} });
    }
});
router.post('/signin', function (req, res, next) {
    const { email, password } = { email: req.body?.email, password: req.body?.password };
    if (email && password) {
        var query = "SELECT password FROM users WHERE email='" + email + "'";
        QueryExecute(query)
            .then((result) => {
                var sts = false;
                if (result.length > 0 && result[0].password == password) { sts = true; }
                if (result) {
                    res.status(200).send({ status: sts, data: { 'error': "no", 'email': email, 'password': password }, mysqldb: {} });
                } else {
                    res.status(200).send({ status: sts, data: { 'error': "Yes", 'email': email, 'password': password }, mysqldb: result });
                }
            })
            .catch((err) => {
                if (err) {
                    res.send({ status: false, data: { 'error': "yes", 'email': email, 'password': password }, mysqldb: err });
                }
            });
    } else {
        res.send({ status: false, data: { 'error': "No data for email/password", 'email': email, 'password': password }, mysqldb: {} });
    }
});

module.exports = router;
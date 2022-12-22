var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.send({
    "data": [
        {
            "name": "J125",
            "description": "J125 - Jacquard machine",
            "parent": 0,
            "id": 1,
            "enable": true,
            "token": "J125WFT"
        },
        {
            "name": "J125 Data logger",
            "description": "Data logger for Jacquard machine",
            "parent": 1,
            "id": 2,
            "enable": true,
            "token": "J125DL"
        },
        {
            "name": "J127",
            "description": "J127 - Jacquard machine",
            "parent": 0,
            "id": 3,
            "enable": true,
            "token": "J127WFT"
        },
        {
            "name": "J127 Data logger",
            "description": "Data logger for Jacquard machine",
            "parent": 3,
            "id": 4,
            "enable": true,
            "token": "J127DL"
        },
        {
            "name": "J129",
            "description": "J129 - Jacquard machine",
            "parent": 0,
            "id": 5,
            "enable": true,
            "token": "J129WFT"
        },
        {
            "name": "J129 Data logger",
            "description": "Data logger for Jacquard machine",
            "parent": 5,
            "id": 6,
            "enable": true,
            "token": "J129DL"
        },
        {
            "name": "J131",
            "description": "J131 - Jacquard machine",
            "parent": 0,
            "id": 7,
            "enable": true,
            "token": "J131WFT"
        },
        {
            "name": "J131 Data logger",
            "description": "Data logger for Jacquard machine",
            "parent": 7,
            "id": 8,
            "enable": true,
            "token": "J131DL"
        },
        {
            "name": "J133",
            "description": "J133 - Jacquard machine",
            "parent": 0,
            "id": 9,
            "enable": true,
            "token": "J133WFT"
        },
        {
            "name": "J133 Data logger",
            "description": "Data logger for Jacquard machine",
            "parent": 9,
            "id": 10,
            "enable": true,
            "token": "J133DL"
        },
        {
            "name": "J135",
            "description": "135 - Jacquard machine",
            "parent": 0,
            "id": 11,
            "enable": true,
            "token": "J135WFT"
        },
        {
            "name": "J135 Data logger",
            "description": "Data logger for Jacquard machine",
            "parent": 11,
            "id": 12,
            "enable": true,
            "token": "J135DL"
        },
        {
            "name": "J137",
            "description": "J137 - Jacquard machine",
            "parent": 0,
            "id": 13,
            "enable": true,
            "token": "J137WFT"
        },
        {
            "name": "J137 Data logger",
            "description": "Data logger for Jacquard machine",
            "parent": 13,
            "id": 14,
            "enable": true,
            "token": "J137DL"
        },
        {
            "name": "J139",
            "description": "J139 - Jacquard machine",
            "parent": 0,
            "id": 15,
            "enable": true,
            "token": "J139WFT"
        },
        {
            "name": "J139 Data logger",
            "description": "Data logger for Jacquard machine",
            "parent": 15,
            "id": 16,
            "enable": true,
            "token": "J139DL"
        },
        {
            "name": "J141",
            "description": "J141 - Jacquard machine",
            "parent": 0,
            "id": 17,
            "enable": true,
            "token": "J141WFT"
        },
        {
            "name": "J141 Data logger",
            "description": "Data logger for Jacquard machine",
            "parent": 17,
            "id": 18,
            "enable": true,
            "token": "J141DL"
        },
        {
            "name": "J143",
            "description": "J143 - Jacquard machine",
            "parent": 0,
            "id": 19,
            "enable": true,
            "token": "J143WFT"
        },
        {
            "name": "J143 Data logger",
            "description": "Data logger for Jacquard machine",
            "parent": 19,
            "id": 20,
            "enable": true,
            "token": "J143DL"
        },
        {
            "name": "J145",
            "description": "J145 - Jacquard machine",
            "parent": 0,
            "id": 21,
            "enable": true,
            "token": "J145WFT"
        },
        {
            "name": "J145 Data logger",
            "description": "Data logger for Jacquard machine",
            "parent": 21,
            "id": 22,
            "enable": true,
            "token": "J145DL"
        },
        {
            "name": "J147",
            "description": "J147 - Jacquard machine",
            "parent": 0,
            "id": 23,
            "enable": true,
            "token": "J147WFT"
        },
        {
            "name": "J147 Data logger",
            "description": "Data logger for Jacquard machine",
            "parent": 23,
            "id": 24,
            "enable": true,
            "token": "J147DL"
        },
        {
            "name": "J148",
            "description": "J148 - Jacquard machine",
            "parent": 0,
            "id": 25,
            "enable": true,
            "token": "J148WFT"
        },
        {
            "name": "J148 Data logger",
            "description": "Data logger for Jacquard machine",
            "parent": 25,
            "id": 26,
            "enable": true,
            "token": "J148DL"
        },
        {
            "name": "J146",
            "description": "J146 - Jacquard machine",
            "parent": 0,
            "id": 27,
            "enable": true,
            "token": "J146WFT"
        },
        {
            "name": "J146 Data logger",
            "description": "Data logger for Jacquard machine",
            "parent": 27,
            "id": 28,
            "enable": true,
            "token": "J146DL"
        },
        {
            "name": "J19",
            "description": "J19 - Jacquard machine",
            "parent": 0,
            "id": 29,
            "enable": true,
            "token": "J19WFT"
        },
        {
            "name": "J19 Data logger",
            "description": "Data logger for Jacquard machine",
            "parent": 29,
            "id": 30,
            "enable": true,
            "token": "J19DL"
        }
    ],
    "message": "Device data list",
    "status": 200
});
});

module.exports = router;

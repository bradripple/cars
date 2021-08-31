const express = require('express');
const router = express.Router();
const fs = require('fs');


router.get('/', function(req, res) {
    let cars = fs.readFileSync('./concept-cars.json');
    let carsData = JSON.parse(cars);
    res.render('vintage-cars/index', { myCars: carsData });
})

module.exports = router;
const express = require('express');
const router = express.Router();
const fs = require('fs');


router.get('/', function(req, res) {
    let cars = fs.readFileSync('./user-favs.json');
    let carsData = JSON.parse(cars);
    res.render('user-favs/index', { myCars: carsData });
})

router.get('/new', function(req, res) {
    res.render('user-favs/new');
});

router.post('/', function(req, res) {
    let cars = fs.readFileSync('./user-favs.json');
    cars = JSON.parse(cars);

    cars.push(req.body);

    fs.writeFileSync('./user-favs.json', JSON.stringify(cars));

    res.redirect('/user-favs');
});

router.get('/edit/:idx', function(req, res) {
    let cars = fs.readFileSync('./user-favs.json');
    let carsData = JSON.parse(cars);
    res.render('user-favs/edit', {cars: carsData[req.params.idx], carsId: req.params.idx});
});

router.put('/:idx', function(req, res) {
    let cars = fs.readFileSync('./user-favs.json');
    let carsData = JSON.parse(cars);

    // re-assign the name and type fields of the dinosaur to be edited 
    carsData[req.params.idx].make = req.body.make;
    carsData[req.params.idx].model = req.body.model;
    carsData[req.params.idx].year = req.body.year;
    carsData[req.params.idx].img_url = req.body.img_url;

    // save the edited dinosaurs to the data.json file
    fs.writeFileSync('./user-favs.json', JSON.stringify(carsData));
    res.redirect('/user-favs');
});

router.get('/:idx', function(req, res) {
    // get dinosaurs
    let cars = fs.readFileSync('./user-favs.json');
    let carsData = JSON.parse(cars);

    // get array index from url parameter
    let carsIndex = parseInt(req.params.idx);

    // render page with data of the specified animal
    res.render('user-favs/show', {myCars: carsData[carsIndex]})
});

router.delete('/:idx', function(req, res) {
    let cars = fs.readFileSync('./user-favs.json');
    let carsData = JSON.parse(cars);

    // remove the deleted dinosaur from the dinosaurs array
    carsData.splice(req.params.idx, 1);

    // save the new dinosaur to the data.json file
    fs.writeFileSync('./user-favs.json', JSON.stringify(carsData));

    // redirect to the GET /dinosaurs route (index)
    res.redirect('/user-favs');
});

// router.get('/new/:idx', function(req, res) {
//     let cars = fs.readFileSync('./user-favs.json');
//     let carsData = JSON.parse(cars);
//     res.render('user-favs/new', {cars: carsData[req.params.idx], carsId: req.params.idx});
// });

module.exports = router;
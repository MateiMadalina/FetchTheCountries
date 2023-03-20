const express = require('express');
const cors = require('cors');
const path = require("path");


const {reader, writer} = require("./fileReader");
const filePath = path.join(`${__dirname}/country.json`);

const port = 5000;
const app = express();
app.use(express.json());
app.use(cors());

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.get('/welcome', (req, res) => {
    res.send('Hello World!');
});

app.route('/api/countries')
.get(async(req, res) => {
    const countries = await reader(filePath);
    res.json(countries);
})
.post(async(req, res) => {
    const countries = await reader(filePath);
    // if (countries.length === 0) {
    //     countries.push(req.body);
    // }
    // if(countries.length > 0) {
    // if(countries[countries.length-1].name.common !== req.body.name.common) {
    //   countries.push(req.body);
    // }
    // }
    countries.push(req.body);
    res.send("hi");
    writer(filePath, countries)
})


app.listen(port, () => {console.log(`http://127.0.0.1:${port}/welcome`);});


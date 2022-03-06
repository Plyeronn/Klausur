const express = require('express');
const app = express();
const url = require('url'); // query parser
app.use(express.json()); // body parser (json)

var products = [
    {name: "Apfel", type: "Obst"},
    {name: "Salat", type: "Gemüse"},
    {name: "Haselnuss", type: "Nuss"},
    {name: "Banane", type: "Obst"},
    {name: "Ananas", type: "Obst"}
];

app.use('/', (req, res, next) => {
    console.log(req.method + ' an ' + req.url)
    next()
})

app.get('/', (req, res) => {
    let params = url.parse(req.url, true).query
    if(!params.type) {
        console.log("nop params")
        res.json(products)
    } else if (/* TODO: Aufgabe 3.1*/ products.map(e=>e.type).includes(params.type)) {
        let filtered = products
            .filter(e=>e.type === params.type)
            .sort((a,b)=> a.name > b.name ? 1 : -1) // TODO: Aufgabe 3.2
        res.json(filtered)
    } else {
        res.status(400).send()
    }
})

app.post('/', (req, res) => {
    let obj = req.body; 
    if(obj.name && obj.type) {
        products.push(obj)
        res.status(201).send(obj)
    } else {
        res.status(400).send()
    }
})

app.listen(8081)
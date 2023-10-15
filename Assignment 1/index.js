const express = require('express')
//Rusn teh myfirstmodule in order to get the time and date
var dt = require('./myfirstmodule');
const app = express()
const port = 8000

app.get('/',(req,res)=> res.send('<h1>This is my home page</h1>'))
//Creates the about me Route
app.get('/about', (req,res) => res.send ('<h1> This is about page </h1>'))
//Creates the contact Route
app.get('/contact', (req,res) => res.send ('<h1>This is my contact page</h1>'))
//Creates the date Route
app.get('/date', (req,res) => res.send ('<h1> The date and time are currently:</h1>'+dt.myDateTime()))
app.listen(port, () => console.log(`Example app listening on port ${port}!`))
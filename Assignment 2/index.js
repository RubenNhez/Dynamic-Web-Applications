// Import express and ejs
var express = require ('express')
var ejs = require ('ejs')
var bodyParser = require('body-parser')

var shopData = {shopName: "Drinks On Us",
                productCategories:["Beer","Wine", "Soft Drinks", "Hot Drinks"],
                shopLocation: ["David - High Street - E1 1Qw","Richard - Park Lane - E2 2QW","Clark - Middle Street - E3 3QW"]}
//create the express application object
const app = express()
const port = 8000
app.use(bodyParser.urlencoded({ extended: true }))

//set the directory where express will pick up html files and css
// __dirname will get the current directory
app.set('views,', __dirname + '/views');
app.use(express.static(__dirname + '/public'));

//Tell express that we want to use EJS as the templating engine
app.set('view engine', 'ejs');

//Tells express how we should process html files
//We want to use EJS's rendering engine
app.engine ('html', ejs.renderFile);

//Handle our routes
app.get('/', function (req,res){
    res.render('index.html', shopData)
});
app.get('/about', function(req,res){
    res.render('about.html', shopData);
});
app.get('/search', function(req,res){
    res.render('search.html', shopData);
});
app.get('/search-result', function (req,res) {
    //TODO: search in the database
    res.send("You searched for: " + req.query.keyword);
});
app.get('/register', function (req,res) {
    res.render('register.html',shopData);
});
app.post('/registered', function (req,res) {
    //saving data in database
    res.send(' Hello '+ req.body.first + ' '+req.body.last +' you are now registered!' + ' '+ 'We will send an email to you at ' + req.body.email);
})

//Start the web app listening
app.listen(port, () => console.log(`Example app listening on port ${port}!`))
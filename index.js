var Cryptr = require('cryptr');
cryptr = new Cryptr('myTotalySecretKey');


// body-parser
var bodyParser = require("body-parser");
var urlEncodedParser = bodyParser.urlencoded({extended: true});

// express
var express = require("express");

var app = express();
app.use(express.static('data'));
app.use(express.static('templates'));


//mysql
var mysql = require("mysql");
// connect strings for mysql
/*var connection = mysql.createConnection({
	host: "localhost",
	user: "root",
	password: "apple",
	database: "test"
});

// connecting ......
connection.connect();*/

// requesting express to get data as text
app.use(bodyParser.json());
app.use(urlEncodedParser);

// using express for post method
app.post("/register", urlEncodedParser, function(req, res) {
	var today = new Date();
  var encryptedString = cryptr.encrypt(req.body.psw);
    var users={
    	"name": req.body.name,
        "email":req.body.email,
        "password":encryptedString,
        "created_at":today
    }
    connection.query('INSERT INTO users SET ?',users, function (error, results, fields) {
      if (error) {
        res.json({
            status:false,
            message:'there are some error with query'
        })
      }else{
          res.sendFile(__dirname+"/templates/butiles.html");
      }
    });


});

app.post("/login", urlEncodedParser, function(req, res) {
	var email=req.body.email;
    var password=req.body.password;
   
   
    connection.query('SELECT * FROM users WHERE email = ?',[email], function (error, results, fields) {
      if (error) {
          res.json({
            status:false,
            message:'there are some errors with query'
            })
      }else{
       
        if(results.length >0){
  decryptedString = cryptr.decrypt(results[0].password);
            if(password==decryptedString){
                res.sendFile(__dirname+"/templates/butiles.html");
            }else{
                res.json({
                  status:false,
                  message:"Email and password does not match"
                 });
            }
          
        }
        else{
          res.json({
              status:false,    
            message:"Email does not exits"
          });
        }
      }
    });

});

app.get('/butiles', function(req, res) {
    // render the page and pass in any flash data if it exists
    res.sendFile(__dirname+"/templates/butiles.html");
});

app.get('/instructions', function(req, res) {
    // render the page and pass in any flash data if it exists
    res.sendFile(__dirname+"/templates/instructions.html");
});

app.get('/game', function(req, res) {
    // render the page and pass in any flash data if it exists
    res.sendFile(__dirname+"/data/index.html");
});

app.get('/', function(req, res) {
    // render the page and pass in any flash data if it exists
    res.sendFile(__dirname+"/templates/login.html");
});

app.get('/login', function(req, res){

res.sendFile(__dirname+"/templates/login.html");

});

app.get('/register', function(req, res) {
	res.sendFile(__dirname+"/templates/register.html");
});

app.listen(3000);
console.log("Listening ....");
const express = require('express')
const app = express()
var path    = require("path");
var fs = require('fs');

// app.get('/', function (req, res) {
//   res.send('Thiguinho!')
// })
var mqtt = require('mqtt')
var client  = mqtt.connect('mqtt:broker.mqtt-dashboard.com')

client.on('connect', function () {
  // Read data from Arduino
  client.subscribe('ardclimathon2017')
  // Send data through mqtt
  client.publish('nodeclimathon2017', 'Hello mqtt')
})

client.on('message', function (topic, message) {
  // message is Buffer
  var input = message.toString()
  console.log(input)
  fs.writeFile(path.join(__dirname+'/login.html'), input)
  // fs.writeFile(__dirname +"/data.json", input, function(err) {
	// if(err) {
	// 	return console.log(err);
 //    }
 //    	console.log("The file was saved!");
	// }); 
  // client.end()
})


app.use("/css", express.static(__dirname + '/css'));
app.use("/fonts", express.static(__dirname + '/fonts'));
app.use("/js", express.static(__dirname + '/js'));
app.use("/images", express.static(__dirname + '/images'));


app.get('/', function (req, res){
	res.sendFile(path.join(__dirname+'/login.html'));
})

app.get('/login', function (req, res){
	res.sendFile(path.join(__dirname+'/login.html'));
})

app.get('/index*', function (req, res){
	res.sendFile(path.join(__dirname+'/index.html'));
})

app.get('/loja*', function (req, res){
	res.sendFile(path.join(__dirname+'/loja.html'));
})

app.get('/rank*', function (req, res){
	res.sendFile(path.join(__dirname+'/rank.html'));
})

app.get('/test*', function (req, res){
	res.sendFile(path.join(__dirname+'/test.html'));
})

app.get('/meugrupo*', function (req, res){
	res.sendFile(path.join(__dirname+'/meugrupo.html'));
})

app.get('/data.json', function(req, res){
	var readable = fs.createReadStream(__dirname+'/data.json');
    readable.pipe(res);
	// res.sendFile(path.join(__dirname+'/data.json'));	
})

app.get('/coin.json', function(req, res){
	var readable = fs.createReadStream(__dirname+'/coin.json');
    readable.pipe(res);
	// res.sendFile(path.join(__dirname+'/data.json'));	
})

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})
import Express from 'express';
const bodyParser = require('body-parser');
const router = require('./routes/api');
const app = Express();
import mongoose from 'mongoose';
const port = process.env.PORT || 4000;
const mongoURL = 'mongodb://localhost:27017';
const cors = require('cors')
const db = mongoose.connection;
db.on('error',console.error);
db.once('open',function(){
	console.log("connected to mongod server");
});
mongoose.connect(mongoURL); 
app.all('/*', function(req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "X-Requested-With");
	next();
});
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', function(req, res) {
	res.send('backend');
});
app.use('/',router);
app.listen(4000, function(){
	console.log('Connected'+port+'port');
});
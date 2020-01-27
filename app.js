import Express from 'express';
const bodyParser = require('body-parser');
const router = require('./routes/api');
const app = Express();
import mongoose from 'mongoose';
const port = process.env.PORT || 3000;
const mongoURL = 'mongodb://localhost:27017';

const db = mongoose.connection;
db.on('error',console.error);
db.once('open',function(){
	console.log("connected to mongod server");
});
mongoose.connect(mongoURL); 

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', function(req, res) {
	res.send('backend');
});
app.use('/',router);
app.listen(3000, function(){
	console.log('Connected'+port+'port');
});

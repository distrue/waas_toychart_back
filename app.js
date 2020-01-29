import Express from 'express';
import mongoose from 'mongoose';

const app = Express();
const score = require('./routes/api');

app.get('/', function(req, res) {
	res.send('backend');
});

app.use('/', score);

mongoose.connect("mongodb://localhost:27017");

app.listen(3000, function(){
	console.log('Connected 3000 port');
});


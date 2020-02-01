import Express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';

const app = Express();
const score = require('./routes/api');
const corsOptions = {
	origin: "http://localhost:4000",
	credentials: true
};

app.use(cors());

app.get('/', function(req, res) {
	res.send('backend');
});

app.use('/', score);

mongoose.connect("mongodb://localhost:27017");

app.listen(4000, function(){
	console.log('Connected 4000 port');
});


import Express from 'express';
import mongoose from 'mongoose';
const bodyParser = require('body-parser');
const apiRouter = require('./routes/api');
const app = Express();
const port = process.env.PORT || 3000;
const mongoURL = 'mongodb://localhost:27017';

const db = mongoose.connection;
db.on('error',console.error);
db.once('open',function(){
	console.log("connected to mongod server");
});
mongoose.connect(mongoURL); // define mongoURL

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

app.get('/', function(req, res) {
	res.send('backend');
});

app.use('/',apiRouter);

app.listen(port, function(){
	console.log('Connected on port '+port);
});

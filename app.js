const Express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const db = mongoose.connection;
const MongoDB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/'
const port = process.env.PORT || 3000;
const app = Express();
const cors = require('cors');
const router = require('./routes/api');

db.on('error', console.error);
db.once('open', function(){
    console.log("Connected to mongod server");
});

mongoose.connect(MongoDB_URI);

var corsOptions = {
  methods: 'GET,POST,PUT'  
}
app.use(cors(corsOptions));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/', function(req, res) {
	res.send('backend');
});
app.use('/', router);

app.listen(port, function(){
	console.log('Connected 3000 port');
});

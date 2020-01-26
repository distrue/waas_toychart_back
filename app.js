import Express from 'express';
const bodyParser = require('body-parser');
const router = require('./routes/api');
const app = Express();


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', function(req, res) {
	res.send('backend');
});
app.use('/',router);
app.listen(3000, function(){
	console.log('Connected 3000 port');
});

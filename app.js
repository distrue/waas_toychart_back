import Express from 'express';

const app = Express();

app.get('/', function(req, res) {
	res.send('backend');
});

app.listen(3000, function(){
	console.log('Connected 3000 port');
});

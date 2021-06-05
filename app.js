import Express from 'express';
import Router from './routes/api.js'; // './routes/api.js' 

const app = Express();
app.use('/api',Router); // 받아온 Router를 쓰려면 이거를 꼭 써야댐

app.get('/', function(req, res) {
	res.send('backend');
});

app.listen(3000, function(){
	console.log('Connected 3000 port');
});

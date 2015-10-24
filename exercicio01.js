//.npmrc loglevel = htttp
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/pos-unoesc');

var db = mongoose.connection;

db.on('error', function(err){
	console.log('Erro de conexão.', err);
});
db.on('open', function() {
	console.log('Conexão aberta.');
});
db.on('connected', function(err) {
	console.log('Desconectado.');
});
var http = require('http');

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

var Schema = mongoose.Schema;
var json_schema = {
	name: {type: String, default: ''},
	description: {type: String, default: ''},
	alchool: {type: Number, min: 0},
	category: {type: String, default: ''},
	create_at: {type: Date, default: Date.now}
};

var BeerSchema = new Schema(json_schema);

var Beer = mongoose.model('Beer', BeerSchema);

Controller = {
	create: function(req, res){
		var dados = {
			name: 'Skol',
			description: 'Mijo de rato',
			alchool: 4.5,
			price: 3.0,
			category: 'pilsen'
		}, 
		model = new Beer(dados),
		msg = '';
		model.save(function(err, data) {
			if (err) {
				console.log('Erro: ', err);
				msg = 'Erro: ' + err;
			} else {
				console.log('Cerveja Inserida ', data);
				msg = 'Cerveja Inserida ' + data;
			}
			res.end(msg);
		});
	},
	retrieve: function(req, res){
		var Beer = mongoose.model('Beer', BeerSchema), query = {};

		Beer.find(query, function(err, data) {
			if (err) {
				console.log('Erro: ', err);
				msg = 'Erro: ' + err;
			} else {
				console.log('Listagem: ', data);
				msg = 'Listagem: ' + data;
			}
			res.end(msg);
		});
	},
	update: function(req, res){
		var Beer = mongoose.model('Beer', BeerSchema), query = {name: /skol/i};

		var mod = {
			name: 'Brahma',
			alchool: 4,
			price: 6,
			category: 'pilsen'
		};

		var optional = {
			upsert: false,
			multi: true
		}

		Beer.update(query, mod, optional, function(err, data) {
			if (err) {
				console.log('Erro: ', err);
				msg = 'Erro: ' + err;
			} else {
				console.log('Cervejas atualizadas com sucesso: ', data);
				msg = 'Cervejas atualizadas com sucesso: ' + data;
			}
			res.end(msg);
		});
	},
	delete: function(req, res){
		var Beer = mongoose.model('Beer', BeerSchema), query = {name: /brahma/i};

		// É multi: true CUIDADO!
		Beer.remove(query, function(err, data) {
			if (err) {
				console.log(err);
				msg = 'Erro: ' + err;
			} else {
				console.log('Cerveja deletada com sucesso: ', data.result);
				msg = 'Cerveja deletada com sucesso: ' + data.result;
			}
			res.end(msg);
		});
	}
};

http.createServer(function (req, res) {
	res.writeHead(200, {'Content-Type': 'text/plain'});
	console.log(req.url);
	var url = req.url;
	
	switch(url) {
		case '/api/beers/create':
			Controller.create(req, res);
			break;
		case '/api/beers/retrieve':
			Controller.retrieve(req, res);
			break;
		case '/api/beers/update':
			Controller.update(req, res);
			break;
		case '/api/beers/delete':
			Controller.delete(req, res);
			break;
		default:
			res.end('Rota não encontrada');
			break;
	}
}).listen(3000);

console.log('Server running at http://localhost:3000/');
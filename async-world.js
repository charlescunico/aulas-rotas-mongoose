var fs = require('fs');

console.log("Vou ler", Date.now());
console.time("leitura");

var file = fs.readFileSync('video/video.mp4');
console.log(file);
/*
http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/html'});
  res.end(index);
}).listen(3000);

console.log('Server running at http://localhost:3000/');
*/
console.timeEnd("leitura");
console.log("Ja li", Date.now());
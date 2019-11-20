// Require de Express
const express = require ('express');

// Require de FS
const fs = require ('fs');

// Ejecución de Express
const app = express();

// Levantando el Servidor en el puerto 3030
app.listen(3030, () => console.log('Server running in 3030 port'));

// Leyendo y parseando (en array) el contenido de heroes.json
const heroes = JSON.parse(fs.readFileSync(__dirname + '/data/heroes.json', 'utf-8'));

// Ruta Raíz / ➝ Home
app.get('/', (req,res) =>{
	console.log();
	res.send('Ni Superman, Iron Man o La Mujer Maravilla son tan importantes \ncómo las y los Heroes de carne y hueso que encontrarás en este sitio. \nEsperamos que ellas y ellos te sirvan como inspiración para poder cumplir tus objetivos. \nRecuerda: ¡nunca pares de creer en ti!.');
});

// Ruta /heroes ➝ se envía todo el array y Express lo parsea para el browser como JSON :D
app.get('/heroes', (req,res) => {
	res.send(heroes);
});

// Ruta /heroes/n ➝ se envía el nombre y profesión del héroe solicitado
app.get('/heroes/:id', (req,res) => {
	// Acá lo primero será encontrar al héroe que corresponda
	let heroe = heroes.find (unHeroe => unHeroe.id == req.params.id);
	//console.log(heroe);

	// Si se encuentra al héroe se envía el nombre y su profesión
	if(req.params.id <= heroes.length){
		res.send("<center><h2><b>NOMBRE: </b>" + heroe.nombre + "</h2><br><h3><b>PROFESION: </b>" + heroe.profesion +  "</h3></center>");
	}else{
		res.send("<center><h1>Sorry </h1><h2>tu heroe no existe en nuestras bases</h2></center>");
	}
	// Si NO se encuentra se envía el mensaje de no encontrado
});

// Ruta /heroes/n/bio ➝ se envía la bio del héroe solicitado
app.get('/heroes/:id/bio', (req,res) => {
	// Acá lo primero será encontrar al héroe que corresponda
	let heroe = heroes.find (unHeroe => unHeroe.id == req.params.id);

	// Si NO se encuentra al héroe se envía un mensaje
	if(req.params.id <= heroes.length){
		res.send("<center><h2>NOMBRE: " + heroe.nombre + "<br>PROFESION: " + heroe.profesion + "</h2><br><h3>BIO: "+ heroe.resenia + "</h3></center>");
	}else{
		res.send("<center><h1>Sorry la BIO de tu heroe no existe en nuestras bases</center></h1>");
	}
	// Si se encuentra al héroe:
		// Se pregunta si vino el parámetro Y el valor esperado y se envía la información
		// Si nó vino el parámetro se envía el mensaje de error

});

app.get('/creditos', (req,res) => {
	res.send('<h1><b>Orgullosamente codeado por</b>  Lisa Simpson <br><br> <b> Edicion: </b> Lisa Simpson <br><br> <b> Guion:</b>  Chester J Lamprick <br><br> <b> Sonido:</b>  El chivo berrinche <br><br> <b> animacion:</b>  El tio hormiga <br><br> <i> Con amor, Niñita</i></h1> ');
});
// Ruta... ¿Pára qué sirve esto?
app.get('*', (req, res) => {
	res.status(404).send('404 not found. <br> ¡Escribi bien burro!');
});
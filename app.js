const express = require('express');
//let handlebars = require('express-handlebars')
const http = require('http');
const path = require('path');
const app = express();
const Controllers = require('./controllers/controllersContacto.js');
const controllers = new Controllers();

const server = http.createServer(app);
//recursos que se van a cargar en el server 
app.use(express.static(__dirname+'/static'));

//Configuración de las plantillas

app.set('view engine','ejs');//definimos el motor de plantilla con archivos ejs
app.set('views',path.join(__dirname,"./views"));//definimos la ruta del motor de plantilla

app.use(express.urlencoded({extended:false}));//permite recuperar los valores publicados en un request
app.use(express.json());
// Rutas y lógica de tu aplicación


app.get('/', async (req, res) => {
  try {
    res.render('index');
  } catch (err) {
    res.status(500).json({error:'Error el en servidor'});
  }
});

app.post('/contacto',async (req,res)=>{
try{
const {nombre,email,comentario} = req.body;
//De esta forma obtenemos la direccion ip que seria ::1 que es la representación de la dirección IP de loopback IPv6 en IPv4 segun randy...
const ip = req.ip;
const respuesta = await controllers.add(nombre,email,comentario,ip);
console.log(`Respuesta de controlador : ${respuesta}`);
res.status(200);
}catch(error){
console.error(error.message);
res.status(500).json({error:'Error en el servidor'});
}

});

// Otros endpoints y lógica de tu aplicación
const port = 3000;
server.listen(port,()=>{
  console.log(`Servidor Express iniciado en el puerto ${port}`);
});

process.on('SIGINT',()=>{
  db.close();
  process.exit();
});
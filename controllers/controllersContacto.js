const contactosModel = require('../models/conexion.js');
const db = new contactosModel();

class ContactosControllers{
	constructor(){
    //aqui va algo que no sabemos que es aun <[*_*]>
	}
	add(nombre,email,comentario,ip){
       return new Promise((resolve,reject)=>{
       db.add(nombre,email,comentario,ip)
       .then(res=>{
       console.log(res,'controllers');
       resolve(res);
       })
       .catch(error=>{
        console.error(error.message);
       	reject(error);
       })
       
       }) 
	}
}

module.exports=ContactosControllers;
const sqlite3 = require('sqlite3').verbose();
const path = require('path');


class contactosModel {
  constructor(){
    this.dbName = path.join(__dirname,'../db','base.db'); 
    this.db = new sqlite3.Database(this.dbName,{verbose:true,charset:'utf8'},error=>{
      if(err) return console.error(err.message);
      console.log('Conexion Exitosa con la Base de Datos')
    });
    this.db.serialize(()=>{

    this.db.run(`
    CREATE TABLE IF NOT EXISTS contacto (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nombre TEXT NOT NULL,
      email TEXT NOT NULL,
      comentario TEXT NOT NULL,
      ip TEXT NOT NULL,
      pais TEXT NOT NULL,
      created_at DATETIME 
    ) 
  `);

    this.db.run(` CREATE TRIGGER IF NOT EXISTS insert_fecha_hora
    AFTER INSERT ON contacto
    FOR EACH ROW
    BEGIN
        UPDATE contacto SET created_at = datetime('now') WHERE id = NEW.id;
    END;`);
});

  }

  add(nombre,email,comentario,ip,pais){
    return new Promise((resolve, reject) => {
      this.db.run(`INSERT INTO contacto(nombre,email,comentario,ip,pais) VALUES(?,?,?,?,?)`,[nombre,email,comentario,ip,pais], err => {
        if(err){
          reject(err);
        }else{
          resolve(true);
        }
      });
    });
  }
  obtener(){
    return new Promise((resolve,reject)=>{
      this.db.all(`SELECT * FROM contacto`,(error,datos)=>{
       if(!error){
        resolve(datos);
       }else{
        reject(error);
       }
      })
    })
  }

  // Agrega más métodos según tus necesidades, como insertar, actualizar o eliminar registros

  close() {
    this.db.close();
  }
}

module.exports = contactosModel;
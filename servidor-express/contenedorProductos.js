const fs = require("fs");


class Contenedor{
    constructor(nameFile){
        this.fileName = nameFile;
    }

   async getAll(){
    try{
        const contenido = await fs.promises.readFile(this.fileName,"utf-8");
        if(contenido.length>0){
            const productos = JSON.parse(contenido);
            return productos;
        } else {
            return "Archivo vacio";
        }        
    } catch(error) {
        return "El archivo no puede ser leido";
    }
   }
}

const manejadorProductos = new Contenedor ("productos.txt");
console.log(manejadorProductos);
const getData = async()=>{
        const productos = await manejadorProductos.getAll();
        console.log("productos",productos);
}

getData();



module.exports = Contenedor;
const fs = require("fs");
const path = require("path");


class Contenedor{
    constructor(name){
        this.fileName = name;
    }

    async save(product){
        try{
            if(fs.existsSync(this.fileName)){
                const productos = await this.getAll();
                if(productos.length>0){
                    const lastId = productos[productos.length-1].id+1;
                    product.id= lastId;
                    productos.push(product);
                    await fs.promises.writeFile(this.fileName,JSON.stringify(productos,null,2));
                } else{
                    product.id=1;
                    await fs.promises.writeFile(this.fileName,JSON.stringify([product],null,2));
            } 
            } else{
                product.id=1;
                await fs.promises.writeFile(this.fileName,JSON.stringify([product],null,2));}
            
        }catch(error){
            return "El producto no pudo ser guardado";
        }
    }

    async getAll(){
    try{
        const contenido = await fs.promises.readFile(this.fileName,"utf-8");
        if(contenido.length>0){
            const productos = JSON.parse(contenido);
            return productos;
        } else {
            return [];
        }        
    } catch(error) {
        return "El archivo no puede ser leido";
    }
   }

   async getById(id){
    try {
        const productos = await this.getAll();
        const producto = productos.find(elemento=>elemento.id === id);
        return producto;
    } catch (error) {
        return "El producto no se encuentra";
    }
}

async deleteById(id){
    
    try {
        const productos = await this.getAll();
        const newProducts = productos.filter(elemento=>elemento.id !== id);
        await fs.promises.writeFile(this.filename,JSON.stringify(newProducts,null,2));
        return `El producto con el id ${id} fue elimnado`;
    } catch (error) {
        return "El elemento no puede ser eliminado"
    }
}

getName(){
    return this.filename;
}
}

const manejadorProductos = new Contenedor ("./files/productos.txt");
console.log(manejadorProductos);
const getData = async()=>{
        // const productos = await manejadorProductos.getAll();
        // console.log("productos",productos);
        // await manejadorProductos.save(producto1);
        // await manejadorProductos.save(producto2);
        const productos = await manejadorProductos.getAll();
        console.log("productos",productos);
        const productoEncontrado = await manejadorProductos.getById(1);
        console.log("producto encontrado>", productoEncontrado);
        await manejadorProductos.deleteById();
}

getData();



module.exports = Contenedor;
const Contenedor = require ("./contenedorProductos"); 
const express = require ("express");

const app = express();

const PORT = 8080;

app.listen(PORT,()=>console.log(`El servidor esta configurado en el puerto ${PORT}`));
const contenedorProductos = new Contenedor("./productos.txt");

app.get("/productos",async (request,response)=>{
    const productos = await contenedorProductos.getAll()
    response.send(productos)
})

app.get("/productoRandom",async (request,response)=>{
    const productos = await contenedorProductos.getAll()
    const random = Math.floor(Math.random()*productos.length+1)
    const productoRandom = await contenedorProductos.getById(random)
    response.send(productoRandom)
})
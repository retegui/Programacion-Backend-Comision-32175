const Contenedor = require ("./contenedorProductos"); 
const express = require ("express");

const app = express();

const PORT = 8080;

app.listen(PORT,()=>console.log(`El servidor esta configurado en el puerto ${PORT}`));
const contenedorProductos = new Contenedor("./productos.txt");

app.get("/productos",(request,response)=>{
    contenedorProductos.GetAll()
})

app.get("/productoRandom",(request,response)=>{
    response.send({
        id: 1,
        nombre: "Super Mario 64",
        consola: "Nintendo 64",
        empresa: "Nintendo",
        desc: "Super Mario 64 is a 1996 platform game for the Nintendo 64. Developed by Nintendo Entertainment Analysis and Development and published by Nintendo, it is the first Super Mario game to feature 3D gameplay, combining traditional Super Mario gameplay, visual style, and characters in a large open world. ",
        precio: 6.175,
        img: 'https://i.ebayimg.com/images/g/4AMAAOSwf9JhIhMv/s-l640.jpg',
        cantidad:5
    })
})
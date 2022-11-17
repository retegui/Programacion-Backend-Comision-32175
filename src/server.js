const express = require('express');
const handlebars = require("express-handlebars");
const path = require("path");
const {Server} = require("socket.io");

const PORT = process.env.PORT || 8080;

const Contenedor = require("./managers/contenedorProductos");
const productsService = new Contenedor("productos.txt");
const viewsFolder = path.join(__dirname,"views")


const server = app.listen(PORT, ()=>console.log(`server listening on port ${PORT}`));

app.use(express.static(__dirname+"/public"));
app.use(express.json());
app.use(express.urlencoded({extended:true}));


app.engine("handlebars",handlebars.engine());
app.set("views", viewsFolder);
app.set("view engine", "handlebars");

const io = new Server(server);

const messages = [
    { author: "Juan", text: "¡Hola! ¿Que tal?" },
    { author: "Pedro", text: "¡Muy bien! ¿Y vos?" },
    { author: "Ana", text: "¡Genial!" }
];

io.on("connection", async(socket)=>{
    console.log("nuevo cliente conectado");
    socket.emit("productsArray", await productsService.getAll());

    socket.on("newProduct", async(data)=>{
        await productsService.save(data);

        io.sockets.emit("productsArray", await productsService.getAll());
    })
})

app.get("/",(req,res)=>{
    res.render("home")
})

app.get("/productos", async(req,res)=>{
    const productos = await productsService.getAll();
    console.log(productos)
    res.render("productos", {
        productos:productos
    })
})





app.post("/products",async(req,res)=>{

    const newProduct = req.body;

    await productsService.save(newProduct);

    res.redirect("/productos");
})
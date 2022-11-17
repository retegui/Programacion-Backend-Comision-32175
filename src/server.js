const express = require('express');
const handlebars = require("express-handlebars");
const path = require("path");
const {Server} = require("socket.io");

const Contenedor = require("./managers/contenedorProductos");
const productsService = new Contenedor("productos.txt");
const viewsFolder = path.join(__dirname,"views")


const app = express();
app.listen(8080,()=>console.log("Servidor escuchando puerto 8080"));

app.use(express.static(__dirname+"/public"));
app.use(express.json());
app.use(express.urlencoded({extended:true}));


app.engine("handlebars",handlebars.engine());
app.set("views", viewsFolder);
app.set("view engine", "handlebars");

const io = new Server(server);
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
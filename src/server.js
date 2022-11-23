const { privateDecrypt } = require('crypto');
const express = require('express');
const handlebars = require("express-handlebars");
const path = require("path");
const {Server} = require("socket.io");
const app = express();

//PUERTO//
const PORT = process.env.PORT || 8080;

//PRODUCTOS//
const Contenedor = require("./managers/contenedorProductos");
const productsService = new Contenedor("./files/productos.txt");

//SERVIDOR EXPRESS//
const server = app.listen(PORT, ()=>console.log(`Servidor escuchando el puerto ${PORT}`));

//MIDDLEWARES//
app.use(express.static(__dirname+"/public"));
app.use(express.json());
app.use(express.urlencoded({extended:true}));

//HANDLEBARS//
const viewsFolder = path.join(__dirname,"views")
app.engine("handlebars",handlebars.engine());
app.set("views", viewsFolder);
app.set("view engine", "handlebars");

//WEBSOCKETS//
const io = new Server(server);

const messages = [
    { author: "Juan", text: "¡Buenas! Que onda?" },
    { author: "Domingo", text: "Todo tranca. Boston?" },
    { author: "Eva", text: "Increible" }
];

io.on("connection", (socket)=>{
    console.log("Un nuevo cliente se ha conectado");
    socket.emit("messagesChat", messages);
    socket.on("newMsg", (data)=>{
        messages.push(data);
        io.sockets.emit("messagesChat",messages);
    })
    socket.compress("newProduct",async (data)=>{
        await productsService.save(data);
        const productos = await productsService.getAll();
        io.sockets.emit("productsArray",productos);
    })
})


//RUTAS//

app.get("/",(req,res)=>{
    res.render("home")
})

app.get("/productos", async(req,res)=>{
    const productos = await productsService.getAll();
    // console.log(productos)
    res.render("productos", {
        productos:productos
    })
})

app.post("/products",async(req,res)=>{

    const newProduct = req.body;

    await productsService.save(newProduct);

    res.redirect("/");
})
const express = require("express");
const app = express();
app.listen(8080,()=>console.log("Servidor escuchando puerto 8080"));

app.use(express.static(__dirname+"/public"));

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.set("views", __dirname+"/views");
app.set("view engine", "ejs");

const productos = [];

app.get("/",(req,res)=>{
    res.render("home", {
        products:productos
    })
})

app.post("/productos", (req,res)=>{
    console.log(req.body);
    productos.push(req.body);
    res.redirect("/productos") 
})
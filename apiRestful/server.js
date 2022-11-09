const express = require('express');

const { Router } = require('express');
const { appendFile } = require('fs');

const PORT = 8080;

const app = express();

app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.use('/api',express.static('public'));

app.listen(PORT, ()=>{
    console.log(`Servidor escuchando el puerto: ${PORT}`);
})

const productos = [];


const routerProductos = Router();


routerProductos.get('/productos/', (req, res) =>{
    res.json({
        productos
    })
})
routerProductos.post('/productos/',(req,res)=>{
    let producto = req.body;
    if(productos.length>0){
        const lastId = productos[productos.length-1].id+1;
        producto.id= lastId;
        productos.push(producto);
        
    } else{
        producto.id=1;
        productos.push(producto);
        }
   
    res.json({
        msg: 'Se agrego el producto.'
    })

routerProductos.get('/productos/:id/', (req, res) =>{
    const id = req.params.id-1;
    const producto = productos[id];
    
    if(isNaN(id)){
        res.json({
            error: 'El parámetro no es un número.'
        })
    }else{
        producto == undefined
        ? res.status(500).json({
            error: 'No existe el producto'
        })
        : res.json({
            producto
        })
    }})
routerProductos.get('/productos/:id/', (req, res) =>{
    const id = req.params.id-1;
    const producto = productos[id];
    
    if(isNaN(id)){
        res.json({
            error: 'El parámetro no es un número.'
        })
    }else{
        producto == undefined
        ? res.status(500).json({
            error: 'No existe el producto'
        })
        : res.json({
            producto
        })
    }})

routerProductos.put('/productos/:id/', (req, res) =>{
    const id = req.params.id-1;
    const producto = productos[id];
    
    if(isNaN(id)){
        res.json({
            error: 'El parámetro no es un número.'
        })
    }else{
        producto == undefined
        ? res.status(500).json({
            error: 'No existe el producto'
        })
        : res.json({
            producto
        })
    }})

routerProductos.delete('/productos/:id/', (req, res) =>{
    const id = req.params.id-1;
    const producto = productos[id];
    
    if(isNaN(id)){
        res.json({
            error: 'El parámetro no es un número.'
        })
    }else{
        producto == undefined
        ? res.status(500).json({
            error: 'No existe el producto'
        })
        : res.json({
            producto
        })
    }})
    

})



app.use('/api', routerProductos);

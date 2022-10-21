const fs = require("fs");

class Contenedor{
    constructor(nameFile){
        this.nameFile = nameFile;
    }

    save = async(product)=>{
        try {
            if(fs.existsSync(this.nameFile)){
                const productos = await this.getAll();
                const lastIdAdded = productos.reduce((acc,item)=>item.id > acc ? acc = item.id : acc, 0);
                const newProduct={
                    id: lastIdAdded+1,
                    ...product
                }
                productos.push(newProduct);
                await fs.promises.writeFile(this.nameFile, JSON.stringify(productos, null, 2))
            } else{
                const newProduct={
                    id:1,
                    ...product
                }
                await fs.promises.writeFile(this.nameFile, JSON.stringify([newProduct], null, 2));
            }
        } catch (error) {
            console.log(error);
        }
    }

    getById = async(id)=>{
        try {
            if(fs.existsSync(this.nameFile)){
                const productos = await this.getAll();
                const producto = productos.find(item=>item.id===id);
                return producto
            }
        } catch (error) {
            console.log(error)
        }
    }

    getAll = async()=>{
        try {
            const contenido = await fs.promises.readFile(this.nameFile,"utf8");
            const productos = JSON.parse(contenido);
            return productos
        } catch (error) {
            console.log(error)
        }
    }

    deleteById = async(id)=>{
        try {
            const productos = await this.getAll();
            const newProducts = productos.filter(item=>item.id!==id);
            await fs.promises.writeFile(this.nameFile, JSON.stringify(newProducts, null, 2));
        } catch (error) {
            console.log(error)
        }
    }

    deleteAll = async()=>{
        try {
            await fs.promises.writeFile(this.nameFile, JSON.stringify([]));
        } catch (error) {
            console.log(error)
        }
    }
}

const listaProductos = new Contenedor('../productos.txt');
const producto1 = {
    nombre: "Dragon Quest VIII",
    consola: "Nintendo 3DS",
    empresa: "Nintendo",
    desc: "Sellado",
    desc: "Dragon Quest VIII: Journey of the Cursed King is a role-playing video game developed by Level-5 and published by Square Enix for the PlayStation 2. It was released in Japan in 2004, in North America in 2005 and PAL regions in 2006, making it the first main series installment released in the PAL region.",
    precio: 20592,
    img: 'https://m.media-amazon.com/images/I/618ZBZ4N6NL.jpg',
    cantidad:3
}
const productoRepetido = {
    nombre: "Metal Gear Solid",
    consola: "Playstation 1",
    empresa: "Playstation",
    desc: "Completo en caja",
    desc: "Metal Gear Solid is a stealth game developed by Konami and released for the PlayStation in 1998. It was directed, produced, and written by Hideo Kojima, and follows the MSX2 video games Metal Gear and Metal Gear 2: Solid Snake, which Kojima also worked on",
    precio: 6823,
    img: 'https://i.ebayimg.com/images/g/HSsAAOSwo89i6U1y/s-l640.jpg',
    cantidad:15
}
const producto2 = {
    nombre: "Metal Gear Solid",
    consola: "Playstation 1",
    empresa: "Playstation",
    desc: "Completo en caja",
    desc: "Metal Gear Solid is a stealth game developed by Konami and released for the PlayStation in 1998. It was directed, produced, and written by Hideo Kojima, and follows the MSX2 video games Metal Gear and Metal Gear 2: Solid Snake, which Kojima also worked on",
    precio: 6823,
    img: 'https://i.ebayimg.com/images/g/HSsAAOSwo89i6U1y/s-l640.jpg',
    cantidad:15
}

const producto3 = {
    nombre: "Fifa 98",
    consola: "Playstation 1",
    empresa: "Playstation",
    desc: "Completo en caja",
    desc: "FIFA: Road to World Cup 98 is a football simulation video game developed by EA Canada and released by Electronic Arts in 1997. It is the fifth game in the FIFA series and the second to be in 3D on the fifth generation of video game consoles.",
    precio: 1090,
    img: 'https://i.ebayimg.com/images/g/iPIAAOSwrNdhPGsQ/s-l1600.jpg',
    cantidad:20
}

const crearProducto = async()=>{
    await listaProductos.save(producto1);
    await listaProductos.save(producto2);
    await listaProductos.save(producto3);
    const resultadoId = await listaProductos.getById(1);
    console.log(resultadoId)
    const productos = await listaProductos.getAll();
    console.log(productos)
    await listaProductos.deleteById(2);
    await listaProductos.save(producto2);

}

crearProducto();
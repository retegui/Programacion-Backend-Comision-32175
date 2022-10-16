class Usuario{
    constructor(nombre,apellido,libros,mascotas){
        this.nombre = nombre;
        this.apellido = apellido;
        this.libros = libros;
        this.mascotas = mascotas;
    }

    static cuentaGlobal = 0;

    getFullName (){
        return this.nombre + this.apellido;
    }

    addMascotas (){
        return this.mascotas;
    }

    countMascotas (){
        return count.mascotas;
    }

    addBook(){
        this.libros++;
        
    }
    getBookNames(){
        this.cuentaIndividual++;
    }
}

const usuarioNahuel = new Usuario ("Nahuel","Retegui",[{nombre:'1984',autor:'George Orwell'},{nombre:'La naranja mecanica',autor:'Anthony Burgess'}],['gato','jabali']);

console.log(usuarioNahuel);
console.log(usuarioNahuel.getFullName());
// console.log('Nahuel: ', usuarioNahuel.countMascotas());
// console.log('Nahuel: ',usuarioNahuel.addBook());
// console.log('Nahuel: ',usuarioNahuel.getBookNames());
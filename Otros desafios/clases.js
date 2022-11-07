class Usuario{
    constructor(nombre,apellido,libros,mascotas){
        this.nombre = nombre;
        this.apellido = apellido;
        this.libros = libros;
        this.mascotas = mascotas;
        // this.cuentalibros= cuentalibros;
        // this.cuentamascotas= cuentamascotas
    }

    static cuentaGlobal = 0;

    getFullName (){
        return this.nombre + this.apellido;
    }

    addMascotas (){
        return this.mascotas++;
        Usuario
    }

    countMascotas (){
        return count.mascotas;
    }

    addBook(){
        this.libros++;

    }
    getBookNames(){
        this.libro(nombre);

    }
}

const usuarioNahuel = new Usuario ("Nahuel","Retegui",[{"1984":"George Orwell"},{"La naranja mecanica":"Anthony Burgess"}],['gato','jabali']);

console.log(usuarioNahuel);
console.log(usuarioNahuel.getFullName());
// console.log(usuarioNahuel.countMascotas());
// console.log(usuarioNahuel.getBookNames());
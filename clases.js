class Contador{
    constructor(Usuario){
        this.nombre = nombre;
        this.apellido = "Bogota";
        this.libros = {"1985":"Orwell"};
        this.mascotas = "Pupi";
    }

    static cuentaGlobal = 0;

    getFullName (){
        return this.nombre+ this.apellido;
    }

    addMascotas (){
        return this.cuentaIndividual;
    }

    countMascotas (){
        return Contador.cuentaGlobal;
    }

    addLibros(){
        this.cuentaIndividual++;
        Contador.cuentaGlobal++;
    }
    getBookNames(){
        this.cuentaIndividual++;
        Contador.cuentaGlobal++;
    }
}


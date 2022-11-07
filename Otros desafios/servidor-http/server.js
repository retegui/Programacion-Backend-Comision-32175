const http = require ("http");

const server = http.createServer((request,response)=>{
    console.log("el servidor ha recibido una solicitud");
    const currentDate = new Date();
    const hour = currentDate.getHours();
    console.log(hour);
    if(hour>6 && hour<12){
        response.end("Buen dia. Hermosa mañana verdad?")
    } else if(hour>12 && hour<20){
        response.end("Buenas tardes")
    } else {
        response.end("Buenas noches")
    }
    });

server.listen(8080,()=>console.log("servidor ejecutandose en el puerto 8080"));



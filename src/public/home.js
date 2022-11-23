console.log("JS funcionando");

const socketClient = io();

const chatContainer = document.getElementById("chatContainer");

socketClient.on("messagesChat",(data)=>{
    console.log(data)
    let messages="";
    data.forEach(element => {
        messages += `<p>Autor: ${element.author} - Mensaje: ${element.text}</p>`
    });
    chatContainer.innerHTML = messages;
})


let user = "";
Swal.fire({
    title:"Bienvenido",
    text:"Ingresa tu nombre de usuario",
    input:"text",
    allowOutsideClick: false
}).then(response=>{
    console.log(response)
    user = response.value;
    document.getElementById("username").innerHTML = `¡Bienvenido ${user}!`;
})


const chatForm = document.getElementById("chatForm");

chatForm.addEventListener("submit",(event)=>{

    event.preventDefault();
    console.log("formulario enviado")
    const message = {
        author:user,
        text:document.getElementById("messageChat").value
    }

    socketClient.emit("newMsg", message)
})

const productForm = document.getElementById("productForm");
productForm.addEventListener("submit", (event)=>{
    event.preventDefault();
    const product = {
        title: document.getElementById("title").value,
        price: document.getElementById("price").value,
        thumbnail: document.getElementById("thumbnail").value,
    }
    console.log("product",product)
    socketClient.emit("newProduct",product);
})

const productsContainer = document.getElementById("productsContainer");
socketClient.on("productsArray", async (data)=>{
    console.log(data)
    const templateTable = await fetch("./templates/table.handlebars");
    const templateFormat = await templateTable.text();
    const template = Handlebars.compile(templateFormat);
    const html = template({products:data});
    productsContainer.innerHTML = html;   
})
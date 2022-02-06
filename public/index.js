
const socket = io.connect()

const Enviar = ()=>{
   let nombre = document.querySelector('#nombre').value
   let precio = document.querySelector('#precio').value
   let fotoUrl = document.querySelector('#fotoUrl').value

   let valores = {
   title: nombre,
   price: precio,
   thumbnail: fotoUrl
   }

   socket.emit('addProduct',valores)
 }


const renderProducts = (productos) =>{
    const temphbs = document.querySelector("#lista").innerHTML
    const template = Handlebars.compile(temphbs)
    console.log(template)
    document.querySelector('#lista').innerHTML = template({productos}); 
  }

   
  socket.on('productos',data => {
   renderTable(data)
 });


 function renderTable(productos) {
    return fetch('plantillas/tabla.hbs')
        .then(respuesta => respuesta.text())
        .then(plantilla => {
            const template = Handlebars.compile(plantilla);
            const html = template({ productos })
            document.querySelector('#lista').innerHTML = html
        })
}
 /*
function makeHtmlList(mensajes) {
  console.log(mensajes)
  return mensajes.map(mensaje => {
      return (`
          <div>
              <b style="color:blue;">${mensaje.autor}</b>
              [<span style="color:brown;">${mensaje.fyh}</span>] :
              <i style="color:green;">${mensaje.texto}</i>
          </div>
      `)
  }).join(" ");
}
*/

function makeHtmlList(mensajes) {
 
  const divMensajes = document.querySelector('#mensajes')
  let lista = []
  
   mensajes.forEach(mensaje => {
      let msg = (`
          <tr style='width:400px;height:50px;'>
              <td style="color:blue;">${mensaje.autor}</td>
              <td style="color:brown;">[${mensaje.fyh}]:</td>
              <td style="color:green;">${mensaje.texto}</td>
          </tr>
      `)
      lista.push(msg)
  })
  divMensajes.innerHTML = lista
}
socket.on('mensajes',data=>{
  makeHtmlList(data)
})

const enviarChat=()=>{
  let texto = document.querySelector("#inputMensaje").value
  let autor = document.querySelector("#inputUsername").value
  let date =  new Date()
  let fyh = date.toLocaleString() 
  let chat = {
  autor,
  fyh,
  texto
  }
  socket.emit("chateando",chat)
}
/*
inputUsername.addEventListener('input', () => {
  const hayEmail = inputUsername.value.length
  const hayTexto = inputMensaje.value.length
  inputMensaje.disabled = !hayEmail
  btnEnviar.disabled = !hayEmail || !hayTexto
})

inputMensaje.addEventListener('input', () => {
  const hayTexto = inputMensaje.value.length
  btnEnviar.disabled = !hayTexto
})*/
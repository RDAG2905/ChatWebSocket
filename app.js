
const express = require('express')
const repositorio = require('./Repository.js')
const dao = new repositorio()
const mensajesDao = require('./MensajesDao.js')
const daoChat = new mensajesDao('Mensajes.txt')
const { Server: HttpServer } = require('http')
const { Server: IOServer } = require('socket.io')
const { json } = require('express/lib/response')
const app = express()
const httpServer = new HttpServer(app)
const io = new IOServer(httpServer)
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(express.static('public'));


    io.on('connection', socket => {   
        socket.emit('productos', dao.getProducts())
    
        socket.on('addProduct',(payload)=>{ 
            dao.saveProduct(payload)    
            io.sockets.emit('productos', dao.getProducts());
        })

        socket.on('chateando',async (chat)=>{
           
            daoChat.save(chat)
                .then(id => 
                    daoChat.getAll()
                        .then(chats => {                    
                        io.sockets.emit('mensajes',JSON.parse(chats) ) }))
                       
                .catch(e=>
                console.log(e))
                      
        })
          
    })

        
    
        /////////////////////////////

        const PORT = 3000
        const connectedServer = httpServer.listen(PORT, () => {
            console.log(`Servidor http escuchando en el puerto ${connectedServer.address().port}`)
        })
        connectedServer.on('error', error => console.log(`Error en servidor ${error}`))
        
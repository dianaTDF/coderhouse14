const socket = io()

/* ---------------------------- listar mensajes ---------------------------- */
socket.on('messagesList',messages=>{
    const userEmail =  document.getElementById('userMail').value

    console.log(messages)
    for (const {user,message} of messages) {
        const messageItem = document.createElement('div')
        console.log(user)
        console.log(userEmail)
        if(userEmail ==user){ //si se ingresa con el mismo correo que alguno de los presente, se modifica aspecto
            messageItem.setAttribute("class",'myMessage')
        }else{
            messageItem.setAttribute("class",'message')
        }
        //se agrega al div los elementos del mensaje
        const userText= document.createElement('strong')
        userText.innerHTML= user
        const messageText= document.createElement('p')
        messageText.innerHTML= message

        messageItem.appendChild(userText)
        messageItem.appendChild(messageText)

        //buscamos el div chat_list y le insertamos el div creado en el loop
        document.getElementById('chat_list').appendChild(messageItem)
    }

})

/* ------------------------------ crear mensaje ----------------------------- */
const messageForm = document.getElementById('new_message')

messageForm?.addEventListener('submit',async event =>{
    event.preventDefault()

    const data  = new FormData(messageForm)
    const messBody = Object.fromEntries(data).message
    const user= document.getElementById('userMail').value
    
    if (messBody != ''  &&  user!= null){

        const newMessage= {
            message: messBody,
            user: user
        }
        
        console.log(newMessage)
        socket.emit('messageAdd',newMessage)
        window.location.reload()

    }
    else{
        socket.emit('errorMessage',{message:`no esta logeado y/o el mensaje esta vaccio`})
    }

    document.getElementById('body-text').focus()
})

/* --------------------------------- mensajes -------------------------------- */
socket.on(`errorMessage`, error =>{
    alert(`ERROR: ${error.message}`)
  })
  socket.on(`successMessage`, success =>{
    alert(`${success.message}`)
  })
const socket = io()



function addItem(event){
    event.preventDefault()

    const form =event.target
    
    const pid=form.querySelector('input[type="hidden"]').value
    socket.emit('addProduct',pid)
}

/* ----------------------- presentar carrito en vista ----------------------- */
socket.on(`checkCart`, cart =>{
    const existLink= document.getElementById("cartButton") == null

    console.log(existLink)
    if(existLink){
        const button=document.createElement('button');
        button.innerHTML= "ir a carrito";

        const cartLink = document.createElement('a');
        cartLink.setAttribute("id", "cartButton");
        cartLink.href = `http://localhost:8080/carts/${cart}`
        cartLink.appendChild(button)
        console.log('hola')

        const nav=document.getElementById('navPrototype')
        nav.appendChild(cartLink)
}
})



/* ---------------------- carga y gestion de productos ---------------------- */
/* ------------------------ administracion de paginas ----------------------- */
const linksDiv = document.getElementById('links')
const totalPage= linksDiv.dataset.total
const limit= linksDiv.dataset.limit
const actualPage= linksDiv.dataset.actual
const prevPage= linksDiv.dataset.prev?linksDiv.dataset.prev:null
const nextPage= linksDiv.dataset.next?linksDiv.dataset.next:null
const title= linksDiv.dataset.title?linksDiv.dataset.title:null
const sort= linksDiv.dataset.sort?linksDiv.dataset.sort:null

let urlOptions=''
if(title){
    urlOptions=+`&&query=${title}`
}
if(sort){
    urlOptions=+`&&sort=${sort}`
}

if(prevPage){
    const prevLink = document.createElement('a');
    prevLink.href = `http://localhost:8080/products?page=${prevPage}&&limit=${limit}`+urlOptions
    prevLink.textContent = 'Anterior';
    linksDiv.appendChild(prevLink);
}

for (let index = 1; index <= totalPage; index++) {
    if(index != actualPage){
        const prevLink = document.createElement('a');
        prevLink.href = `http://localhost:8080/products?page=${index}&&limit=${limit}`+urlOptions
        prevLink.textContent = `${index}`;
        linksDiv.appendChild(prevLink);    
    }else{
        const prevLink = document.createElement('span');
        prevLink.innerHTML = `${index}`;
        linksDiv.appendChild(prevLink);    
    }
}

if(nextPage){
    const nextLink = document.createElement('a');
    nextLink.href = `http://localhost:8080/products?page=${nextPage}&&limit=${limit}`+urlOptions
    nextLink.textContent = 'Siguientes';
    linksDiv.appendChild(nextLink);
}
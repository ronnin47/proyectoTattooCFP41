let listaInsumos=[];
let carrito=[];

//FUNCION AGREGAR CARRITO PARA EL EVENTO DEL BOTON
function agregarCarrito(producto){
    console.log(producto);
    let existeEnCarrito = carrito.find(
        (elementoCarrito)=> elementoCarrito.codigo == producto.codigo
    )
    if(existeEnCarrito == undefined){
        console.log(`El producto ${producto.codigo} se ha agregado`)
        carrito.push(producto)
        console.log(carrito)
        producto.aumentarCarrito();
    }else{
        console.log(`El producto ${producto.codigo} ya existe en el carrito`)
        //prox cantidad
        producto.aumentarCarrito();
    }
    localStorage.setItem("carrito",JSON.stringify(carrito));
    localStorage.setItem("listaInsumos",JSON.stringify(listaInsumos));
}

//CAPTURAR LISTA
const capturarLista=()=>{
    fetch("productos.json")
    .then((resp)=>{
        return resp.json()})
    .then((data)=>{
        data.forEach((producto)=>{
            let productoNuevo=new Producto(producto.codigo,producto.nombre,producto.marca,producto.categoria,producto.cantidadTotal,producto.precioUni,producto.paisOrigen,producto.fechaVenc,producto.descripcion,producto.proveedor,producto.imagen,producto.cantidadCarrito)
        listaInsumos.push(productoNuevo);
        localStorage.setItem("listaInsumos",JSON.stringify(listaInsumos));
        let ultimoCodigo=3;//es por los objetos ya instanciados
        localStorage.setItem("ultimoCodigo",JSON.stringify(ultimoCodigo)); 
        })
        console.log(listaInsumos);
        mostrarListaProductos(listaInsumos) 
    })
}

//RECUPERAR STORAGE
function recuperarStorage(){
    let listaInsumosRecuperar = JSON.parse(localStorage.getItem("listaInsumos"));
    
    if(listaInsumosRecuperar && listaInsumosRecuperar.length>0)
    {       
        listaInsumosRecuperar.forEach(producto => {
            producto=new Producto(
                producto.codigo,
                producto.nombre,
                producto.marca,
                producto.categoria,
                producto.cantidadTotal,
                producto.precioUni,
                producto.paisOrigen,
                producto.fechaVenc,
                producto.descripcion,
                producto.proveedor,
                producto.imagen,
                producto.cantidadCarrito
        )
            listaInsumos.push(producto);
        });
        mostrarListaProductos(listaInsumos)
       
    }else{
        //si no hay storage va a instanciar y guardarlos en el storage y los va mostrar en el DOM
        //OBJETOS DE LA CLASS YA INSTANCIADOS EN EL ARRAY 
       /* listaInsumos[0]= new Producto (1,"Pen Flip","Dragon hawk","Maquina",1,300,"EEUU","1000 horas de uso","Maquina pen con stroke variable de 2.0 a 4.0, funcional para lineas,sombreados y rellenos","Amazing Tattoo","https://images.tcdn.com.br/img/img_prod/829232/maquina_tatuagem_pen_2_6_4_0mm_stroke_length_custom_motor_supply_mast_flip_vermelha_4421_1_b05f9bf7db1b1d9600cef0af04012ca3.jpg",0);
        listaInsumos[1]= new Producto (2,"Dragon green","Intenze","Tinta",1,5,"EEUU","4/11/2023","Tinta acrilica color rojo intenso, utilizable para plenos de estilo new school ","Amazing Tattoo","https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRfI1aWGgGkPSameCStQFyxCFiTNdrlKidzYbdEvSBRrH0p_Z_D31tTG89UFm22ste8HE4&usqp=CAU",0);
        listaInsumos[2]= new Producto (3,"Pen Ep9++","Ava","Maquina",1,250,"EEUU","1000 horas de uso","Maquina pen con stroke 3.5, funcional para lineas,sombreados y rellenos","Amazing Tattoo","https://tattoo-supply.cz/11052-large_default/ava-machine-ep9-black.jpg",0);
        listaInsumos[3]= new Producto (4,"Black","Dynamic","Tinta",3,5,"EEUU","13/7/2026","Tinta acrilica color negra, utilizable para lineas, sombreados y rellenos","Amazing Tattoo","https://http2.mlstatic.com/D_NQ_NP_979364-MLA69717100629_052023-O.webp",0);
        localStorage.setItem("listaInsumos",JSON.stringify(listaInsumos));
        let ultimoCodigo=4;//es por los objetos ya instanciados
        localStorage.setItem("ultimoCodigo",JSON.stringify(ultimoCodigo));*/
        capturarLista();        
        }         
}

//recuperar storage carrin
function recuperarStorageCarrito(){
    let carritoRecuperar = JSON.parse(localStorage.getItem("carrito"));

    //si el storage contiene algo le va dar class al array y lo va mostrar en el dom
    if(carritoRecuperar && carritoRecuperar.length>0)
    {
        carritoRecuperar.forEach(producto => {
            producto=new Producto(
                producto.codigo,
                producto.nombre,
                producto.marca,
                producto.categoria,
                producto.cantidadTotal,
                producto.precioUni,
                producto.paisOrigen,
                producto.fechaVenc,
                producto.descripcion,
                producto.proveedor,
                producto.imagen,
                producto.cantidadCarrito
        )
            carrito.push(producto);
            console.log(carrito)
        });
       
    }
}

recuperarStorageCarrito()
recuperarStorage();

//FUNCION PARA MOSTRAR PRODUCTO Y CARGAR LOS NODOS DE LAS CARD Y ASIGNAR EVENTOS
function mostrarListaProductos(listaInsumos)
{ 
    //en la consola
    console.log("******Listado de productos******")
    listaInsumos.forEach(producto => producto.mostrarDataProducto());
    //en el DOM
    productosDiv.innerHTML = ""; // Borramos contenido del div y ponemos el nuevo
    listaInsumos.forEach(producto => producto.mostrarDataProductoDOM());  
}

//CARGA DE NUEVOS PRODUCTOS POR INPUTS 
function cargarNuevoProducto(listaInsumos)
{    
   let nombre=formCargarProducto[0]
   let marca=formCargarProducto[1]
   let categoria=formCargarProducto[2]

  //verificacion si existe un producto con mismo nombre,marca,categoria
   let productoExistente=listaInsumos.find(producto=>
   producto.nombre.toLowerCase()===nombre.value.toLowerCase()&&
   producto.marca.toLowerCase()===marca.value.toLowerCase()&&
   producto.categoria.toLowerCase()===categoria.value.toLocaleLowerCase());
    console.log(productoExistente);
    if(productoExistente){
        //valida que la cantidad sea un numero y que no sea negativo. incluye cero
        let cantidadTotal=parseInt(formCargarProducto[3].value);
        console.log(cantidadTotal)
        //si el producto ya existe con esos tres atriburtos suma al total de ese mismo producto
        productoExistente.cantidadTotal+=cantidadTotal;
        console.log(productoExistente.cantidadTotal);
        console.log("cargo producto sobre existente");
    }else{

    let cantidadTotal=parseInt(formCargarProducto[3].value);
    let precioUni=parseFloat(formCargarProducto[4].value);
    let paisOrigen=formCargarProducto[5]
    let fechaVenc=formCargarProducto[6]
    let descripcion=formCargarProducto[7]
    let proveedor=formCargarProducto[8]
    let imagen=formCargarProducto[9]
    let ultimoCodigo= JSON.parse(localStorage.getItem("ultimoCodigo"));
    console.log(ultimoCodigo)
    ultimoCodigo=ultimoCodigo+1
    console.log(ultimoCodigo)
   //la solucion seia guardar en un storage el codigo para el id y traerlo porque 

    //let codigo=listaInsumos.length+1//para codigo
    let codigo=ultimoCodigo
    console.log(ultimoCodigo)
    const productos= new Producto(codigo,nombre.value,marca.value,categoria.value,cantidadTotal,precioUni,paisOrigen.value,fechaVenc.value,descripcion.value,proveedor.value,imagen.value);
    listaInsumos.push(productos);
    console.log("cargo producto nuevo")
    localStorage.setItem("ultimoCodigo",JSON.stringify(ultimoCodigo));

    }
    console.log(listaInsumos)
    //reset inputs
    formCargarProducto.reset()
    localStorage.setItem("listaInsumos",JSON.stringify(listaInsumos));
    
    mostrarListaProductos(listaInsumos)
    console.log(listaInsumos);
}

//CAPTURO EL NODO DEL MODAL POR ID Y LE ARMO UN EVENTO Y UNA FUNCION FINALIZAR COMPRA
btnfinalizarCompra1.addEventListener("click", ()=>{
    console.log("funciona el evento de boton finalizar compra")
    finalizarCompra(carrito,listaInsumos);
    //modalBodyCarrito.innerHTML = ""
    
    carrito=[];
    localStorage.setItem("carrito",JSON.stringify(carrito));
    totalReduce=0;
    precioTotal.innerText="";
    mostrarListaProductos(listaInsumos);
    
})

//FUNCION FINALIZAR COMPRA
function finalizarCompra(carrito,listaInsumos)
{
        // Verifica si el carrito está vacío
        if (carrito.length === 0) {
            modalBodyCarrito.innerHTML = "Carrito vacio"  
            // Si el carrito está vacío, oculta el botón "Finalizar Compra"
            btnfinalizarCompra1.style.display = "none";
            precioTotal.innerText="";
            console.log("entro en none y oculta el boton finalizar compra")
        } else {
            // Si el carrito no está vacío, muestra el botón "Finalizar Compra"
            btnfinalizarCompra1.style.display = "block";
        }


    if(carrito.length>=1)
    {
        let ventaHabilitada = true
        //chekeamos si todos (en su totalidad) los productos del carrito estan disponibles en el stock
        carrito.forEach(
            (elementoCarrito) => 
            {
             listaInsumos.forEach(
                (productoStock) =>  
                    {
                        if (productoStock.codigo == elementoCarrito.codigo) 
                        {
                            if (productoStock.cantidadTotal >= elementoCarrito.cantidadCarrito) 
                            {
                              console.log(`****${elementoCarrito.nombre} ${elementoCarrito.marca} hay stock disponible****`);
                            } else 
                            {
                              console.log(`****${elementoCarrito.nombre} ${elementoCarrito.marca} No hay stock disponible****`);


                              modalBodyCarrito.innerHTML+=`No hay stock disponible ${elementoCarrito.nombre} ${elementoCarrito.marca} <br>`;
                              
                              btnfinalizarCompra1.style.display = "none";



                              ventaHabilitada = false;
                            }
                        }
                    }
                );
            }
        )
        if(ventaHabilitada==true){
            //resta al stock
        carrito.forEach(
        (productoCarrito) => {
        listaInsumos.forEach(
        (productoStock)=>{
                            //restar la cantidad de carrito al stock
                            if(productoStock.codigo == productoCarrito.codigo)
                            {
                            productoStock.cantidadTotal -= productoCarrito.cantidadCarrito;
                            }
                        }
                    )
                }
            )
                let totalReduce = carrito.reduce((acumulador, elemento) => acumulador + (elemento.precioUni * elemento.cantidadCarrito), 0)
                modalBodyCarrito.innerHTML=`
                Total de compra sin iva: ${totalReduce} $ <br>
                Total de compra con iva: ${totalReduce*1.21} $`;
                btnfinalizarCompra1.style.display = "none";
                console.log("si el carrito tiene productos")
                console.log(`Total de compra: ${totalReduce}`)
}
 
   
                    carrito.forEach(producto=>producto.cantidadCarrito=0);
                    //modalBodyCarrito.innerHTML = ""
    



    }
    console.log(carrito)
    console.log(listaInsumos)
    localStorage.setItem("carrito",JSON.stringify(carrito));
    localStorage.setItem("listaInsumos",JSON.stringify(listaInsumos));
}

//IMPRIMIR EL CARRITO EN EL MODAL
function imprimirCarrito(carrito){
    console.log(carrito)
    modalBodyCarrito.innerHTML = ""
    let btnfinalizarCompra1=document.getElementById("botonFinalizarCompra1");

    // Verifica si el carrito está vacío
if (carrito.length === 0) {
    modalBodyCarrito.innerHTML = "Carrito vacio"  
    //precioTotal.innerText="";
    //Si el carrito está vacío, oculta el botón "Finalizar Compra"
    btnfinalizarCompra1.style.display = "none";
    console.log("entro en none y oculta el boton finalizar compra")
} else {
    // Si el carrito no está vacío, muestra el botón "Finalizar Compra"
    btnfinalizarCompra1.style.display = "block";
    //IMPRIME LAS CARDS DE LOS PRODUCTOS DEL CARRITO EN EL MODAL
    carrito.forEach(
        (productoCarrito)=>{
            modalBodyCarrito.innerHTML += `
            <div class="card border-primary mb-3" id ="productoCarrito${productoCarrito.codigo}" style="max-width: 540px;">
                 <img class="card-img-top" height="300px" src="${productoCarrito.imagen}" alt="${productoCarrito.nombre} de ${productoCarrito.marca}">
                 <div class="card-body cuerpoCard">
                        <h4 class="card-title">Producto: ${productoCarrito.nombre}</h4>
                        <p class="card-text">Marca: ${productoCarrito.marca}</p>
                        <p class="card-text">Categoria: ${productoCarrito.categoria}</p>
                        <p class="card-text">Precio: $${productoCarrito.precioUni}</p>
                        <p class="card-text">Cantidad stock: ${productoCarrito.cantidadTotal}</p>
                        <p class="card-text" id="cantidadCarrito-${productoCarrito.codigo}">Cantidad en carrito: ${productoCarrito.cantidadCarrito}</p>  
                         <button class= "btn btn-danger" id="botonEliminar${productoCarrito.codigo}"><i class="fas fa-trash-alt"></i></button>
                 </div>    
            </div>
            `
            
        }
    )
    let totalReduce = carrito.reduce((acumulador, elemento) => acumulador + (elemento.precioUni * elemento.cantidadCarrito), 0)
    precioTotal.innerText=`Total a pagar sin iva: $${totalReduce}
    Total a pagar con iva: $${totalReduce*1.21}
    `;

}


  
    
    console.log("estado del carrito")
    console.log(carrito)
    
    //BOTON ELIMAR PRODUCTO DEL MODAL CARRITO:
    carrito.forEach(
        (productoCarrito)=>{
            //TOMAMOS EL BOTON ELIMINAR DEL MODAL Y LE DAMOS SU EVENTO DONDE LE DAMOS REMOVE DEL MODAL Y ELIMINAMOS DEL CARRITO
            document.getElementById(`botonEliminar${productoCarrito.codigo}`).addEventListener("click", ()=>{
                console.log(`Se ha eliminado el producto ${productoCarrito.nombre}`)
                //
                productoCarrito.restarCarrito();
                let totalReduce = carrito.reduce((acumulador, elemento) => acumulador + (elemento.precioUni * elemento.cantidadCarrito), 0)
                precioTotal.innerText=`Total a pagar sin iva: $${totalReduce}
                Total a pagar con iva: $${totalReduce*1.21}
                `;

                
                // Actualizar la cantidad en el DOM
                let cantidadCarritoElement = document.getElementById(`cantidadCarrito-${productoCarrito.codigo}`);
                if (cantidadCarritoElement) {
                    cantidadCarritoElement.innerText = `Cantidad en carrito: ${productoCarrito.cantidadCarrito}`;
                }
            


                //imprimirCarrito(carrito);
                if(productoCarrito.cantidadCarrito==0)
                {
                //borrarlo del DOM
                let cardProducto = document.getElementById(`productoCarrito${productoCarrito.codigo}`)
                cardProducto.remove()
                //borrarlo del array
                let posicion = carrito.indexOf(productoCarrito)
                //splice
                carrito.splice(posicion,1)
                console.log("entro aca a eliminar el ultimisiiiiimo producto antes de guardarse el carrito")
                localStorage.setItem("carrito",JSON.stringify(carrito));
                localStorage.setItem("listaInsumos",JSON.stringify(listaInsumos));
                console.log(carrito)
                console.log(`Se eliminaron todos los productos de ${productoCarrito.nombre} `)  
                let totalReduce = carrito.reduce((acumulador, elemento) => acumulador + (elemento.precioUni * elemento.cantidadCarrito), 0)
                precioTotal.innerText=`Total a pagar sin iva: $${totalReduce}
                Total a pagar con iva: $${totalReduce*1.21}
                `;
                
                console.log(carrito)
                //cuando se da el borrado tengo que guaredarlo, pero tengo que 


                }
                   // Verifica si el carrito está vacío
                    if (carrito.length === 0) {
                        modalBodyCarrito.innerHTML = "Carrito vacio"  
                        precioTotal.innerText="";
                        // Si el carrito está vacío, oculta el botón "Finalizar Compra"
                        btnfinalizarCompra1.style.display = "none";
                    } else {
                        // Si el carrito no está vacío, muestra el botón "Finalizar Compra"
                        btnfinalizarCompra1.style.display = "block";
                    }
                console.log(carrito)
            })

        }
        )
}

//Funcion e buscar info
function buscarInfo(buscado,array){
    let coincidencias = array.filter(
        (producto)=>producto.nombre.toLowerCase().includes(buscado.toLowerCase()) || producto.marca.toLowerCase().includes(buscado.toLowerCase()) || producto.categoria.toLowerCase().includes(buscado.toLowerCase())
    )
    if(coincidencias.length < 1){
        coincidenciasBusqueda.innerText = `No hay coincidencias con ${buscado}`
        // productosDiv.innerHTML =""
        mostrarListaProductos(coincidencias)
    }else{
        // coincidenciasBusqueda.innerText = `Para ${buscado} respecto nombre o marca hay estas coincidencias:`
        coincidenciasBusqueda.innerText = ""
        mostrarListaProductos(coincidencias)

    }
    console.log(coincidencias)
    return coincidencias
}

// FUNCIONA EL BUSCADOR GATILLANDO
function buscadorModificarProductoEnModal(listaInsumos,buscadoModificar){
 
    let indexProducto = listaInsumos.findIndex(
        (producto)=>producto.codigo==parseInt(buscadoModificar)  
    )
   
    console.log(indexProducto);

    let modalBodyModificarProducto=document.getElementById("modal-bodyModificarProducto");
   if(indexProducto==-1){
    modalBodyModificarProducto.innerHTML=`No hay coincidencia con el codigo ${buscadoModificar} en un producto`

   }else{
            modalBodyModificarProducto.innerHTML = `
            <div class="card border-primary mb-3" id ="producto-${listaInsumos[indexProducto].codigo}" style="max-width: 540px;">
                 <img class="card-img-top" height="300px" src="${listaInsumos[indexProducto].imagen}" alt="${listaInsumos[indexProducto].nombre} de ${listaInsumos[indexProducto].marca}">
                 <div class="card-body cuerpoCard">
                        <h4 class="card-title">Producto: ${listaInsumos[indexProducto].nombre}</h4>
                        <p class="card-text">Marca: ${listaInsumos[indexProducto].marca}</p>
                        <p class="card-text">Categoria: ${listaInsumos[indexProducto].categoria}</p>
                        <p class="card-text">Precio: $${listaInsumos[indexProducto].precioUni}</p>
                        <p class="card-text">Cantidad stock: ${listaInsumos[indexProducto].cantidadTotal}</p>        
                 </div>    
            </div>
            `    
//dentro del modal si encuentra coincidencia tiene que haber un boton que diga modificar producto, y ese boton va disparar 
    let botonModalModificarProducto=document.getElementById("botonModalModificarProducto");
   
    botonModalModificarProducto.addEventListener("click", ()=>{
    listaInsumos[indexProducto].modificarProducto();
    })
   } 

   let btnCerrarModificarProducto=document.getElementById("btnCerrarModificarProducto");
   btnCerrarModificarProducto.addEventListener("click",()=>{
    buscadorModificarProductoModal.value="";
    modalBodyModificarProducto.innerHTML ="";
   })
}

//Funciones para el select de ordenar:
function ordenarMenorMayor(array){
    let arrayOrdenar = buscarInfo(buscador.value, array)
    // let ordenadoMenor = [].concat(arrayOrdenar)
    //ordenar de menor a mayor es primerParametro - segundoParametro  
    arrayOrdenar.sort((par1, par2) => par1.precioUni - par2.precioUni)
    mostrarListaProductos(arrayOrdenar)
    return arrayOrdenar
}

// ordenarMenorMayor(estanteria)
function ordenarMayorMenor(array){
    let arrayOrdenar = buscarInfo(buscador.value, array)
    //ordenar de mayor es segundoParametro - primerParametro
    arrayOrdenar.sort((par1, par2) => par2.precioUni - par1.precioUni)
    mostrarListaProductos(arrayOrdenar)
    return arrayOrdenar
}

//sort alfabeticamente
function ordenarAlfabeticamenteNombre(array){
    let arrayOrdenar = buscarInfo(buscador.value, array)
    arrayOrdenar.sort(
        (x,y)=>{
            //ordenar por datos string
            if(x.nombre > y.nombre){
                return 1
            }
            if(x.nombre < y.nombre){
                return -1
            }
            return 0
        }
    )
   mostrarListaProductos(arrayOrdenar)
    return arrayOrdenar
}







//mostrarListaProductos(listaInsumos) 









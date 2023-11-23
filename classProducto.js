//ClASS PRODUCTO
class Producto
{
    constructor(codigo,nombre,marca,categoria,cantidadTotal,precioUni,paisOrigen,fechaVenc,descripcion,proveedor,imagen,cantidadCarrito)
    {
        this.codigo=codigo,
        this.nombre=nombre,
        this.marca=marca,
        this.categoria=categoria,
        this.cantidadTotal=cantidadTotal,
        this.precioUni=precioUni,
        this.paisOrigen=paisOrigen,
        this.fechaVenc=fechaVenc,
        this.descripcion=descripcion,
        this.proveedor=proveedor,
        this.imagen=imagen,
        this.cantidadCarrito=cantidadCarrito;     
    }
    mostrarDataProducto()
    {
        console.log(`
        Codigo:${this.codigo}
        Nombre:${this.nombre}
        Marca:${this.marca}
        Categoria:${this.categoria}
        Cantidad Total:${this.cantidadTotal}
        Precio por Unidad:${this.precioUni}
        paisOrigen:${this.paisOrigen}
        Fecha de vencimiento:${this.fechaVenc}
        Descripcion:${this.descripcion}
        Proveedor:${this.proveedor}`)
    }

    modificarProducto(){
        let modalModificarProducto = document.createElement("div")
            modalModificarProducto.innerHTML = `
                                <div class="modal fade" id="idModalModificarProducto-${this.codigo}" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                    <div class="modal-dialog modal-dialog-centered">
                                        <div class="modal-content">
                                                <div class="modal-header">
                                                <h5 class="modal-title" id="exampleModalLabel">Modificar producto</h5>
                                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                                </div>
                                                <div class="modal-body cuerpoCard">
                                                <form id="formModificarProducto-${this.codigo}" class="my-4">                                                
                                                <div class="mb-3">
                                                <label for="nombre" class="form-label">Nombre de producto:</label>
                                                <input type="text" class="form-control" id="nombreInput-${this.codigo}" aria-describedby="nombre" value="${this.nombre}" placeholder="Ingrese nombre del producto">                                   
                                                </div>
                                                <div class="mb-3">
                                                    <label for="marca" class="form-label">Marca:</label>
                                                    <input type="text" class="form-control" id="marcaInput" aria-describedby="marca" value="${this.marca}" placeholder="Ingrese marca">            
                                                </div>                                               
                                                <div class="mb-3">
                                                    <label for="categoria" class="form-label">Categoria:</label>
                                                    <input type="text" class="form-control" id="categoriaInput" aria-describedby="categoria" value="${this.categoria}" placeholder="Ingrese categoria del producto">                                                    
                                                </div>
                                                <div class="mb-3">
                                                    <label for="cantidadTotal" class="form-label">Cantidad en stok:</label>
                                                    <input type="number" class="form-control" id="cantidadTotalInput" aria-describedby="cantidadTotal" value="${this.cantidadTotal}" placeholder="Ingrese cantidad total del producto">                                                          
                                                </div>
                                                <div class="mb-3">
                                                    <label for="precioUni" class="form-label">Precio:</label>
                                                    <input type="number" class="form-control" id="precioUniInput" aria-describedby="precioUni" value="${this.precioUni}" placeholder="Ingrese precio del producto">                                                           
                                                </div>                                                
                                                <div class="mb-3">
                                                    <label for="paisOrigen" class="form-label">Pais de origen:</label>
                                                    <input type="text" class="form-control" id="paisOrigenInput" aria-describedby="paisOrigen" value="${this.paisOrigen}" placeholder="Ingrese pais de origen del producto">                                                    
                                                </div>
                                                <div class="mb-3">
                                                <label for="fechaVenc" class="form-label">Fecha de vencimiento:</label>
                                                <input type="text" class="form-control" id="fechavencInput" aria-describedby="fechaVenc" value="${this.fechaVenc}" placeholder="Ingrese fechad de vencimiento del producto">                                                   
                                                </div>
                                                <div class="mb-3">
                                                <label for="descripcion" class="form-label">Descripcion del producto:</label>
                                                <input type="text" class="form-control" id="descripcionInput" aria-describedby="descripcion" value="${this.descripcion}" placeholder="Ingrese descripcion del producto">                                                   
                                                </div>
                                                <div class="mb-3">
                                                <label for="proveedor" class="form-label">Proveedor:</label>
                                                <input type="text" class="form-control" id="proveedorInput" aria-describedby="proveedor" value="${this.proveedor}" placeholder="Ingrese proveedor del producto">                                                   
                                                </div>
                                                <div class="mb-3">
                                                    <label for="imagen" class="form-label">url de la imagen del producto:</label>
                                                    <input type="text" class="form-control" id="imagenInput" aria-describedby="imagen" value="${this.imagen}" placeholder="Ingrese url de imagen del producto">
                                                </div>
                                                </form>
                                            </div>
                                            <div class="modal-footer">
                                                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                                                <button type="button" class="btn btn-danger" id="eliminarProducto-${this.codigo}" data-bs-dismiss="modal">Eliminar producto</button>
                                                <button type="button" class="btn btn-primary" id="guardarCambios-${this.codigo}" data-bs-dismiss="modal">Guardar Cambios</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            `;
            
                        
                            document.body.appendChild(modalModificarProducto);
                            
                            let modalElement = document.getElementById(`idModalModificarProducto-${this.codigo}`);
                            let modal = new bootstrap.Modal(modalElement);
                            modal.show();

                            let btnEliminarProducto=document.getElementById(`eliminarProducto-${this.codigo}`);
                            btnEliminarProducto.addEventListener("click",()=>{
                            console.log(`funciona boton eliminar producto ${this.nombre} ${this.marca} ${this.categoria}`)
                        
                        // cardProducto.remove()
                            //borrarlo del array
                            let posicion = listaInsumos.findIndex(producto => producto.codigo === this.codigo);
                            console.log(posicion);
                            //splice
                            listaInsumos.splice(posicion,1)
                            
                            localStorage.setItem("listaInsumos",JSON.stringify(listaInsumos));

                            location.reload();

                            });

                            //codigo,nombre,marca,categoria,cantidadTotal,precioUni,paisOrigen,fechaVenc,descripcion,proveedor,imagen,cantidadCarrito
                            let botonGuardarCambiosModificar=document.getElementById(`guardarCambios-${this.codigo}`);
                            botonGuardarCambiosModificar.addEventListener("click",()=>{
                                console.log("funciona evento de guardar cambios") 
                                //console.log("funciona boton guardar cambios del modal form modificar personaje");
                                //funcion guardar cambios
                                //capturo el form y lleno el array
                                let formModificarProducto=document.getElementById(`formModificarProducto-${this.codigo}`);

                                this.nombre=formModificarProducto[0].value
                                this.marca=formModificarProducto[1].value
                                this.categoria=formModificarProducto[2].value
                                this.cantidadTotal=parseInt(formModificarProducto[3].value)
                                this.precioUni=parseFloat(formModificarProducto[4].value)
                                this.paisOrigen=formModificarProducto[5].value
                                this.fechaVenc=formModificarProducto[6].value
                                this.descripcion=formModificarProducto[7].value
                                this.proveedor=formModificarProducto[8].value
                                this.imagen=formModificarProducto[9].value
                                /*Swal.fire({
                                    position: 'top-end',
                                    icon: 'success',
                                    title: `Los cambios de ${this.nombre} han sido cargados`,
                                    showConfirmButton: false,
                                    timer: 1500
                                    
                                })*/                                                          
                                localStorage.setItem("listaInsumos",JSON.stringify(listaInsumos)); 
                                //console.log(this)
                                location.reload()
                              })

    }


    mostrarDataProductoDOM()
    {
      //creamos un nodo
      let nuevoProductoDiv = document.createElement("div")
      nuevoProductoDiv.className = "col-sm-12 col-md-6 col-lg-4 col-xxl-3 my-3"
      //le dimos contenido a ese nodo
      nuevoProductoDiv.innerHTML = `<div id="${this.codigo}"class="card mx-auto" style="width: 18rem;">
                                      <img src="${this.imagen}" height="300px" width="" class="card-img-top" alt="${this.nombre} de ${this.marca}">
                                      <div class="card-body mx-auto cuerpoCard">
                                      <h5 class="card-Nombre">${this.nombre}</h5>
                                      <p class="card-text">Codigo: ${this.codigo}</p>
                                      <p class="card-text">Marca: ${this.marca}</p>
                                      <p class="card-text">Categoria: ${this.categoria}</p>
                                      <p class="card-text">Cantidad Total: ${this.cantidadTotal}</p>
                                      <p class="card-text">Precio: ${this.precioUni}</p>
                                      <p class="card-text">Pais de origen: ${this.paisOrigen}</p>
                                      <p class="card-text">Fecha vencimiento: ${this.fechaVenc}</p>
                                      <p class="card-text">Descripcion: ${this.descripcion}</p>
                                      <p class="card-text">Proveedor: ${this.proveedor}</p>
                                      
                                      <a href="#" class="btn btn-success" id="btnAgregarCarrito-${this.codigo}" data-producto="${this.codigo}" ${this.cantidadTotal === 0 ? "disabled" : ""}>Agregar al carrito</a>
                                    
                                     
                                      </div>
                                  </div> `
    //append o appendChild adjuntamos AL DOM al nodo
      productosDiv.appendChild(nuevoProductoDiv)  
    
      //NO FUNCIONA DESABILITAR
      let btnHabilitado = document.getElementById(`btnAgregarCarrito-${this.codigo}`);
      if (this.cantidadTotal == 0) {
        btnHabilitado.style.display="none"
      } else {
        btnHabilitado.style.display="block"
      }


    //CAPTURAMOS EL NODO DE LA CARD Y LE ASIGNAMOS UN EVENTO AL BOTON DEL CARRITO
    let self = this; 
    let btnAgregarCarrito = document.getElementById(`btnAgregarCarrito-${this.codigo}`)        
      
    btnAgregarCarrito.addEventListener("click",()=>{
        if(this.cantidadTotal>=1){
            console.log(`Se ha agregado el producto ${this.nombre}`)
            //aca??
           // localStorage.setItem("carrito",JSON.stringify(carrito));
            agregarCarrito(self);
        }
        });   
    }

    precioIva()
    {
        const iva= 0.21;
        let precioIva=this.precioUni +(this.precioUni * iva);
        //console.log(`Precio con iva incluido: ${precioIva}`); 
        return precioIva
    }

    aumentarCarrito()
    {
        this.cantidadCarrito++;
    }
   
    restarCarrito()
    {
      this.cantidadCarrito--;
    }     
}
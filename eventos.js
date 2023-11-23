//EVENTOS: 

//BOTON CARRITO
botonCarrito.addEventListener("click", ()=>{
    imprimirCarrito(carrito)
})

//BUSCADOR PARA EL MODAL DE MODIFICAR PRODUCTO
buscadorModificarProductoModal.addEventListener("input",()=>{
    let buscadoModificar=buscadorModificarProductoModal.value
    console.log(buscadoModificar)
    buscadorModificarProductoEnModal(listaInsumos,buscadoModificar);
    })

//BOTON GUARDAR PRODUCTO NUEVO
guardarProductoBtn.addEventListener("click", ()=>{
    cargarNuevoProducto(listaInsumos);
})

//input detecta cada cambio en el input
buscador.addEventListener("input", ()=>{
    switch(selectOrden.value){
        case "1":
            let mayorMenor = ordenarMayorMenor(listaInsumos)
            buscarInfo(buscador.value, mayorMenor)
        break
        case "2":
            let menorMayor = ordenarMenorMayor(listaInsumos)
            buscarInfo(buscador.value, menorMayor)
        break
        case "3":
            let alfabetica = ordenarAlfabeticamenteNombre(listaInsumos)
            buscarInfo(buscador.value, alfabetica)
        break
        default:
            buscarInfo(buscador.value, listaInsumos)
        break    
    }
    
})

selectOrden.addEventListener("change", ()=>{
    console.log(`Detecta cambio. Valor: `, selectOrden.value)
    switch(selectOrden.value){
        case "1":
            ordenarMayorMenor(listaInsumos)          
        break
        case "2":
            ordenarMenorMayor(listaInsumos)
        break
        case "3":
            ordenarAlfabeticamenteNombre(listaInsumos)
        break
        default:
            let arrayFiltrado = buscarInfo(buscador.value, listaInsumos)
            mostrarListaProductos(arrayFiltrado)
        break    
    }   
})
//import { UsuarioContext } from './../App';

import './item.css'; // Asegúrate de importar el archivo CSS
import {  useEffect, useState } from 'react';
interface Props{
    imagen: string,
    titulo:string,
  
    cantidad?:number,
    precio:number,
    id:number,
    onEliminar?: (id: number) => void; // 👉 nueva prop para avisar al padre que se debe quitar
 
   }
  
   function actualizarCantidadEnCarrito(id:any, cantidad:any) {
    // Validar que la cantidad sea válida

  
    // Obtener el carrito guardado desde localStorage
    const carritoGuardado = JSON.parse(localStorage.getItem("carrito")) || [];
  
    // Buscar si el producto existe
    const productoExistente = carritoGuardado.find(p => p.id === id);
    if (cantidad == 0) {
      // Si la cantidad es 0, elimina el producto del carrito
      const carritoFiltrado = carritoGuardado.filter((producto) => producto.id !== id);
      localStorage.setItem("carrito", JSON.stringify(carritoFiltrado));
     } else{
    if (!productoExistente) {
      console.warn("Producto no encontrado en el carrito.");
      return;
    }
  
    // Actualizar la cantidad del producto
    const carritoActualizado = carritoGuardado.map(p => {
      if (p.id === id) {
        console.log("Producto actualizado:", p);
        return { ...p, Cantidad: cantidad };  // Reemplaza la cantidad
      }
      return p;
    });
  

    // Guardar el carrito actualizado en localStorage

    localStorage.setItem("carrito", JSON.stringify(carritoActualizado));
  }
  }
  
  
  
// Componente Producto utilizando función tradicional
function Carrito(props:Props){



  

  
      const {imagen,titulo, precio=0, cantidad=0, id=0} = props
    // Función para generar las estrellas
    const [imagenSeleccionada, setCantidad] = useState(cantidad);
    //onClick={() => manejarSeleccion(imagen)}
      // Función para manejar el cambio de imagen cuando se selecciona una imagen pequeña
      function cantidad_pedida(index: number, operacion:string) {




        
          if (operacion === "-") {
    
              // Verificar si el valor de index es mayor que 0 antes de decrementar
              if (index > 0) {
                
                  setCantidad(index - 1); // Decrementa la cantidad solo si index > 
     
              }
          } else {
              setCantidad(index + 1); // Incrementa la cantidad
             
          }
          
        }
        useEffect(() => {
          if (imagenSeleccionada >= 0) {
            actualizarCantidadEnCarrito(id, imagenSeleccionada);
        
            // 👇 Si la cantidad es 0, le avisamos al padre que lo elimine de la vista
            if (imagenSeleccionada === 0 && props.onEliminar) {
              props.onEliminar(id);
            }
          }
        }, [imagenSeleccionada]);
        
  return (<div className="card shadow-sm d-flex flex-row align-items-center p-3 mx-auto" style={{ width: '100%', maxWidth: '700px' }}>
    {/* Imagen del producto */}
    <img 
      src={imagen} 
      className="img-thumbnail me-4" 
      alt={titulo} 
      style={{ width: '150px', height: '150px', objectFit: 'cover' }} 
    />
  
    {/* Contenido del producto */}
    <div className="d-flex flex-column justify-content-between text-start w-100">
      
      {/* Título */}
      <h3 className="card-title mb-2" style={{ textAlign: 'left' }}>{titulo}</h3>
  
      {/* (Opcional) Descripción justificada */}
      {/* <p className="mb-2" style={{ textAlign: 'justify' }}>{descripcion}</p> */}
  
      {/* Precio unitario */}
      <div className="mb-2">
        <small className="text-muted">Precio unitario:</small>
        <div className="fw-bold" style={{ fontSize: '1.1rem' }}>${precio}</div>
      </div>
  
      {/* Precio total */}
      <div className="mb-2">
        <small className="text-muted">Total:</small>
        <div className="fw-bold" style={{ fontSize: '1.1rem' }}>${(precio * cantidad).toFixed(2)}</div>
      </div>
  
      {/* Controles de cantidad */}
      <div className="d-flex align-items-center">
        <button 
          className="btn btn-outline-danger btn-sm me-2"
          onClick={() => cantidad_pedida(imagenSeleccionada, "-")}
        >-</button>
  
        <span className="mx-2">{imagenSeleccionada}</span>
  
        <button 
          className="btn btn-outline-success btn-sm ms-2"
          onClick={() => cantidad_pedida(imagenSeleccionada, "+")}
        >+</button>
      </div>
    </div>
  </div>
  
  );
}




export default Carrito;
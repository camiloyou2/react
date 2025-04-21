import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import './slider.css';
import Swal from 'sweetalert2';

interface GaleriaProps {
    images_array: string[];
  }


 function Item_a_detalle() {
    //const { id } = useParams();
    const location = useLocation();
    const { reviews, images, titulo, descripcion, calificacion, precio ,id} = location.state || {};

   // const [carrito, setCarrito] = useState([]);
    // Función para generar las estrellas
    const [Cantidad, setCantidad] = useState(0);
    //onClick={() => manejarSeleccion(imagen)}
      // Función para manejar el cambio de imagen cuando se selecciona una imagen pequeña
      function cantidad_pedida(index: number, operacion:string) {
         
          if (operacion === "-") {
              // Verificar si el valor de index es mayor que 0 antes de decrementar
              if (index > 0) {
                  setCantidad(index - 1); // Decrementa la cantidad solo si index > 0
              }
          } else {
              setCantidad(index + 1); // Incrementa la cantidad
          }
        }
    function renderEstrellas() {
      const estrellas = [];
      for (let i = 0; i < 5; i++) {
          
        if (i < calificacion) {
          estrellas.push(<span key={i}>&#9733;</span>); // Estrella llena
        } else {
          estrellas.push(<span key={i}>&#9734;</span>); // Estrella vacía
        }
      }
      return estrellas;
    }
   


    const agregarAlCarrito = () => {

        if (Cantidad ==0){
            Swal.fire({
                icon: 'error',
                title: 'Cantidad inválida',
                text: 'Debes agregar al menos una unidad del producto.',
                confirmButtonColor: '#d33',
                timer: 2500,
                showConfirmButton: false,
              });
              return; // Detiene el flujo
        }else{
        const nuevoProducto = {
          id,
          titulo,
          precio,
          Cantidad,
          imagenPrincipal: images[0]
        };
     
// Obtener el carrito actual
const carritoGuardado = JSON.parse(localStorage.getItem("carrito")) || [];

// Buscar si el producto ya está en el carrito
const productoExistente = carritoGuardado.find(p => p.id === nuevoProducto.id);

let carritoActualizado;

if (productoExistente) {
  // Si existe, actualizar la cantidad
  carritoActualizado = carritoGuardado.map(p => {
    if (p.id === nuevoProducto.id) {
      return { ...p, Cantidad: p.Cantidad + nuevoProducto.Cantidad };
    }
    return p;
  });
} else {
  // Si no existe, agregarlo al carrito
  carritoActualizado = [...carritoGuardado, nuevoProducto];
}

// Guardar en localStorage
localStorage.setItem("carrito", JSON.stringify(carritoActualizado));
 
       
// Mostrar alerta de éxito
Swal.fire({
    icon: 'success',
    title: 'Producto agregado',
    text: `${titulo} fue agregado al carrito.`,
    confirmButtonColor: '#3085d6',
    timer: 2500,
    showConfirmButton: false,
  });

}};
    return (
<>
<div className="centrar">
<GaleriaDeImagenes images_array={images} />

        <div className="descripcion_product card shadow-sm" style={{ width: '18rem' }}>
             <div className="card-body">
          {/* Título del producto */}
          <h3 className="card-title text-center">{titulo}</h3>
      
          {/* Descripción del producto */}
          <p className="card-text text-center mb-3">{descripcion}</p>
      
          {/* Estrellas */}
          <div className="estrellas text-center mb-3">
            {renderEstrellas()}
          </div>
      
          {/* Precio por unidad */}
          <p className="text-center mb-1 text-muted" style={{ fontSize: '0.9rem' }}>
            Precio por unidad: <strong>${precio}</strong>
          </p>
      
          {/* Precio total */}
          <label className="d-block text-center mb-3" style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>
            Total: ${(precio * Cantidad).toFixed(2)}
          </label>
      
          {/* Controles de cantidad */}
          <div className="d-flex justify-content-center align-items-center">
            {/* Botón para disminuir cantidad */}
            <button 
              className="btn btn-outline-danger mx-2" 
              onClick={() => cantidad_pedida(Cantidad, "-")}
            >
              -
            </button>
      
            {/* Etiqueta para mostrar la cantidad */}
            <label className="mx-2">{Cantidad}</label>
      
            {/* Botón para aumentar cantidad */}
            <button 
              className="btn btn-outline-success mx-2" 
              onClick={() => cantidad_pedida(Cantidad, "+")}
            >
              +
            </button>
          </div>
          <div className="text-center mt-3">
          <button className="btn btn-primary" onClick={agregarAlCarrito}>
            Agregar al carrito 🛒
          </button>
        </div>
         </div>
      </div>
      </div>
      <ReviewsList reviews={reviews}/>
      </>
    
    
  
      
    );
  }
 
  export const GaleriaDeImagenes= ({ images_array }: GaleriaProps) => {
    // Estado para manejar la imagen seleccionada
    const [imagenSeleccionada, setImagenSeleccionada] = useState(images_array[0]);
  
    // Función para manejar el cambio de imagen cuando se selecciona una imagen pequeña
    function manejarSeleccion(imagen: string) {
      setImagenSeleccionada(imagen);
    }
  
    return (
        <div className="galeria">
        <div className="imagen-grande">
          <img
            src={imagenSeleccionada}
            alt="Imagen Grande"
            className="imagen-grande-img"
          />
        </div>
      
        <div className="imagenes-pequenas">
          {images_array.map((imagen, index) => (
            <div
              key={index}
              className={`imagen-pequena ${imagen === imagenSeleccionada ? 'seleccionada' : ''}`}
              onClick={() => manejarSeleccion(imagen)}
            >
              <img
                src={imagen}
                alt={`Imagen pequeña ${index + 1}`}
                className="imagen-pequena-img"
              />
            </div>
          ))}
        </div>
      </div>
      
    );
  }
  
  export const ReviewsList = ({ reviews }: any) => {
    // Función para renderizar estrellas
    const renderStars = (rating: number) => {
      return '★'.repeat(rating) + '☆'.repeat(5 - rating);
    };
  
    return (
      <div className="reviews-list">
        <h4>Reseñas de usuarios</h4>
        {reviews.length === 0 ? (
          <p>No hay reseñas todavía.</p>
        ) : (
          reviews.map((reviews, index) => (
            <div key={index} className="review-item">
              <div className="review-header">
                <strong>{reviews.reviewerName}</strong> -{' '}
                <span className="review-date">
                  {new Date(reviews.date).toLocaleDateString()}
                </span>
              </div>
              <div className="review-rating">{renderStars(reviews.rating)}</div>
              <p className="review-comment">"{reviews.comment}"</p>
            </div>
          ))
        )}
      </div>
    );
  };
export default Item_a_detalle;
  
import { useContext } from 'react';
import './item.css'; // Asegúrate de importar el archivo CSS
import DataContext from '../context/carrucel.context';
import { useNavigate } from "react-router-dom";

 

// Componente Producto utilizando función tradicional
function Producto() {
  const { productos } = useContext(DataContext);
  const carritoGuardado = JSON.parse(localStorage.getItem("carrito"));
console.log(carritoGuardado); 
  // Función para generar las estrellas
  function renderEstrellas() {
    const estrellas = [];
    for (let i = 0; i < 5; i++) {
        
      if (i < 5) {
        estrellas.push(<span key={i}>&#9733;</span>); // Estrella llena
      } else {
        estrellas.push(<span key={i}>&#9734;</span>); // Estrella vacía
      }
    }
    return estrellas;
  }
  const navigate = useNavigate();
  const Click_navigate = (p:any) => {
 
    navigate(`/producto/${p.id}`, {
      state: {
        id:p.id,
        titulo: p.title,
        descripcion: p.description,
        calificacion: 5,
        precio: p.price,
        images:p.images, 
        reviews:p.reviews

      }
    });
  };
  
  return (
    <>

     {productos.map((p) => (
      
   <button key={p.id} onClick={() => Click_navigate(p)} className="producto-card">
   <div className="card-inner">
     <div className="card-front">
       <img src={p.images[0]} alt={p.title} className="imagen" />
       <div className="info">
         <p className="descripcion">{p.title}</p>
         <div className="estrellas">{renderEstrellas()}</div>
         <p className="precio">${p.price}</p>
       </div>
     </div>
     <div className="card-back">
       <div className="descripcion-larga scrollable-text">{p.description}</div>
     </div>
   </div>
 </button>
 
  ))}
  </>
  );
}




export default Producto;

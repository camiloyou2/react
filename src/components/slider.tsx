import  { useState } from 'react';
import './slider.css';
interface Props {
  imagenes: string[]; // Arreglo de URLs de imágenes
}

function GaleriaDeImagenes(props: Props) {
  // Estado para manejar la imagen seleccionada
  const [imagenSeleccionada, setImagenSeleccionada] = useState(props.imagenes[0]);

  // Función para manejar el cambio de imagen cuando se selecciona una imagen pequeña
  function manejarSeleccion(imagen: string) {
    setImagenSeleccionada(imagen);
  }

  return (
    <div className="galeria">
      <div className="imagen-grande">
        <img src={imagenSeleccionada} alt="Imagen Grande" style={{ width: '100%', height: 'auto' }} />
      </div>
      <div className="imagenes-pequenas">
        {props.imagenes.map((imagen, index) => (
          <div
            key={index}
            className="imagen-pequena"
            onClick={() => manejarSeleccion(imagen)}
            style={{
              display: 'inline-block',
              marginRight: '10px',
              cursor: 'pointer',
              border: imagen === imagenSeleccionada ? '2px solid #000' : '2px solid transparent',
            }}
          >
            <img src={imagen} alt={`Imagen pequeña ${index + 1}`} style={{ width: '80px', height: 'auto' }} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default GaleriaDeImagenes;

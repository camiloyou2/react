import {   useContext, useState } from "react";
import './barra_superior.css';
import Carrito from "./carrito";
import DataContext from "../context/carrucel.context";
import { useNavigate } from "react-router-dom";
function Barra_superio(){
  const [productos, setProductos] = useState<Producto[]>([]);

  // Eliminar un producto cuando la cantidad sea 0
  const eliminarProductoDelCarrito = (id: number) => {
    setProductos(prev => prev.filter(p => p.id !== id));
  };
    const { fetchProductos } = useContext(DataContext);
    const [searchTerm, setSearchTerm] = useState('');
    const [isCartVisible, setIsCartVisible] = useState(false);
 
    const handleChange = (event) => {
      setSearchTerm(event.target.value);

    };

    const objetos_del_carrito = JSON.parse(localStorage.getItem("carrito"));
    const toggleCart = () => {
      setIsCartVisible(!isCartVisible);
     

    };
    const navigate = useNavigate();
    const handleSearch = () => {
        fetchProductos(searchTerm); // Actualiza el contexto con el valor del input
        navigate("/productos");
        // Puedes agregar aquí una llamada a API o lógica de filtrado
      };
     
    return (
        <>
        <header className="header">
        <img
          src="https://www.pinclipart.com/picdir/middle/200-2009010_stalker-clip-art.png"
          alt="Logo"
          className="logo"
        />
  
        <div className="search-container">
          <input
            type="text"
            className="search-input"
            placeholder="Buscar..."
            value={searchTerm}
            onChange={handleChange}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSearch();
              }
            }}
          />
          <button className="search-button"  onClick={handleSearch}>
            <img
              src="https://th.bing.com/th/id/R.0ec03b624adb82239bd12923d2b5c33f?rik=dSNra7weDQ7wIA&pid=ImgRaw&r=0"
              alt="Buscar"
              className="search-icon"
            />
          </button>
        </div>
        <div className="car-login">
        <button className="search-car" onClick={toggleCart}>
            <img src="https://th.bing.com/th/id/R.639c6bd8a7519138f441abae22b496ff?rik=OV6bTpdkivZSHQ&pid=ImgRaw&r=0" 
            alt="carrito" 
           />
           </button>
        </div>
      </header>

      {isCartVisible && (
         <div className="cart-panel">
<div className="contender_para_importar mx-auto p-4 shadow rounded">
    <h4 className="fw-bold mb-4 text-start">PRODUCTOS DEL CONTENEDOR</h4>

    {/* Productos en columna    {producto.precio}
     */}
    {objetos_del_carrito.map((producto, index) => (


       

     

index !== 0 && (
<div key={producto.id} className="d-flex flex-column gap-4 scroll-container">
    <Carrito 
            imagen= {producto.imagenPrincipal}
            titulo={producto.titulo}
            id={producto.id}
         
            cantidad= {producto.Cantidad}
            precio={producto.precio}
            onEliminar={eliminarProductoDelCarrito} // 👈 se pasa al hijo
        />
          </div>
)

))}

  

    <div className="text-center mt-4">
        <button className="btn btn-primary">Ir al contenedor</button>
    </div>
</div>
</div> )}
</>
    );
  }



export default Barra_superio;
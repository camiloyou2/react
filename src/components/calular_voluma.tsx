
import { useState } from 'react';
import './calcular_volumen.css'; 
import Carrito from './carrito';

const formatoMoneda = (valor) =>
  new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    minimumFractionDigits: 0,
  }).format(valor);

const Container = () => {
  const [productos, setProductos] = useState([]);
  const objetos_del_carrito = JSON.parse(localStorage.getItem("carrito")) || [];

  let totalCantidad = 0;
  let totalPrecio = 0;

  // Calcular el total de cantidad y total de precio de los productos del carrito
  objetos_del_carrito.forEach((producto) => {
    const cantidad = producto.Cantidad || 0;
    const precio = producto.precio || 0;

    totalCantidad += cantidad;
    totalPrecio += cantidad * precio;
  });

  // Cálculo de costos dinámicos basados en los productos del carrito
  const costosCalculados = [
    { nombre: "Costo de importación", valor: totalPrecio * 0.15 },  // 15% del total de los productos
    { nombre: "Costo del flete", valor: totalCantidad * 50 },        // 50 por unidad
    { nombre: "Cargos de documentación", valor: 85 },
    { nombre: "Seguro de carga", valor: totalPrecio * 0.02 },         // 2% del total de productos
    { nombre: "Transporte terrestre", valor: 200 },
    { nombre: "Costo por manipulación", valor: totalCantidad * 5 },   // 5 por unidad
    { nombre: "IVA", valor: totalPrecio * 0.19 },                     // 19% del total de productos
    { nombre: "Aranceles", valor: totalPrecio * 0.1 },                // 10% del total de productos
    { nombre: "Agencia de aduanas", valor: 90 },
    { nombre: "Comisión", valor: totalPrecio * 0.05 },                // 5% del total de productos
  ];

  // Sumar el total de todos los costos
  const totalCostos = costosCalculados.reduce((acc, item) => acc + item.valor, 0);

  // Función para eliminar productos del carrito
  const eliminarProductoDelCarrito = (id) => {
    setProductos(prev => prev.filter(p => p.id !== id));
  };

  return (
    <div className='seccion'>
      <div className='c_container'>
        <div className="contender_para_importar mx-auto p-4 shadow rounded">
          <h4 className="fw-bold mb-4 text-start">PRODUCTOS DEL CONTENEDOR</h4>
          {objetos_del_carrito.map((producto, index) => (
            index !== 0 && (
              <div key={producto.id} className="d-flex flex-column gap-4 scroll-container">
                <Carrito 
                  imagen={producto.imagenPrincipal}
                  titulo={producto.titulo}
                  id={producto.id}
                  cantidad={producto.Cantidad}
                  precio={producto.precio}
                  onEliminar={eliminarProductoDelCarrito} // 👈 se pasa al hijo
                />
              </div>
            )
          ))}
        </div>
      </div>

      {/* Mostrar los costos calculados */}
      <div className="cuadro-costos">
        <h3>🧾 Costos de Importación</h3>
        <ul>
          {costosCalculados.map((item, index) => (
            <li key={index}>
              <span className="nombre">{item.nombre}</span>
              <span className="valor">{formatoMoneda(item.valor)}</span>
            </li>
          ))}
          <li className="total">
            <span className="nombre">Total estimado</span>
            <span className="valor">{formatoMoneda(totalCostos)}</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Container;

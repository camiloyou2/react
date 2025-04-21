
import './calcular_volumen.css'; 


const costos = [
  { nombre: "Costo de importación", valor: 1200 },
  { nombre: "Costo del flete", valor: 450 },
  { nombre: "Cargos de documentación", valor: 85 },
  { nombre: "Seguro de carga", valor: 60 },
  { nombre: "Transporte terrestre", valor: 200 },
  { nombre: "Costo por manipulación", valor: 30 },
  { nombre: "IVA", valor: 275 },
  { nombre: "Aranceles", valor: 150 },
  { nombre: "Agencia de aduanas", valor: 90 },
  { nombre: "Comisión", valor: 50 },
];

const formatoMoneda = (valor) =>
  new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    minimumFractionDigits: 0,
  }).format(valor);

const Container = () => {
  const total = costos.reduce((acc, item) => acc + item.valor, 0);

  return (
    <div className="cuadro-costos">
      <h3>🧾 Costos de Importación</h3>
      <ul>
        {costos.map((item, index) => (
          <li key={index}>
            <span className="nombre">{item.nombre}</span>
            <span className="valor">{formatoMoneda(item.valor)}</span>
          </li>
        ))}
        <li className="total">
          <span className="nombre">Total estimado</span>
          <span className="valor">{formatoMoneda(total)}</span>
        </li>
      </ul>
    </div>
  );
};

export default Container;

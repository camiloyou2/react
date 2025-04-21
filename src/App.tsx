//import Titulo , {Cartbody} from './example'
import Producto  from './components/item'
import Item_a_detalle from './components/especiificos'

import 'bootstrap/dist/css/bootstrap.min.css'
import Barra_superio from './components/barra_superior'
import './App.css';
import   {  DataProvider } from './context/carrucel.context';
import { Route, Routes } from 'react-router-dom';
import { useEffect } from 'react';
import Container from './components/calular_voluma';


function App() {
    useEffect(() => {
    // Solo lo guarda si aún no existe
    if (!localStorage.getItem("carrito")) {
      const carritoInicial =  [{  }];
      localStorage.setItem("carrito", JSON.stringify(carritoInicial));
      console.log("🛒 Carrito creado en localStorage");
    }
  }, []); // ← El array 



  const carritoGuardado = JSON.parse(localStorage.getItem("carrito"));
  console.log(carritoGuardado); 

  // Array de productos

  


 return (
  <>

<DataProvider>



  <Barra_superio></Barra_superio>
  
  

  <Routes>

  <Route
  path="/container"

  element={
    
<Container></Container>



  }
  />
        <Route
          path="/producto/:id"
          element={
            <div >
         <Item_a_detalle />
        
</div>

          }
        />

<Route
          path="/productos"
          element={
            <div className='contenedor'>
    <div className='productos-container'>
    <Producto/>
      </div>
      </div>
            
          }
        />
      </Routes>


       
      

      </DataProvider>

    </>


  );
}

export default App

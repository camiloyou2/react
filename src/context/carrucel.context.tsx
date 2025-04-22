import  { createContext, useState, ReactNode } from "react";

// Define la forma de los datos que esperas de la API
export interface Producto {
  
    id: number;
    title: string;
    description: string;
    category: string;
    price: number;
    discountPercentage: number;
    rating: number;
    stock: number;
    tags: string[];
    brand: string;
    sku: string;
    weight: number;
    dimensions: {
      width: number;
      height: number;
      depth: number;
    };
    warrantyInformation: string;
    shippingInformation: string;
    availabilityStatus: string;
    reviews: {
      rating: number;
      comment: string;
      date: string; // Puede ser `Date` si lo parseas
      reviewerName: string;
      reviewerEmail: string;
    }[];
    returnPolicy: string;
    minimumOrderQuantity: number;
    meta: {
      createdAt: string; // o Date
      updatedAt: string; // o Date
      barcode: string;
      qrCode: string;
    };
    images: string[];
    thumbnail: string;
  }
  

// Define la forma del contexto
interface DataContextType {
  productos: Producto[];
  loading: boolean;
  fetchProductos: (query: string) => void;
}

// Crea el contexto con valores por defecto
const DataContext = createContext<DataContextType>({
  productos: [],
  loading: false,
  fetchProductos: () => {},
});

// Tipado de props del Provider
interface DataProviderProps {
  children: ReactNode;
}

export const DataProvider = ({ children }: DataProviderProps) => {
  const [productos, setProductos] = useState<Producto[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  // Función para obtener datos de la API
  const fetchProductos = async (query: string) => {
    console.log(query)
    if (!query.trim()) return;

    setLoading(true);
    try {
       
      const response = await fetch(`https://dummyjson.com/products/search?q=${query}`);
      const data = await response.json();
      setProductos(data.products); // Asumiendo que la API devuelve un array bajo `products`
    } catch (error) {
      console.error("Error al obtener productos:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <DataContext.Provider value={{ productos, loading, fetchProductos }}>
      {children}
    </DataContext.Provider>
  );
};

export default DataContext;

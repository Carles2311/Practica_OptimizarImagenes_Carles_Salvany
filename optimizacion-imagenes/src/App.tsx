import { lazy, Suspense } from "react"; 
import { Routes, Route } from "react-router-dom";
const Home = lazy(() => import("./components/Home")); 
const Ejercicio1 = lazy(() => import("./components/Ejercicio1")); 
const Ejercicio2 = lazy(() => import("./components/Ejercicio2")); 
const Ejercicio3 = lazy(() => import("./components/Ejercicio3")); 
const Ejercicio4 = lazy(() => import("./components/Ejercicio4")); 

function App() { 
return ( 
<Suspense fallback={<div>Cargando...</div>}> 
<Routes> 
<Route path="/" element={<Home />} /> 
<Route path="/ejercicio1" element={<Ejercicio1 />} /> 
<Route path="/ejercicio2" element={<Ejercicio2 />} /> 
<Route path="/ejercicio3" element={<Ejercicio3 />} /> 
<Route path="/ejercicio4" element={<Ejercicio4 />} /> 

</Routes> 
</Suspense> 
); 
} 
export default App;
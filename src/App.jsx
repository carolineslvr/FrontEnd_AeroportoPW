import { createBrowserRouter, RouterProvider } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css'
import '@popperjs/core/dist/cjs/popper.js'
import 'bootstrap/dist/js/bootstrap.min.js'
import 'bootstrap-icons/font/bootstrap-icons.css'
import Home from './componentes/telas/Home'
import CompanhiaAerea from "./componentes/telas/companhiaAerea/CompanhiaAerea"
import Piloto from "./componentes/telas/piloto/Piloto";
import Voo from "./componentes/telas/voo/Voo";
import './css/pagina.css';
import Login from "./componentes/telas/login/Login";
import MenuPublico from "./componentes/MenuPublico";
import MenuPrivado from "./componentes/MenuPrivado";

const router = createBrowserRouter([
  {
    path : "/",
     element : <MenuPublico/>,
    children : [
      {
        index : true,
        element : <Home/>
      },
      ,
      {
        path : "login",
        element : <Login/>
      }
    ]
  },
  {
    path : "/privado",
    element : <MenuPrivado/>,
    children : [
      {
        index : true,
        element : <Home/>
      },
      {
        path : "companhiasaereas",
        element : <CompanhiaAerea/>
      },
      {
        path : "pilotos",
        element : <Piloto/>
      },
      {
        path : "voos",
        element : <Voo/>
      }
    ]
  }
])
   
function App() {
  return (
    <RouterProvider router={router}/>
  );
}

export default App;

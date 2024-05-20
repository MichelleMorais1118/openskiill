import { useEffect } from "react";
import {Routes, Route, useNavigate} from "react-router-dom";
import { ToastContainer } from "react-toastify";
import {onAuthStateChanged} from "firebase/auth";
import { RoutesPaths } from "./models/enums/routesPath";
import Login from "./pages/Login";
import Home from "./pages/Home";
import { auth } from "./firebase/firebaseConnection";

function App() {
  const navigate = useNavigate();

  const checkLogin = ( ) => {
    onAuthStateChanged(auth, (user)=> {
      if(user){
        navigate(RoutesPaths.Home);
      } else {
        navigate(RoutesPaths.Login);
      }
    });
  };
    //renderiza a tela a primeira vez e chama a função
    useEffect(()=>{
      checkLogin();
    },[]);

  return (
    <>
      <Routes>
        <Route path={RoutesPaths.Login} element ={<Login />} />
        <Route path={RoutesPaths.Home} element ={<Home />} />
      </Routes>
      <ToastContainer 
      position="top-right"
      autoClose={3500}
      closeOnClick
      pauseOnFocusLoss
      pauseOnHover
      draggable
      theme="colored"
      />
    </>
  )
}

export default App;
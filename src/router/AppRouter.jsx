import { onLogin } from "../store/auth/authSlice";
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

import { CheckingAuth } from '../ui/';
import { AuthRoutes } from '../auth/routes/AuthRoutes';
import { useAuthStore } from '../hook/useAuthStore';
import { PaymentPage, TraductorPage, UsersPage, AdminPage } from '../traductor/pages';
import { EmpresaPage } from "../traductor/pages/EmpresaPage";
import { EditarCliente } from "../traductor/pages/Cliente/EditarCliente";


export const AppRouter = () => {
  const dispatch = useDispatch();
  const {status} = useAuthStore();

  if(status === 'checking'){
    return <CheckingAuth/>;
  };

  useEffect(() => {
    if(localStorage.getItem('token') !== null){
      dispatch(onLogin({name: localStorage.getItem('name'), id: localStorage.getItem('uid'), rol: localStorage.getItem('rol')}));
    };
  }, []);

  const rol = localStorage.getItem('rol');
  let path = '';
  if(rol === 'ADMIN'){
    path = "/admin"
  }else if( rol === 'EMPRESA'){
    path = "/empresa"
  }else if( rol === 'CLIENTE'){
    path = "/cliente"
  }

  return (
    <Routes>
      {
        ( status === 'not-authenticated' && localStorage.getItem('token') === null)  
          ? (
              <>
                <Route path="/auth/*" element={ <AuthRoutes /> } />
                <Route path="/*" element={ <Navigate to="/auth/login" /> } />
              </>
          )
          : (
              <>
                <Route path="/cliente" element={ <TraductorPage /> } />
                <Route path="/admin" element={ <AdminPage /> } />
                <Route path="/empresa" element={ <EmpresaPage /> } />
                <Route path="/users" element={ <UsersPage /> } />
                <Route path="/payment" element={ <PaymentPage /> } />
                <Route path="/editar/cliente" element={ <EditarCliente /> } />
                <Route path="/" element={ <Navigate to={path} /> } />
              </>
          )
      }
    </Routes>
  )
}

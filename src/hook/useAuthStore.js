import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import traslateApi from "../api/traslateApi";
import { clearErrorMessage, onChecking, onLogin, onLogout } from "../store/auth/authSlice";

export const useAuthStore = () => {

    const {status, user, errorMessage} = useSelector(state => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const startLogin = async({correo_electronico, password_user}) =>{
        // dispatch(onChecking());
        try {
            // console.log({correo,password});
            const {data} = await traslateApi.post('/auth/login',{correo_electronico,password_user});
            localStorage.setItem('token', data.token);
            localStorage.setItem('token-init-date', new Date().getTime());
            if(data.empresaData !== undefined){
                localStorage.setItem('name', data.empresaData.nombre_empresa);
                localStorage.setItem('uid', data.empresaData.uid);
                localStorage.setItem('rol', data.empresaData.rol_user);
           
                dispatch(onLogin({name: data.empresaData.nombre_empresa, id: data.empresaData.uid, rol: data.empresaData.rol_user}));

                navigate('/empresa')
            }else if(data.usuarioData !== undefined){
                console.log('Entre')
                localStorage.setItem('name', data.usuarioData.fullname);
                localStorage.setItem('uid', data.usuarioData.uid);
                localStorage.setItem('rol', data.usuarioData.rol_user);

                dispatch(onLogin({name: data.usuarioData.fullname, id: data.usuarioData.uid, rol: data.usuarioData.rol_user}));
    
                if(data.usuarioData.rol_user === 'ADMIN'){
                    navigate('/admin')
                }else if(data.usuarioData.rol_user  === 'CLIENTE'){
                    navigate('/cliente');
                }
            }
        } catch (error) {
            console.log(error);
            dispatch(onLogout('Credenciales incorrectas'));
            setTimeout(()=>{
                dispatch(clearErrorMessage());
            },2)
        }
    }

    const startRegister = async({nombre_empresa, correo_electronico, password_user, confirmPassword, direccion, ciudad, tipo_entidad, nit, cantidad_usuarios}) => {
        dispatch(onChecking());
        try {
            const {data} = await traslateApi.post('/empresa',{nombre_empresa,correo_electronico,password_user,confirmPassword, direccion, ciudad, tipo_entidad, nit, cantidad_usuarios});
            dispatch(onLogout(data.mensaje));
            navigate('/');
        } catch (error) {
            console.log(error);
            dispatch(onLogout(error.response.data?.msg || 'Error al registrar Empresa'));
            setTimeout(()=>{
                dispatch(clearErrorMessage());
            },5)
        }
    }

    // const checkAuthToken = async ()=>{
    //     const token = localStorage.getItem('token');
    //     if(!token) return dispatch(onLogout());
    //     try {
    //         const {data} = await traslateApi.get('/auth/renew');
    //         console.log(data);
    //         localStorage.setItem('token',data.token);
    //         localStorage.setItem('token-init-date', new Date().getTime());
    //         dispatch(onLogin({name: data.name, id: data.id}));

    //     } catch (error) {
    //         localStorage.clear();
    //         dispatch(onLogout());
    //         setTimeout(()=>{
    //             dispatch(clearErrorMessage());
    //         },10)
    //     }
    // }

    const startLogout = ()=>{
        localStorage.clear();
        dispatch(onLogout());
    }
    
    return {
        // Propiedades
        status,
        user,
        errorMessage,
        // Metodos
        startLogin,
        startRegister,
        // checkAuthToken,
        startLogout
    }
}
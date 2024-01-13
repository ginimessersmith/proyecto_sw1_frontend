import { useMemo, useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import { AuthLayout } from "../layout/AuthLayout";
import { useForm } from "../../hook";

import { Button, Grid, Link, TextField, Typography, Divider } from "@mui/material";
import { useAuthStore } from "../../hook/useAuthStore";

const formData = {
  nombre_empresa: '',
  correo_electronico: '',
  password_user: '',
  confirmPassword: '',
  direccion: '',
  ciudad: '',
  tipo_entidad: '',
  nit: '',
  cantidad_usuarios: '',
}

const formValidations = {
  correo_electronico: [(value) => value.includes('@'), 'El correo debe tener una @'],
  password_user: [(value) => value.length >= 6, 'La contraseña debe tener al menos 6 caracteres'],
  confirmPassword: [(value) => value.length >= 6, 'La contraseña debe tener al menos 6 caracteres'],
  nombre_empresa: [(value) => value.length >= 1, 'El nombre de la empresa es obligatorio'],
  direccion: [(value) => value.length >= 1, 'La dirección es obligatoria'],
  ciudad: [(value) => value.length >= 1, 'La ciudad es obligatoria'],
  tipo_entidad: [(value) => value.length >= 1, 'El tipo de entidad es obligatorio'],
  nit: [(value) => value.length >= 1, 'El NIT es obligatorio'],
  cantidad_usuarios: [(value) => /^\d+$/.test(value), 'La cantidad de usuarios debe ser un número'],
}

export const RegisterPage = () => {
  const [formSubmitted, setformSubmitted] = useState(false);
  const [passwordsMatch, setPasswordMatch] = useState(true);

  const {errorMessage,startRegister,status} = useAuthStore();
  const isCheckingAuthentication = useMemo(() => status === 'checking', [status]);

  const {nombre_empresa ,correo_electronico, password_user, confirmPassword, direccion, ciudad, tipo_entidad, nit, cantidad_usuarios, onInputChange, 
    isFormValid, nombre_empresaValid, correo_electronicoValid,password_userValid, confirmPasswordValid, direccionValid, ciudadValid, tipo_entidadValid, nitValid, cantidad_usuariosValid} = useForm(formData, formValidations);
  
  const onSubmit = (event) => {
    event.preventDefault();
    setformSubmitted(true);
    if(!isFormValid) return;
    if(password_user !== confirmPassword){
      console.log('Holi')
      setPasswordMatch(false);
      return;
    };
    setPasswordMatch(true);
    startRegister({nombre_empresa, correo_electronico,password_user, confirmPassword, direccion, ciudad, tipo_entidad, nit, cantidad_usuarios});
  }

  return (
    <AuthLayout title="Register">

      <form 
      className="animate__animated animate__fadeIn animate__faster"
      onSubmit={onSubmit}>
        <Grid container spacing={2}>
          {/* Columna de la izquierda */}
          <Grid container item md={5.7} lg={5} direction="row">
            <Grid item xs={12} sx={{ mt: 2 }}>
              <TextField
                label="Nombre Empresa"
                type="text"
                placeholder="Mi Empresa"
                fullWidth
                name="nombre_empresa"
                value={nombre_empresa}
                onChange={onInputChange}
                error={!!nombre_empresaValid && formSubmitted}
                helperText={nombre_empresaValid}
                sx={{ height: '65px' }}
              />
            </Grid>

            <Grid item xs={12} sx={{ mt: 2 }}>
              <TextField
                label="Direccion"
                type="text"
                placeholder="Direccion: Av/..."
                fullWidth
                name="direccion"
                value={direccion}
                onChange={onInputChange}
                error={!!direccionValid && formSubmitted}
                helperText={direccionValid}
                sx={{ height: '65px' }}
              />
            </Grid>

            <Grid item xs={12} sx={{mt:2}}>
              <TextField label="Ciudad" 
                type="text" 
                placeholder="Ciudad" 
                fullWidth name="ciudad" 
                value={ciudad} 
                onChange={onInputChange}
                error={!!ciudadValid && formSubmitted}
                helperText={ciudadValid}
                sx={{ height: '65px' }}
              />
            </Grid>

            <Grid item xs={12} sx={{mt:2}}>
              <TextField label="Cantidad Usuarios" 
                type="number" 
                placeholder="Cantidad de Usuarios" 
                fullWidth name="cantidad_usuarios" 
                value={cantidad_usuarios} 
                onChange={onInputChange}
                error={!!cantidad_usuariosValid && formSubmitted}
                helperText={cantidad_usuariosValid}
                sx={{ height: '65px' }}
              />
            </Grid>


            {/* ... Otros campos de la columna izquierda ... */}
          </Grid>

          <Grid item md={false} lg={2}>
            <Divider color="black" orientation="vertical" sx={{ height: '100%' }} />
          </Grid>

          {/* Columna de la derecha */}
          <Grid container item md={5.7} lg={5} direction="row">
            
            <Grid item xs={12} sx={{mt:2}}>
              <TextField label="tipo_entidad" 
                type="text" 
                placeholder="Tipo Entidad" 
                fullWidth name="tipo_entidad" 
                value={tipo_entidad} 
                onChange={onInputChange}
                error={!!tipo_entidadValid && formSubmitted}
                helperText={tipo_entidadValid}
                sx={{ height: '80px' }}
              />
            </Grid>

            <Grid item xs={12} sx={{ mt: 2 }}>
              <TextField
                label="Correo de la Empresa"
                type="text"
                placeholder="Mi Correo Empresa"
                fullWidth
                name="correo_electronico"
                value={correo_electronico}
                onChange={onInputChange}
                error={!!correo_electronicoValid && formSubmitted}
                helperText={correo_electronicoValid}
                sx={{ height: '80px' }}
              />
            </Grid>

            <Grid item xs={12} sx={{ mt: 2 }}>
              <TextField
                label="Contraseña"
                type="password"
                placeholder="Contraseña"
                fullWidth
                name="password_user"
                value={password_user}
                onChange={onInputChange}
                error={!!password_userValid && formSubmitted}
                helperText={password_userValid}
                sx={{ height: '80px' }}
              />
            </Grid>

            <Grid item xs={12} sx={{ mt: 2 }}>
              <TextField
                label="Repetir Contraseña"
                type="password"
                placeholder="Repetir Contraseña"
                fullWidth
                name="confirmPassword"
                value={confirmPassword}
                onChange={onInputChange}
                error={(formSubmitted && !passwordsMatch) || (!!confirmPasswordValid && formSubmitted)}
                helperText={
                  (formSubmitted && !passwordsMatch) ? 'Las contraseñas no coinciden' : confirmPasswordValid
                }
                sx={{ height: '80px' }}
              />
            </Grid>
          </Grid>
          
          <Grid item xs={12}>
            <TextField label="NIT" 
              type="number" 
              placeholder="123456..." 
              fullWidth name="nit" 
              value={nit} 
              onChange={onInputChange}
              error={!!nitValid && formSubmitted}
              helperText={nitValid}/>
          </Grid>

          <Grid item xs={12} sx={{mb:2}}>
              <Button variant="contained"  type="submit" disabled={isCheckingAuthentication}>
                Crear Cuenta
              </Button>
          </Grid>

          <Grid container direction='row' justifyContent='end'>
            <Typography sx={{mr:1}}>Ya tienes cuenta?</Typography>
            <Link component={RouterLink} color="inherit" to="/auth">
              Ingresar
            </Link>
          </Grid>

        </Grid>
      </form>
    </AuthLayout>
  )
}

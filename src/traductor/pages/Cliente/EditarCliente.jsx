import { useState } from "react";
import { Link as RouterLink, useLocation, useNavigate } from "react-router-dom";
import { AuthLayout } from "../../../auth/layout/AuthLayout";
import { useForm } from "../../../hook";

import { Button, Grid, TextField, Divider } from "@mui/material";
import traslateApi from "../../../api/traslateApi";

const formData = {
  fullname: '',
  correo_electronico: '',
  password_user: '',
  confirmPassword: '',
  uid_empresa: '',
  uid_lenguas_iso: '',
  uid_contacto: '',
}

const formValidations = {
  correo_electronico: [(value) => value.includes('@'), 'El correo debe tener una @'],
  password_user: [(value) => value.length >= 6, 'La contraseña debe tener al menos 6 caracteres'],
  confirmPassword: [(value) => value.length >= 6, 'La contraseña debe tener al menos 6 caracteres'],
  fullname: [(value) => value.length >= 1, 'El nombre es obligatorio'],
  uid_empresa: [(value) => value.length >= 1, 'Se debe añadir el id empresa'],
  uid_lenguas_iso: [(value) => value.length >= 1, 'Se debe añadir el id del lenguaje'],
}

export const EditarCliente = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { rowData } = location.state || {}; 
    // console.log(rowData);
    const [formSubmitted, setformSubmitted] = useState(false);
    const [passwordsMatch, setPasswordMatch] = useState(true);

    const {fullname ,correo_electronico, password_user, confirmPassword, uid_empresa, uid_lenguas_iso, uid_contacto, onInputChange, 
        isFormValid, fullnameValid, correo_electronicoValid,password_userValid, confirmPasswordValid, uid_empresaValid, uid_lenguas_isoValid, formState} = useForm(formData, formValidations);
    
    const onSubmit = async (event) => {
        event.preventDefault();
        setformSubmitted(true);
        if(!isFormValid) return;
        if(password_user !== confirmPassword){
            setPasswordMatch(false);
        return;
        };
        try {
            await traslateApi.put(`/users/${rowData.uid}`, formData);
            navigate(-1)
        } catch (error) {
            console.log(error);
        }
        
    }

    return (
        <AuthLayout title="Editar Cliente">

        <form 
        className="animate__animated animate__fadeIn animate__faster"
        onSubmit={onSubmit}>
            <Grid container spacing={2}>
            {/* Columna de la izquierda */}
            <Grid container item md={5.7} lg={5} direction="row">
                <Grid item xs={12} sx={{ mt: 2 }}>
                <TextField
                    label="Nombre Completp"
                    type="text"
                    placeholder="Mi Nombre"
                    fullWidth
                    name="fullname"
                    value={fullname}
                    onChange={onInputChange}
                    error={!!fullnameValid && formSubmitted}
                    helperText={fullnameValid}
                    sx={{ height: '65px' }}
                />
                </Grid>

                <Grid item xs={12} sx={{ mt: 2 }}>
                <TextField
                    label="ID empresa"
                    type="text"
                    placeholder="Mi empresa ID"
                    fullWidth
                    name="uid_empresa"
                    value={uid_empresa}
                    onChange={onInputChange}
                    error={!!uid_empresaValid && formSubmitted}
                    helperText={uid_empresaValid}
                    sx={{ height: '85px' }}
                />
                </Grid>

                <Grid item xs={12} sx={{mt:2}}>
                <TextField label="Id lenguas" 
                    type="text" 
                    placeholder="Mi lenguaje ID" 
                    fullWidth name="uid_lenguas_iso" 
                    value={uid_lenguas_iso} 
                    onChange={onInputChange}
                    error={!!uid_lenguas_isoValid && formSubmitted}
                    helperText={uid_lenguas_isoValid}
                    sx={{ height: '85px' }}
                />
                </Grid>

                <Grid item xs={12} sx={{mt:2}}>
                <TextField label="ID contacto" 
                    type="number" 
                    placeholder="Mi contacto ID "
                    fullWidth name="uid_contacto" 
                    value={uid_contacto} 
                    onChange={onInputChange}
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
            
                <Grid item xs={12} sx={{ mt: 2 }}>
                <TextField
                    label="Correo del Usuario"
                    type="text"
                    placeholder="Mi Correo"
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

            <Grid item xs={12} sx={{mb:2}}>
                <Button variant="contained"  type="submit">
                    Modificar Usuario
                </Button>
            </Grid>

            </Grid>
        </form>
        </AuthLayout>
    )
}

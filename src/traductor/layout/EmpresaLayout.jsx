
import React, { useState } from 'react'
import { Link as RouterLink, useNavigate } from 'react-router-dom';

import { AppBar, IconButton, Toolbar, Typography, Link, } from '@mui/material'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

import { useAuthStore } from '../../hook/useAuthStore';
import { useTheme } from '@emotion/react';
import { NavegationMenuEmpresa } from '../components/Navegation/NavegationMenuEmpresa';

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Storefront } from '@mui/icons-material';

export const EmpresaLayout = ({children, onNavegationItemClick}) => {

    const navigate = useNavigate();
    const theme = useTheme();

    const { startLogout , user} = useAuthStore();
    const [openDialog, setOpenDialog] = useState(false);

    const handleNavegationItemClick = (selectedOption) => {
        onNavegationItemClick(selectedOption)
    };

    const handleClickLogout = () => {
        setOpenDialog(true);
    };

    const handleClick = () => {
        navigate('/payment')
    };

    return (
        <div style={{ display: 'flex', height: '100vh' }}>
        {/* Menú de navegación a la izquierda */}
        <NavegationMenuEmpresa onNavegationItemClick={handleNavegationItemClick}/>

            {/* Contenido principal */}
            <div style={{ flexGrow: 1, overflowY: 'auto'  }}>
                <AppBar position="static">
                <Toolbar>
                    {/* Elementos a la izquierda */}
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    <Link component={RouterLink} color="inherit" to="/eventos" underline="none">
                        EventosIA
                    </Link>
                    </Typography>

                    {/* Elementos a la derecha */}
                    <IconButton size="small" edge="start" aria-label="icono de compra" onClick={handleClick}>
                        <Storefront sx={{ color: theme.palette.secondary.main }} />
                    </IconButton>

                    <IconButton size="large" edge="start" color="inherit" aria-label="icono de usuario">
                    <AccountCircleIcon />
                    </IconButton>

                    {/* Otros elementos a la derecha, como texto del perfil */}
                    <Typography
                    variant="body1"
                    color="inherit"
                    component="div"
                    onClick={handleClickLogout}
                    sx={{ cursor: 'pointer' }}
                    >
                    Cerrar Sesión
                    </Typography>
                </Toolbar>
                </AppBar>

                {/* Contenido principal */}
                <div style={{ padding: '20px' }}>
                    {children}
                </div>
                
            </div>
            <Dialog
                open={openDialog}
                onClose={() => setOpenDialog(false)}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{"Cerrar Sesión"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                    ¿Estás seguro de que quieres cerrar sesión?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                <Button onClick={() => setOpenDialog(false)} color="primary" style={{color: theme.palette.info.main}}>
                    Cancelar
                </Button>
                <Button onClick={startLogout} style={{color: theme.palette.error.main}} autoFocus >
                    Sí, cerrar sesión
                </Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}



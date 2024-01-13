
import React, { useState } from 'react'
import { Link as RouterLink } from 'react-router-dom';

import { AppBar, IconButton, Toolbar, Typography, Link, } from '@mui/material'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import { useAuthStore } from '../../hook/useAuthStore';
import { useTheme } from '@emotion/react';
import { NavegationMenu } from '../components/Navegation/NavegationMenu';

export const AdminLayout = ({children, onNavegationItemClick}) => {

    const theme = useTheme();

    const { startLogout , user} = useAuthStore();
    const [openDialog, setOpenDialog] = useState(false);

    const handleNavegationItemClick = (selectedOption) => {
        onNavegationItemClick(selectedOption)
    };

    const handleClickLogout = () => {
        setOpenDialog(true);
    };
    return (
        <div style={{ display: 'flex', height: '100vh' }}>
        {/* Menú de navegación a la izquierda */}
        <NavegationMenu onNavegationItemClick={handleNavegationItemClick}/>
            {/* Contenido principal */}
            <div style={{ flexGrow: 1, overflowY: 'auto' }}>
                <AppBar position="static">
                <Toolbar>
                    {/* Elementos a la izquierda */}
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    <Link component={RouterLink} color="inherit" to="/eventos" underline="none">
                        EventosIA
                    </Link>
                    </Typography>

                    {/* Elementos a la derecha */}

                    <IconButton size="small" edge="start" color="inherit" aria-label="icono de usuario">
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
                <Button onClick={() => setOpenDialog(false)} style={{color: theme.palette.info.main}}>
                    Cancelar
                </Button>
                <Button onClick={startLogout} style={{color: theme.palette.error.main}} autoFocus>
                    Sí, cerrar sesión
                </Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}



{/* <>
<div style={{ marginLeft: 180, transition: 'margin-right 0.3s' }}>
    <AppBar position="static">
        <Toolbar>
            {/* Elementos a la izquierda
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                <Link component={ RouterLink } color='inherit' to='/eventos' underline='none'>
                EventosIA
                </Link>
            </Typography>

            {/* Elementos a la derecha 
            <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="icono de usuario"
            >
                <AccountCircleIcon />
            </IconButton>
            
            {/* Otros elementos a la derecha, como texto del perfil 
            <Typography 
            variant="body1" 
            color="inherit"
            component="div"
            aria-describedby={id}
            onClick={handleClick}
            sx={{cursor: 'pointer'}}
            >
            Perfil
            </Typography>
            <Popover
            id={id}
            open={open}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
            }}
            transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
            }}
            sx={{ marginTop: '20px', marginLeft: '15px' }}  // Ajusta el marginTop según la altura de la AppBar
            >
            <MenuItem onClick={startLogout}>Cerrar Sesión</MenuItem>
            {/* Agrega más elementos del menú según tus necesidades 
            </Popover>
        </Toolbar>
    </AppBar>
</div>

{/* Contenido principal 
<div style={{ marginLeft:  180, transition: 'margin-left 0.3s' }}>
    {children}
</div>

<List sx={{width: '240px', height: '100vh', backgroundColor: theme.palette.text.grayCeniza}}>
    <ListItem component={RouterLink} to="/dashboard" sx={{color: 'black'}}>
        <ListItemText>
        <Typography variant="inherit">Dashboard</Typography>
        </ListItemText>
    </ListItem>
    <Divider />
    <ListItem component={RouterLink} to="/user-management" sx={{color: 'black'}}>
        <ListItemText>
        <Typography variant="inherit">Gestión de Usuarios</Typography>
        </ListItemText>
    </ListItem>
    <Divider />
</List> 
</> */}
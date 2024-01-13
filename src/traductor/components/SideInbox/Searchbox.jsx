import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import { LogoutOutlined, AddCircleOutline } from "@mui/icons-material"
import { IconButton, useTheme, Paper, Typography, Grid, List, ListItem, ListItemText } from "@mui/material"
import { useAuthStore } from "../../../hook/useAuthStore"

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import traslateApi from "../../../api/traslateApi";

export const Searchbox = () => {
    const navigate = useNavigate();
    const theme = useTheme();
    const { startLogout , user} = useAuthStore();
    const [openDialog, setOpenDialog] = useState(false);
    const [open, setOpen] = useState(false);
    const [chats, setChats] = useState([]);

    const [clientes, setCliente] = useState([]);

    const handleClickLogout = () => {
        setOpenDialog(true);
    }

    const handleClickAddChat = async () => {
        setOpen(true);
        const {data} = await traslateApi.get('/users',{
            headers: {
                'x-token': localStorage.getItem('token'),
                // Otros encabezados según sea necesario
            },
        })
        setCliente(data.listaClientes);

    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleUserSelect = async (selectedUser) => {
        // Lógica para añadir el usuario al chat
        console.log("Usuario seleccionado:", selectedUser);
        // Aquí puedes realizar la lógica para añadir el usuario al chat
        // Por ejemplo, puedes enviar una solicitud al servidor para agregar el usuario al chat
        // También puedes cerrar el cuadro de diálogo después de seleccionar un usuario
        try {
            await traslateApi.post(`/chat`,{
                id_socket: 'abd123',
                uid_usuario_emisor: localStorage.getItem('uid'),
                uid_usuario_receptor: selectedUser.uid
            },{
                headers: {
                    'x-token': localStorage.getItem('token'),
                    // Otros encabezados según sea necesario
                },
            });

            const updatedChats = await obtenerChats(); // Debes implementar la función para obtener la lista actualizada de chats
            setChats(updatedChats);
            handleClose();
        } catch (error) {
            console.error("Error al añadir usuario al chat:", error);
        }
        
    };
    
    useEffect(() => {
        // Aquí puedes realizar acciones después de actualizar el estado de los chats
        console.log("Chats actualizados:", chats);
    }, [chats]);

    const obtenerChats = async () => {
        // Implementa la lógica para obtener la lista actualizada de chats
        // Puedes usar traslateApi.get o cualquier método necesario para obtener la información de los chats
        // Retorna la lista actualizada de chats
        const {data} = await traslateApi.get('/users',{
            headers: {
                'x-token': localStorage.getItem('token'),
                // Otros encabezados según sea necesario
            },
        })
        return data;
    };

    return (
        <>
            <Paper className="headind_srch">
                <Grid container alignItems="center">
                    <Grid item xs={12} sm={8}>
                        <Typography 
                            variant="body1" 
                            className="recent_heading mt-2"
                        >
                        {user.name}
                        </Typography>
                    </Grid>
                    <Grid item xs={12} sm={4} className="srch_bar">
                        <Grid container justifyContent="flex-end" spacing={1}>
                            
                            <Grid item>
                                {/* Reemplaza el icono de salida por el icono de '+' */}
                                <IconButton onClick={handleClickAddChat}>
                                    <AddCircleOutline sx={{ color: theme.palette.info.main }} />
                                </IconButton>
                            </Grid>
                            <Grid item>
                                <IconButton onClick={handleClickLogout}>
                                    <LogoutOutlined sx={{ color: theme.palette.error.main }} />
                                </IconButton>
                            </Grid>

                        </Grid>
                    </Grid>
                </Grid>
            </Paper>

            {/* Cuadro de diálogo para seleccionar un usuario */}
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Seleccionar Usuario Para iniciar Chat</DialogTitle>
                <DialogContent>
                <List>
                    {clientes.map((cliente) => (
                    <ListItem button key={cliente.cliente.uid} onClick={() => handleUserSelect(cliente.cliente)}>
                        <ListItemText primary={cliente.cliente.fullname} />
                    </ListItem>
                    ))}
                </List>
                </DialogContent>
                <DialogActions>
                <Button onClick={handleClose}>Cancelar</Button>
                </DialogActions>
            </Dialog>

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
        </>
    )
}
import React, { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';

import { useTheme } from '@emotion/react';
import { Divider, List, ListItem, ListItemText, Typography } from '@mui/material';
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
import BusinessIcon from '@mui/icons-material/Business';

export const NavegationMenuEmpresa = ({onNavegationItemClick}) => {

    const theme = useTheme();

    const [selectedItem, setSelectedItem] = useState(null);

    const handleItemClick = (itemName) => {
        setSelectedItem(itemName);
        onNavegationItemClick(itemName)
    };

    return (
        <List sx={{width: '240px', height: '100vh', backgroundColor: '#696969'}}>
        <ListItem 
            component={RouterLink} 
            // to="/user-management" 
            onClick={() => handleItemClick('Clientes')}
        >
            <SupervisorAccountIcon
                sx={{
                    marginRight: '8px',
                    color: selectedItem === 'Clientes' ? '#fff' : '#D3D3D3',
                }}
            />
            <ListItemText>
                <Typography
                    variant="inherit"
                    sx={{
                    color: selectedItem === 'Clientes' ? '#fff' : '#D3D3D3',
                    }}
                >
                    Gestión de Clientes
                </Typography>
            </ListItemText>
        </ListItem>
        <Divider sx={{backgroundColor: 'white'}}/>
        <ListItem 
            component={RouterLink} 
            // to="/user-management" 
            onClick={() => handleItemClick('Empresas')}
        >
            <BusinessIcon
                sx={{
                    marginRight: '8px',
                    color: selectedItem === 'Empresas' ? '#fff' : '#D3D3D3',
                }}
            />
            <ListItemText>
                <Typography
                    variant="inherit"
                    sx={{
                    color: selectedItem === 'Empresas' ? '#fff' : '#D3D3D3',
                    }}
                >
                    Gestión de Empresas
                </Typography>
            </ListItemText>
        </ListItem>
        <Divider sx={{backgroundColor: 'white'}}/>
        </List>
    )
}

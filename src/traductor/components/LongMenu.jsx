import { MoreVertOutlined } from '@mui/icons-material';
import { IconButton, Menu, MenuItem } from '@mui/material';
import React, { useState } from 'react'
import { useAuthStore } from '../../hook/useAuthStore';
import { useNavigate } from 'react-router-dom';

const options = [
  'Gestion de Usuario',
  'Logout'
];

export const LongMenu = () => {
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const { startLogout} = useAuthStore();
    const navigate = useNavigate();

    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
    const handleOption = (option) => {
      switch (option) {
        case 'Gestion de Usuario':
          navigate('/users')
          break;
        case 'Logout':
          startLogout();
          break;
      }
      setAnchorEl(null);
    };
  
    return (
      <div>
        <IconButton
          aria-label="more"
          id="long-button"
          aria-controls={open ? 'long-menu' : undefined}
          aria-expanded={open ? 'true' : undefined}
          aria-haspopup="true"
          onClick={handleClick}
        >
            <MoreVertOutlined/>
        </IconButton>
        <Menu
          id="long-menu"
          MenuListProps={{
            'aria-labelledby': 'long-button',
          }}
          anchorEl={anchorEl}
          open={open}
          onClose={handleOption}
        >
          {options.map((option) => (
            <MenuItem key={option} 
            //selected={option === 'Pyxis'} 
            onClick={() => handleOption(option)}>
              {option}
            </MenuItem>
          ))}
        </Menu>
      </div>
    );
}

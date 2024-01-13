import React, { useState } from 'react'
import { useAuthStore } from '../../../hook/useAuthStore'
import { Avatar, Grid, Paper, Typography } from '@mui/material'
import { useTheme } from '@emotion/react';

export const SidebarChat = ({chat, clicked, handleClick}) => {
  const theme = useTheme();
  
  return (
    <Paper 
      className="chat_list"
      style={{
        backgroundColor: clicked === chat.uid ? theme.palette.primary.main : 'white',
      }}
      onClick={() => handleClick()}
    >
      <Grid 
        container 
        alignItems="center"
      >
        <Grid item xs={2}>
          <Avatar src="https://www.svgrepo.com/show/382106/male-avatar-boy-face-man-user-9.svg" alt="user" />
        </Grid>
        <Grid item xs={10}>
          <div className="chat_ib">
            <Typography 
              variant="h5"
              style={{ color: theme.palette.text.primary }}
            >
              {chat.emisor !== localStorage.getItem('name')
                ? (chat.emisor)
                : (chat.receptor)
              }
            </Typography>
            {
              (chat.estado === true)
              ?  <Typography 
                    variant="body1" 
                    // className="text-success"
                    style={{ color: theme.palette.highlight.main }}
                  >
                    Online
                  </Typography>
              :  <Typography 
                    variant="body1"
                    // className="text-danger"
                    style={{ color: theme.palette.error.main }}
                  >
                    Offline
                  </Typography>
            }
          </div>
        </Grid>
      </Grid>
    </Paper>
  )
}

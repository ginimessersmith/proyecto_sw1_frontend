import { LogoutOutlined, MenuOutlined } from "@mui/icons-material"
import { AppBar, Grid, IconButton, Toolbar, Typography } from "@mui/material"
import { useAuthStore } from "../../hook/useAuthStore";

export const NavBar = ({drawerWidth = 240}) => {

    const {startLogout} = useAuthStore();

    return (
    <AppBar position="fixed" sx={{ width: {sm: `calc(100% - ${drawerWidth}px)`, ml:{sm: `${drawerWidth}px`}}}}>
        <Toolbar>
            <IconButton color='inherit' edge="start" sx={{mr:2, display:{sm: 'none'}}}>
                <MenuOutlined/>
            </IconButton>
            <Grid container direction='row' justifyContent='space-between' alignItems='center'>
                <Typography variant='h6' noWrap component='div'>Traslate-IA</Typography>
                <IconButton onClick={startLogout} color='error'>
                    <LogoutOutlined/>
                </IconButton>
            </Grid>
        </Toolbar>
    </AppBar>
  )
}

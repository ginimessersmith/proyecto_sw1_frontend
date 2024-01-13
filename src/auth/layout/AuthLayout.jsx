import { Box, Grid, Typography } from "@mui/material";
import Logo from '../../../assets/icon/traductor-icon.png';
export const AuthLayout = ({children,title = ''}) => {
  return (
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justifyContent="center"
      sx={{minHeight:'100vh',  backgroundColor:'primary.main', padding:0, overflowY: 'auto'}}
    >
        <h1 >Traslate IA</h1>
        <Grid item
          sx={{
            width: 200,
            height: 200,
            m: 0
          }}
        >
          <img
            src={Logo} alt='Logo' width={200} height={200}
          />
        </Grid>
        <Grid item
          className="box-shadow"
          xs={3}
          sx={{width:{sm:450}, backgroundColor:'white', padding: 3, borderRadius: 2}}
        >
          <Typography variant="h5" sx={{mb:1}}>{title}</Typography>
            {/* Children */}
            {children}
        </Grid>
    </Grid>
  )
}

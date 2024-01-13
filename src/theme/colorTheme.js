import { createTheme } from "@mui/material";
import { red } from "@mui/material/colors";

export const colorTheme = createTheme({
    palette: {
        primary: {
            main: '#F5F5F5', // Color principal (fondo)
        },
        contrast: {
            main: '#333333', // Un color oscuro para hacer contraste
        },
        secondary: {
            main: '#FFB74D', // Color de acento (naranja apagado)
        },
        background: {
            main: '#E0E0E0', // Color secundario (detalles y fondos)
        },
        error: {
            main: '#FF5252', // Color para mensajes de error o información
        },
        text: {
            primary: '#333333', // Color de texto principal
            secondary: '#757575', // Color de texto en segundo plano
            grayCeniza: '#C0C0C0', // Nuevo color gris ceniza
        },
        highlight: {
            main: '#4CAF50', // Color destacado (resaltar mensajes)
        },
    }
});
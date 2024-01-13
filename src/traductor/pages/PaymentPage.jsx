import { useTheme } from "@emotion/react";
import { Button, Card, CardContent, Container, Grid, TextField, Typography } from "@mui/material";
import { useState } from "react";
import traslateApi from "../../api/traslateApi";

export const PaymentPage = () => {
    const theme = useTheme();

    const [cantidadUsuarios, setCantidadUsuarios] = useState(null);

    const handleSubscribe = async (plan, uidPlan,users) => {
        // Implementa lógica de suscripción aquí
        console.log(users, uidPlan)
        const price = getPriceForPlan(plan);  // Implementa la lógica real para obtener el precio según el plan
        const totalPagar = price * users;
        console.log(`¡Te has suscrito al plan ${plan}!`);
        console.log(`Cantidad de usuarios: ${users}`);
        console.log(`Total a pagar: ${totalPagar}`);

        const {data} = await traslateApi.post('/plan_suscripcion/suscripcion_empresa',{
            uid_empresa: localStorage.getItem('uid'),
            uid_plan: uidPlan,
            cantidad_clientes: users   
        });

        window.location.href = data.pago.url;
    };

    const getPriceForPlan = (plan) => {
        if(plan === 'mensual'){
            return 5; 
        }else if(plan === 'semestral'){
            return 3; 
        }else if(plan === 'anual'){
            return 4; 
        }
    };
    
    return (
        <Container maxWidth="md" style={{ marginTop: '50px' }}>
            <Typography variant="h4" align="center" gutterBottom>
                Elige tu plan de suscripción
            </Typography>
            <Grid container spacing={3} justifyContent="center">
                <Grid item xs={12} sm={4}>
                    <Card style={{ backgroundColor: '#CCCCCC' }}>
                        <CardContent>
                            <Typography variant="h6" align="center" gutterBottom style={{ color: '#333333' }}>
                                Mensual
                            </Typography>
                            <Typography variant="h6" align="center" gutterBottom style={{ color: '#333333' }}>
                                Plant Basico
                            </Typography>
                            <Typography variant="h5" align="center" gutterBottom style={{ color: '#333333' }}>
                                $5 por usuario
                            </Typography>
                            <Typography variant="body1" gutterBottom>
                                Obten los siguientes beneficios a tan solo $5 por usuario:
                            </Typography>
                            <Typography variant="body2" gutterBottom>
                                - Acceso a los chats globales por 1 mes
                            </Typography>
                            <Typography variant="body2" gutterBottom>
                                - Posibilidad de traducción internacional entre distintas empresas habilitadas.
                            </Typography>
                            <Typography variant="body2" gutterBottom>
                                - Traduccion en tiempo real de audio en el idioma requerido.
                            </Typography>
                            <TextField
                                label="Cantidad de Usuarios"
                                type="number"
                                fullWidth
                                margin="normal"
                                variant="outlined"
                                onChange={(e) => setCantidadUsuarios(parseInt(e.target.value))}
                            />
                            <Button
                                variant="contained"
                                color="primary"
                                fullWidth
                                style={{ backgroundColor: theme.palette.secondary.main, color: theme.palette.text.primary }}
                                onClick={() => handleSubscribe('mensual','493aceda-b5d5-4a52-aff2-0d3d91162008', cantidadUsuarios)}
                            >
                                Suscribirse
                            </Button>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} sm={4}>
                <Card style={{ backgroundColor: '#999999' }}>
                    <CardContent>
                        <Typography variant="h6" align="center" gutterBottom style={{ color: '#FFFFFF' }}>
                            Semestral
                        </Typography>
                        <Typography variant="h6" align="center" gutterBottom style={{ color: '#FFFFFF' }}>
                            Plan Gold
                        </Typography>
                        <Typography variant="h5" align="center" gutterBottom style={{ color: '#FFFFFF' }}>
                            $3 por usuario
                        </Typography>
                        <Typography variant="body1" gutterBottom style={{ color: '#FFFFFF' }}>
                            Obten los siguientes beneficios a tan solo $3 por usuario:
                        </Typography>
                        <Typography variant="body2" gutterBottom style={{ color: '#FFFFFF' }}>
                            - Acceso a los chats globales por 6 meses
                        </Typography>
                        <Typography variant="body2" gutterBottom style={{ color: '#FFFFFF' }}>
                            - Posibilidad de traducción internacional entre distintas empresas habilitadas.
                        </Typography>
                        <Typography variant="body2" gutterBottom style={{ color: '#FFFFFF' }}>
                            - Traducción en tiempo real de audio en el idioma requerido.
                        </Typography>
                        <TextField
                            label="Cantidad de Usuarios"
                            type="number"
                            fullWidth
                            margin="normal"
                            variant="outlined"
                            onChange={(e) => setCantidadUsuarios(parseInt(e.target.value))}
                        />
                        <Button
                            variant="contained"
                            color="primary"
                            fullWidth
                            style={{ backgroundColor: theme.palette.primary.main, color: theme.palette.text.primary }}
                            onClick={() => handleSubscribe('semestral','78777ce8-7a3d-4c87-8ad0-decf22fd7c8d', cantidadUsuarios)}
                        >
                            Suscribirse
                        </Button>
                    </CardContent>
                </Card>
                </Grid>
                <Grid item xs={12} sm={4}>
                <Card style={{ backgroundColor: '#FFB74D' }}>
                    <CardContent>
                        <Typography variant="h6" align="center" gutterBottom style={{ color: '#FFFFFF' }}>
                            Anual
                        </Typography>
                        <Typography variant="h6" align="center" gutterBottom style={{ color: '#FFFFFF' }}>
                            Plan Platinum
                        </Typography>
                        <Typography variant="h5" align="center" gutterBottom style={{ color: '#FFFFFF' }}>
                            $4 por usuario
                        </Typography>
                        <Typography variant="body1" gutterBottom style={{ color: '#FFFFFF' }}>
                            Obten los siguientes beneficios a tan solo $4 por usuario:
                        </Typography>
                        <Typography variant="body2" gutterBottom style={{ color: '#FFFFFF' }}>
                            - Acceso a los chats globales por 12 meses
                        </Typography>
                        <Typography variant="body2" gutterBottom style={{ color: '#FFFFFF' }}>
                            - Posibilidad de traducción internacional entre distintas empresas habilitadas.
                        </Typography>
                        <Typography variant="body2" gutterBottom style={{ color: '#FFFFFF' }}>
                            - Traducción en tiempo real de audio en el idioma requerido.
                        </Typography>
                        <TextField
                            label="Cantidad de Usuarios"
                            type="number"
                            fullWidth
                            margin="normal"
                            variant="outlined"
                            onChange={(e) => setCantidadUsuarios(parseInt(e.target.value))}
                        />
                        <Button
                            variant="contained"
                            color="primary"
                            fullWidth
                            style={{ backgroundColor: theme.palette.primary.main, color: theme.palette.text.primary }}
                            onClick={() => handleSubscribe('anual','2cd80f1a-2070-4793-8c24-e0eefd7b9154', cantidadUsuarios)}
                        >
                            Suscribirse
                        </Button>
                    </CardContent>
                </Card>
                </Grid>
            </Grid>
        </Container>
    )
}

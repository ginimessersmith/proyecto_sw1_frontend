
import React, { useEffect, useState } from 'react'
import { Bar, Line } from 'react-chartjs-2';
import 'chart.js/auto';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import deLocale from 'date-fns/locale/de';

import moment from 'moment';

import TextField from '@mui/material/TextField';
import { Button, Grid } from '@mui/material';

const fechaActual = moment('05/12/2023', 'DD/MM/YYYY');
const fechaFutura = moment('05/03/2024', 'DD/MM/YYYY');

const subscriptions = [
  {
    empresa: 'Empresa 1',
    cantidadUsuarios: 150,
    precio: 300,
    fecha: fechaActual,
  },
  {
    empresa: 'Empresa 2',
    cantidadUsuarios: 200,
    precio: 350,
    fecha: fechaActual,
  },
  {
    empresa: 'Empresa 3',
    cantidadUsuarios: 100,
    precio: 90,
    fecha: fechaActual,
  },
  {
    empresa: 'Empresa 4',
    cantidadUsuarios: 100,
    precio: 100,
    fecha: fechaFutura,
  },
  // Puedes agregar más datos aquí...
];

export const Dashboard = () => {
  const [filter, setFilter] = useState('');
  const [filteredData, setFilteredData] = useState([]);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  useEffect(() => {
    const filteredSubscriptions = subscriptions.filter((subscription) => {
      const subscriptionDate = moment(subscription.fecha).toDate();
      return (
        subscription.empresa.toLowerCase().includes(filter.toLowerCase()) &&
        (!startDate || subscriptionDate >= startDate) &&
        (!endDate || subscriptionDate <= endDate)
      );
    });
    setFilteredData(filteredSubscriptions);
  }, [filter, startDate, endDate]);
  // Datos de ejemplo
  const buildChartData = () => {
    // Construye el objeto data necesario para el gráfico Bar
    const data = {
      labels: filteredData.map(subscription => subscription.empresa),
      datasets: [
        {
          label: 'Cantidad de Usuarios',
          data: filteredData.map(subscription => subscription.cantidadUsuarios),
          backgroundColor: 'rgba(75,192,192,0.2)',
          borderColor: 'rgba(75,192,192,1)',
          borderWidth: 1,
        },
        {
          label: 'Precio de Suscripción (Dólares)',
          data: filteredData.map(subscription => subscription.precio),
          backgroundColor: 'rgba(255,99,132,0.2)',
          borderColor: 'rgba(255,99,132,1)',
          borderWidth: 1,
        },
      ],
    };

    return data;
  };

  const buildChartDataLine = () => {
    // Construye el objeto data necesario para el gráfico de líneas
    const data = {
      labels: filteredData.map(subscription => subscription.empresa),
      datasets: [
        {
          label: 'Cantidad de Usuarios',
          data: filteredData.map(subscription => subscription.cantidadUsuarios),
          fill: false,
          borderColor: 'rgba(75,192,192,1)',
          borderWidth: 1,
        },
        {
          label: 'Precio de Suscripción (Dólares)',
          data: filteredData.map(subscription => subscription.precio),
          fill: false,
          borderColor: 'rgba(255,99,132,1)',
          borderWidth: 1,
        },
      ],
    };
  
    return data;
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  const handleFilterClick = () => {
    // Lógica para aplicar el filtro
    // Aquí podrías realizar alguna acción o simplemente actualizar el estado para que se dispare el useEffect
    setFilteredData([...subscriptions]);
    setFilter('');
    setStartDate(null);
    setEndDate(null);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={deLocale}>
      <div style={{ padding: '18px', height: '85vh', display: 'flex', flexDirection: 'column' }}>
        {/* Lado izquierdo */}
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <h2>Subscripciones del Mes</h2>
          </Grid>
          <Grid item xs={12} md={4}>
            <TextField
              label="Filtrar por empresa"
              variant="outlined"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              style={{ marginBottom: '16px' }}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <DatePicker
              label="Fecha de Inicio"
              value={startDate}
              onChange={(date) => setStartDate(date)}
              renderInput={(params) => <TextField {...params} />}
              style={{ marginBottom: '16px' }}
              format="dd/MM/yyyy"
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <DatePicker
              label="Fecha de Fin"
              value={endDate}
              onChange={(date) => setEndDate(date)}
              renderInput={(params) => <TextField {...params} />}
              style={{ marginBottom: '16px' }}
              format="dd/MM/yyyy"
            />
          </Grid>
          <Grid item xs={12}>
            <Button variant="contained" onClick={handleFilterClick}>
              Quitar Filtros
            </Button>
          </Grid>
        </Grid>

        {/* Lado derecho */}
        <Grid container spacing={2} style={{marginTop: '10px'}}>
          <Grid item md={12} lg={6}>
            <div>
              <Bar data={buildChartData()} options={options}/>
            </div>
          </Grid>
          <Grid item md={12} lg={6}>
            <div >
              <Line data={buildChartDataLine()} options={options} />
            </div>
          </Grid>
        </Grid>
      </div>
    </LocalizationProvider>
  );
};


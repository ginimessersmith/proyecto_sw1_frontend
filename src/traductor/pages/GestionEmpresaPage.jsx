import { Button } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import React from 'react'
import { useNavigate } from 'react-router-dom';

export const GestionEmpresaPage = ({empresaData}) => {
  
    const navigate = useNavigate();

    const columns = [
        { field: 'uid', headerName: 'UID'},
        { field: 'nombre_empresa', headerName: 'Empresa'},
        { field: 'correo_electronico', headerName: 'Email',},
        { field: 'direccion', headerName: 'Direccion'},
        { field: 'ciudad', headerName: 'Ciudad'},
        { field: 'estado', headerName: 'Estado'},
        {
          field: 'EditButton',
          headerName: 'Editar',
          sortable: false,
          filterable: false,
          renderCell: (params) => (
            <Button
              variant="outlined"
              size="small"
              onClick={() => handleEdit(params.row)}
              color="info"
            >
              Editar
            </Button>
          ),
        },
    ];

    const handleEdit = (rowData) => {
        const datos = JSON.stringify(rowData, null, 2)
        console.log(`Edtitar a empresa con UID: ${datos}`);
        navigate(`/editar/cliente`, { state: { rowData } })
    };

    const rows = [];
    if(empresaData.length === 0){
        return;
    }
    const datos={};
    datos.ciudad = empresaData.ciudad;
    datos.correo_electronico = empresaData.correo_electronico;
    datos.nombre_empresa = empresaData.nombre_empresa;
    datos.estado = empresaData.estado;
    datos.direccion = empresaData.direccion;
    datos.uid = empresaData.uid;

    rows.push(datos);

  return (
    <div style={{ height: '100%', width: '100%'}}>
        <DataGrid
            rows={rows}
            columns={columns}
            initialState={{
                pagination: {
                paginationModel: { page: 0, pageSize: 5 },
                },
            }}
            pageSizeOptions={[5, 10, 15]}
            getRowId={(row) => row.uid} // Especifica el campo que sirve como identificador
        />
        </div>
  )
}


import { Button } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { useNavigate } from 'react-router-dom';

export const ClientesPage = ({userData}) => {

  const navigate = useNavigate();
    
  const columns = [
    { field: 'uid', headerName: 'UID', width: 100 },
    { field: 'fullname', headerName: 'FullName', width: 130 },
    { field: 'correo_electronico', headerName: 'Email', width: 180 },
    { field: 'iso_language', headerName: 'Lenguaje', width: 100 },
    { field: 'ciudad', headerName: 'Ciudad', width: 100 },
    { field: 'nombre_empresa', headerName: 'Empresa', width: 100 },
    { field: 'estado', headerName: 'Estado', width: 100 },
    { field: 'uid_empresa', headerName: 'UID Empresa', width: 100 },
    { field: 'uid_lenguas_iso', headerName: 'UID Lenguaje', width: 100 },
    { field: 'uid_contacto', headerName: 'Contacto', width: 100 },
    {
      field: 'editButton',
      headerName: 'Editar',
      width: 120,
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
  if(userData.length === 0){
    return;
  };

  if(userData.listaClientes.length !== 0){
    console.log(userData.listaClientes);
    userData.listaClientes.map(cliente => {
        const datos={};
        if(cliente.unaEmpresa !== null && cliente.unaEmpresa.uid === localStorage.getItem('uid')){

            if(cliente.cliente !== null){
                datos.uid = cliente.cliente.uid;
                datos.fullname = cliente.cliente.fullname;
                datos.correo_electronico = cliente.cliente.correo_electronico;
                datos.uid_contacto = cliente.cliente.uid_contacto;
                datos.uid_empresa= cliente.cliente.uid_empresa;
                datos.uid_lenguas_iso = cliente.cliente.uid_lenguas_iso;
            }else{
                datos.uid = null
                datos.fullname = null;
                datos.correo_electronico = null;
            };
        
            if(cliente.unIdioma !== null){
                datos.iso_language = cliente.unIdioma.iso_language;
            }else{
                datos.iso_language = null
            };
        
            if(cliente.unaEmpresa !== null){
                datos.ciudad = cliente.unaEmpresa.ciudad;
                datos.nombre_empresa = cliente.unaEmpresa.nombre_empresa;
                datos.estado = cliente.cliente.estado;
            }else{
                datos.ciudad = null;
                datos.nombre_empresa = null;
                datos.estado = null;
            };

            rows.push(datos)
        
        }
    })
  }else{
    return;
  }

  return (
    <div style={{ height: '100%', width: '100%' }}>
    <DataGrid
      rows={rows}
      columns={columns}
      initialState={{
        pagination: {
          paginationModel: { page: 0, pageSize: 5 },
        },
      }}
      pageSizeOptions={[5,10, 15]}
      getRowId={(row) => row.uid} // Especifica el campo que sirve como identificador
    />
    </div>
  )
}

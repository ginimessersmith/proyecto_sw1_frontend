
import { Button } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';

const columns = [
  { field: 'uid', headerName: 'UID'},
  { field: 'nombre_empresa', headerName: 'Empresa'},
  { field: 'correo_electronico', headerName: 'Email',},
  { field: 'direccion', headerName: 'Direccion'},
  { field: 'ciudad', headerName: 'Ciudad'},
  { field: 'estado', headerName: 'Estado'},
  {
    field: 'banButton',
    headerName: 'Banear',
    sortable: false,
    filterable: false,
    renderCell: (params) => (
      <Button
        variant="outlined"
        size="small"
        onClick={() => handleBan(params.row.uid)}
        color="error"
      >
        Banear
      </Button>
    ),
  },
];

const handleBan = (uid) => {
  console.log(`Banear a empresa con UID: ${uid}`);
};

export const GestionEmpresasPage = ({empresaData}) => {
    const rows = [];
    if(empresaData.length === 0){
      return;
    };

    console.log(empresaData);

    if(empresaData.lista_empresas.length !== 0){
      empresaData.lista_empresas.map(empresa => {
        const datos = {};

        if(empresa.Empresa !== null){
          datos.ciudad = empresa.Empresa.ciudad;
          datos.correo_electronico = empresa.Empresa.correo_electronico;
          datos.nombre_empresa = empresa.Empresa.nombre_empresa;
          datos.estado = empresa.Empresa.estado;
          datos.direccion = empresa.Empresa.direccion;
          datos.uid = empresa.Empresa.uid
        };

        rows.push(datos)
      })

      console.log(rows)
    }else{
      return;
    }

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

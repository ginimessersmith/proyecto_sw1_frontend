import React, { useEffect, useState } from 'react';
import { EmpresaLayout } from '../layout/EmpresaLayout';
import { ClientesPage } from './ClientesPage';
import { GestionEmpresaPage } from './GestionEmpresaPage';
import traslateApi from '../../api/traslateApi';

export const EmpresaPage = () => {
  const [selectedItem, setSelectedItem] = useState(null);
  const [userData, setUserData] = useState([]);
  const [empresaData, setEmpresaData] = useState([]);

  const uid = localStorage.getItem('uid');

  useEffect(() => {
    // Realiza la lógica para obtener datos según la opción seleccionada
    const fetchData = async () => {
      if (selectedItem === 'Clientes') {
        try {
          const { data } = await traslateApi.get('/users', {
            headers: {
              'x-token': localStorage.getItem('token'),
              // Otros encabezados según sea necesario
            },
          });
          // Almacena los datos en el estado
          setUserData(data);
        } catch (error) {
          console.log(error);
        }
      }
      if (selectedItem === 'Empresas') {
        try {
          const { data } = await traslateApi.get(`/empresa/${uid}`, {
            headers: {
              'x-token': localStorage.getItem('token'),
              // Otros encabezados según sea necesario
            },
          });
          // Almacena los datos en el estado
          setEmpresaData(data);
        } catch (error) {
          console.log(error);
        }
      }
    };

    fetchData();
  }, [selectedItem]);  // Este efe

  const componentMapping = {
    Clientes: <ClientesPage userData={userData}/>,
    Empresas: <GestionEmpresaPage empresaData={empresaData}/>,
    // Agrega más opciones según sea necesario
  };

  const handleNavegationItemClick = (selectedOption) => {
      setSelectedItem(selectedOption);
      console.log(selectedOption)
  };

  return (
    <EmpresaLayout onNavegationItemClick={handleNavegationItemClick}>
      {/* Utiliza el objeto 'componentMapping' para seleccionar y renderizar el componente */}
      {selectedItem === 'Clientes' ? componentMapping[selectedItem] : null}
      {selectedItem === 'Empresas' ? componentMapping[selectedItem] : null}
    </EmpresaLayout>
  )
}

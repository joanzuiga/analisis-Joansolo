import React, { useState ,useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
const ReparacionesView = () => {
  const navigate = useNavigate();
  const [reparacionesData, setReparacionesData] = useState([]);

  const fetchReparacion = async () => {
    try {
      const response = await fetch('https://localhost:7264/api/reparaciones');
      if (response.ok) {
        const data = await response.json();
        setReparacionesData(data);
      } else {
        console.error('Error fetching data:', response.statusText);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchReparacion();
  }, []);

  const handleAgregarReparacion = () => {
    navigate("/agregarReparacion", { state: { reparacionData: {} } });
  };

  const handleEditarReparacion = (id) => {
    // Find the selected reparacion by ID
    const selectedReparacion = reparacionesData.find(reparacion => reparacion.id === id);

    // Navigate to the form view with the selected data
    navigate(`/editarReparacion/${id}`, { state: { reparacionData: selectedReparacion } });
  };

  const handleEliminarReparacion = (id) => {
    // Display a SweetAlert confirmation
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'No podrás revertir esto',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
    }).then(async (result) => {
      if (result.isConfirmed) {
        const response = await fetch(`https://localhost:7264/api/reparaciones/${id}`, {
          method: 'DELETE',
        });
        if (response.ok) {
          // Recargar los envíos después de la eliminación
          Swal.fire('Eliminado', 'La reparación ha sido eliminada', 'success');
          fetchReparacion();
        } else {
          console.error('Error al eliminar la reparación');
        }
      }
    });
  };

  const getRowColor = (estado) => {
    switch (estado.toLowerCase()) {
      case 'sin reparar':
        return 'table-danger'; // Red for 'sin reparar'
      case 'en reparación':
        return 'table-warning'; // Yellow for 'en proceso'
        
      case 'completada':
        return 'table-success'; // Green for 'completado'
      case 'reparado':
        return 'table-success'; // Green for 'reparado'
      default:
        return '';
    }
  };

  return (
    <div className="container mt-4">
      <h1 className="mb-4">Lista de Reparaciones</h1>
      <button className="btn btn-primary mb-3" onClick={handleAgregarReparacion}>
        Agregar Nueva Reparación
      </button>
      <table className="table">
        <thead className="thead-dark">
          <tr>
            <th>ID</th>
            <th>Cliente</th>
            <th>Contacto</th>
            <th>Marca</th>
            <th>Modelo</th>
            <th>Descripción</th>
            <th>Estado</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {reparacionesData.map(reparacion => (
            <tr key={reparacion.id} className={getRowColor(reparacion.estado)}>
              <td>{reparacion.id}</td>
              <td>{reparacion.nombre_cliente}</td>
              <td>{reparacion.contacto}</td>
              <td>{reparacion.marca_telefono}</td>
              <td>{reparacion.modelo_telefono}</td>
              <td>{reparacion.descripcion}</td>
              <td>{reparacion.estado}</td>
              <td>
                <button
                  className="btn btn-danger mr-2"
                  onClick={() => handleEliminarReparacion(reparacion.id)}
                >
                  Eliminar
                </button>
                <button
                  className="btn btn-primary"
                  onClick={() => handleEditarReparacion(reparacion.id)}
                >
                  Editar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ReparacionesView;
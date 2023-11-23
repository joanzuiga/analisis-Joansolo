import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Swal from 'sweetalert2';

const EditarReparacion = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [reparacionData, setReparacionData] = useState({
    nombre_cliente: '',
    contacto: '',
    marca_telefono: '',
    modelo_telefono: '',
    descripcion: '',
    estado: '',
  });

  useEffect(() => {
    // Check if location state contains reparacionData
    if (location.state && location.state.reparacionData) {
      setReparacionData(location.state.reparacionData);
    } else {
      // Handle case where data is not available (e.g., show an error or redirect)
      console.error('Reparacion data not found');
    }
  }, [location.state]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setReparacionData({ ...reparacionData, [name]: value });
  };

  const handleUpdateReparacion = async () => {
    try {
      // Validation - add your validation logic here

      const response = await fetch(`https://localhost:7264/api/reparaciones/${reparacionData.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(reparacionData),
      });

      if (response.ok) {
        Swal.fire({
          icon: 'success',
          title: 'Éxito',
          text: 'La reparación se ha actualizado con éxito',
        });
        navigate('/reparaciones');
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'No se pudo actualizar la reparación',
        });
      }
    } catch (error) {
      console.error('Error updating reparacion:', error);
    }
  };

  return (
    <div className="container mt-5">
      <h1 className="mb-4">Editar Reparación</h1>
      <form>
        <div className="mb-3">
          <label htmlFor="nombre_cliente" className="form-label">
            Cliente:
          </label>
          <input
            type="text"
            className="form-control"
            id="nombre_cliente"
            name="nombre_cliente"
            value={reparacionData.nombre_cliente}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="contacto" className="form-label">
            Contacto:
          </label>
          <input
            type="number"
            className="form-control"
            id="contacto"
            name="contacto"
            value={reparacionData.contacto}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="marca_telefono" className="form-label">
            Marca:
          </label>
          <input
            type="text"
            className="form-control"
            id="marca_telefono"
            name="marca_telefono"
            value={reparacionData.marca_telefono}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="modelo_telefono" className="form-label">
            Modelo:
          </label>
          <input
            type="text"
            className="form-control"
            id="modelo_telefono"
            name="modelo_telefono"
            value={reparacionData.modelo_telefono}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="descripcion" className="form-label">
            Descripción:
          </label>
          <input
            type="text"
            className="form-control"
            id="descripcion"
            name="descripcion"
            value={reparacionData.descripcion}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="estado" className="form-label">
            Estado:
          </label>
          <select
            className="form-select"
            id="estado"
            name="estado"
            value={reparacionData.estado}
            onChange={handleChange}
          >
            <option value="">Seleccionar Estado</option>
            <option value="sin reparar">Sin Reparar</option>
            <option value="en reparación">En Reparación</option>
            <option value="reparado">Reparado</option>
          </select>
        </div>

        <button
          type="button"
          className="btn btn-primary"
          onClick={handleUpdateReparacion}
        >
          Guardar Cambios
        </button>
      </form>
    </div>
  );
};

export default EditarReparacion;

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Swal from 'sweetalert2';

function RegisterReparacion() {
  const navigate = useNavigate();

  const [reparacionData, setReparacionData] = useState({
    nombre_cliente: '',
    contacto: '',
    marca_telefono: '',
    modelo_telefono: '',
    descripcion: '',
    estado: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setReparacionData({ ...reparacionData, [name]: value });
  };

  const handleRegisterReparacion = async () => {
    try {
      // Validation
      if (
        !reparacionData.nombre_cliente ||
        !reparacionData.contacto ||
        !reparacionData.marca_telefono ||
        !reparacionData.modelo_telefono ||
        !reparacionData.descripcion ||
        !reparacionData.estado ||
        !['sin reparar', 'en reparación', 'reparado'].includes(
          reparacionData.estado.toLowerCase()
        )
      ) {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Por favor, complete todos los campos y seleccione un estado válido.',
        });
        return;
      }

      const response = await fetch('https://localhost:7264/api/reparaciones', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(reparacionData),
      });

      if (response.ok) {
        Swal.fire({
          icon: 'success',
          title: 'Éxito',
          text: 'La reparación se ha registrado con éxito',
        });
        navigate('/reparaciones');
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'No se pudo registrar la reparación',
        });
      }
    } catch (error) {
      console.error('Error registering reparacion:', error);
    }
  };

  return (
    <div className="container mt-5">
      <h1 className="mb-4">Registro de Reparación</h1>
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
          onClick={handleRegisterReparacion}
        >
          Registrar
        </button>
      </form>
    </div>
  );
}

export default RegisterReparacion;







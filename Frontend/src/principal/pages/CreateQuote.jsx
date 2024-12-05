/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import './CreateQuote.css';

export const CreateQuote = () => {
  const [medicos, setMedicos] = useState([]);
  const [formData, setFormData] = useState({
    hora: "",
    fecha: "",
    doctorId: "",
    departamentoId: "",
    departamentoDe: "",
  });

  useEffect(() => {
    fetch("http://localhost:3000/api/medicos")
      .then((response) => response.json())
      .then((data) => {
        if (data.code === 0) {
          setMedicos(data.data);
        }
      })
      .catch((error) => {
        console.error("Error al cargar médicos:", error);
      });
  }, []);

  useEffect(() => {
    if (formData.doctorId) {
      const selectedMedico = medicos.find(
        (medico) => medico.doctor_id.toString() === formData.doctorId
      );
      if (selectedMedico) {
        setFormData((prevData) => ({
          ...prevData,
          departamentoId: selectedMedico.department_id || "",
          departamentoDe: selectedMedico.department_de || "",
        }));
      }
    }
  }, [formData.doctorId, medicos]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    // Actualizar departamentoId y departamentoDe cuando se selecciona un doctor
    if (name === "doctorId") {
      const selectedMedico = medicos.find(
        (medico) => medico.doctor_id.toString() === value
      );
      if (selectedMedico) {
        setFormData((prevData) => ({
          ...prevData,
          departamentoId: selectedMedico.department_id || "",
          departamentoDe: selectedMedico.department_de || "",
        }));
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { hora, fecha, doctorId, departamentoId } = formData;
    const personaId = 123; // Reemplaza esto con el ID real del paciente

    if (!hora || !fecha || !doctorId || !departamentoId) {
      alert("Por favor, complete todos los campos.");
      return;
    }

    const requestData = {
      hora,
      fecha,
      doctorId: parseInt(doctorId),
      departamentoId: parseInt(departamentoId),
      personaId,
    };

    console.log("Datos enviados al servidor:", requestData);

    try {
      const response = await fetch("http://localhost:3000/api/cita", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData),
      });

      const result = await response.json();
      console.log("Respuesta del servidor:", result);

      if (result.code === 0) {
        alert("Cita creada exitosamente");
      } else {
        alert("Error al crear cita: " + result.message);
      }
    } catch (error) {
      console.error("Error al conectar con el servidor:", error);
      alert("Error al conectar con el servidor");
    }
  };

  return (
    <form className="create-quote-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label>Hora:</label>
        <input
          type="time"
          name="hora"
          value={formData.hora}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group">
        <label>Fecha:</label>
        <input
          type="date"
          name="fecha"
          value={formData.fecha}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group">
        <label>Médico:</label>
        <select
          name="doctorId"
          value={formData.doctorId}
          onChange={handleChange}
          required
        >
          <option value="">Seleccione un médico</option>
          {medicos.map((medico) => (
            <option key={medico.doctor_id} value={medico.doctor_id}>
              {medico.doctor_name} {medico.doctor_lastname} ({medico.department})
            </option>
          ))}
        </select>
      </div>
      <div className="form-group">
        <label>Departamento Asociado:</label>
        <input
          type="text"
          name="departamentoDe"
          value={formData.departamentoDe}
          readOnly
        />
      </div>

      <button className="submit-button" type="submit">Crear Cita</button>
    </form>
  );
};
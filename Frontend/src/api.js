/* eslint-disable no-unused-vars */
// src/api.js
export const fetchCitas = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/cita');
      const data = await response.json();
      if (data.code === 0) {
        return data.data;
      } else {
        throw new Error(data.message || 'Error al obtener las citas');
      }
    } catch (error) {
      throw new Error('Error al conectar con el servidor');
    }
  };
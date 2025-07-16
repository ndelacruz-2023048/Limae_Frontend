import { useState, useEffect } from 'react';
import axios from 'axios';
const API_URL = import.meta.env.VITE_API_URL;

export const useFetchEstudiantes = () => {
  const [estudiantes, setEstudiantes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEstudiantes = async () => {
      try {
        const res = await axios.get(`${API_URL}/api/v1/usuarios/users`);
        setEstudiantes(Array.isArray(res.data.estudiantes) ? res.data.estudiantes : []);
      } catch (err) {
        setError(err.message || 'Error al cargar estudiantes');
      } finally {
        setLoading(false);
      }
    };

    fetchEstudiantes();
  }, []);

  return { estudiantes, loading, error };
};
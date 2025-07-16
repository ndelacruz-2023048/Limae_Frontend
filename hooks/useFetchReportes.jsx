import { useState, useEffect } from 'react';
import axios from 'axios';
const API_URL = import.meta.env.VITE_API_URL;

export const useFetchReportes = () => {
  const [reportes, setReportes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchReportes = async () => {
      try {
        const res = await axios.get(`${API_URL}/api/v1/reportes/todosLosReportes`);
        setReportes(Array.isArray(res.data.reportes) ? res.data.reportes : []);
      } catch (err) {
        setError(err.message || 'Error al cargar reportes');
      } finally {
        setLoading(false);
      }
    };

    fetchReportes();
  }, []);

  return { reportes, loading, error };
};

import { useState, useEffect } from 'react';
import axios from 'axios';

export const useFetchNotices = () => {
  const [notices, setNotices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNotices = async () => {
      try {
        setLoading(true);
        const res = await axios.get('http://localhost:3660/api/v1/noticias/obtenerN');
        setNotices(Array.isArray(res.data.noticias) ? res.data.noticias : []);
 // <-- aquí asignas el array correcto
      } catch (err) {
        setError(err.message || 'Error al cargar noticias');
      } finally {
        setLoading(false);
      }
    };

    fetchNotices();
  }, []);

  return { notices, loading, error };
};

import { useState, useRef } from "react";
import axios from "axios";

export const useNotice = (navigate) => {
  const [form, setForm] = useState({
    titulo: '',
    entrada: '',
    cuerpo: '',
    autor: '',
    fecha: '',
    url: '',
    etiquetas: [],
    fotografia: '',
  });

  const [etiquetaInput, setEtiquetaInput] = useState('');
  const fileInputRef = useRef(null);
  const [file, setFile] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    setForm((prev) => ({ ...prev, fotografia: selectedFile?.name || '' }));
  };

  const handleAddEtiqueta = () => {
    const trimmed = etiquetaInput.trim();
    if (trimmed && !form.etiquetas.includes(trimmed)) {
      setForm((prev) => ({ ...prev, etiquetas: [...prev.etiquetas, trimmed] }));
      setEtiquetaInput('');
    }
  };

  const handleRemoveEtiqueta = (etiqueta) => {
    setForm((prev) => ({
      ...prev,
      etiquetas: prev.etiquetas.filter((e) => e !== etiqueta),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:3660/api/v1/noticias/agregarN', form);
      alert('Noticia agregada correctamente');
      navigate('/notices'); // redirige después de éxito
      setForm({
        titulo: '',
        entrada: '',
        cuerpo: '',
        autor: '',
        fecha: '',
        url: '',
        etiquetas: [],
        fotografia: '',
      });
      setFile(null);
    } catch (err) {
      console.error(err);
      alert('Error al agregar la noticia');
    }
  };

  return {
    form,
    file,
    etiquetaInput,
    fileInputRef,
    handleChange,
    handleFileChange,
    handleAddEtiqueta,
    handleRemoveEtiqueta,
    handleSubmit,
    setEtiquetaInput,
  };
};

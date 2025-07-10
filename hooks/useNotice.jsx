import { useState, useRef, useEffect } from "react";
import axios from "axios";
import { useUploadImage } from "../src/utils/useUploadImage";
import { useUploadImageStore } from "../src/stores/UploadImageStore";

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
  /*Codigo para subir imagen en la nube */
  const {dataImage,isLoadingImage,registerImage} = useUploadImage()
  const {dataImageFile} = useUploadImageStore()

  const [etiquetaInput, setEtiquetaInput] = useState('');
  const fileInputRef = useRef(null);
  const [file, setFile] = useState(null);

  const handleChange = async(e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };


  const handleFileChange = async(image) => {
    {/*const response = await registerImage(dataImageFile)
    setFile(response?.responseImage?.secure_url)
    console.log(file);*/}
    setForm((prev) => ({ ...prev, fotografia: image }));
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
      console.log("anda subiendo la imagen");
      const response = await registerImage(dataImageFile)
      console.log("ya subio la imagen");
      console.log(response);
      
      const updatedForm = { ...form, fotografia: response?.responseImage?.secure_url };
      setForm(updatedForm);
      console.log('Form actualizado:', updatedForm);
      
      await axios.post('http://localhost:3660/api/v1/noticias/agregarN', updatedForm);
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

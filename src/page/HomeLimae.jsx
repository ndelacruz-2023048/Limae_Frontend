import { jwtDecode } from 'jwt-decode';
import React, { useEffect, useState } from 'react'
import { UserAuth } from '../context/AuthContext';
import { DashboardAdminPage } from './DashboardAdminPage';
import { DashboardAlumnos } from '../components/organismos/Usuarios/DashboardAlumnos';

export const HomeLimae = () => {
    const { user } = UserAuth();
    const [type, setType] = useState('');

    useEffect(() => {
      if (user) {
        try {
          const decoded = jwtDecode(user);
          console.log(decoded);
          
          setType(decoded?.role);
        } catch (e) {
          console.error('Error al decodificar el token:', e);
        }
      }
    }, [user]);

  return (
    <>
    <div>
    {type === "ADMIN" ? <DashboardAdminPage/>:<DashboardAlumnos/>}
    </div>
    </>
  )
}

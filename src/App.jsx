import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import MyRouter from './routers/routes'
import { AuthContextProvider } from './context/AuthContext'

function App() {
  //Funcion Socket

  return (
    <AuthContextProvider>
      <MyRouter/>
    </AuthContextProvider>
  )
}

export default App

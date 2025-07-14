import MyRouter from './routers/routes'
import { AuthContextProvider } from './context/AuthContext'
// import { Tooltip } from 'react-tooltip';
  
function App() {
  return (
    <AuthContextProvider>
      <MyRouter/>
    </AuthContextProvider>
  )
}

export default App

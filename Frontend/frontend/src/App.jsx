import { Route, Routes } from 'react-router-dom'
import Principal from './Components/Principal'


const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Principal/>} /> 
    </Routes>
  )
}

export default App

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
import Login from './pages/user/Login';
import Register from './pages/user/Register';
import Forgot from './pages/user/Forgot';


function App() {

  return (
    <Router>
      <Routes>
        <Route path='/' element={<Login/>} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot" element={<Forgot /> }/>
        {/* Add other routes here */}
      </Routes>
    </Router>
  );

}

export default App

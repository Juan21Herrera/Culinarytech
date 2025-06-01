import { Routes, Route } from 'react-router-dom';
import './App.css';
import Login from './pages/user/Login';
import Register from './pages/user/Register';
import Forgot from './pages/user/Forgot';
import Home from './pages/Home';
import Profile from './pages/user/Profile';
import Fridge from './pages/Fridge';
import Ingredients from './pages/Ingredients';


function App() {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/forgot" element={<Forgot />} />
      <Route path='/profile' element= {<Profile />}/>
      <Route path='/fridge' element= {<Fridge />}/>
      <Route path='/only-ingredients' element={<Ingredients />} />
    </Routes>
  );
}

export default App;

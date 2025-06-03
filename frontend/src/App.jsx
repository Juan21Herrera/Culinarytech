import { Routes, Route } from 'react-router-dom';
import './App.css';
import Login from './pages/user/Login';
import Register from './pages/user/Register';
import Forgot from './pages/user/Forgot';
import Home from './pages/Home';
import Profile from './pages/user/Profile';
import Fridge from './pages/Fridge';
import Ingredients from './pages/Ingredients';
import Recipes from './pages/Recipes';
import Shop from './pages/Shop';


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
      <Route path='/recipes' element={<Recipes />}/>
      <Route path='/shopping' element={<Shop />}/>
    </Routes>
  );
}

export default App;

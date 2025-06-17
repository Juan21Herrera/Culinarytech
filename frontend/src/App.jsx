import { Routes, Route } from 'react-router-dom';
import './App.css';

// Layout
import Layout from './layout/Layout';

// Pages 
import Home from './pages/Home';
import Recipes from './pages/Recipes';
import Ingredients from './pages/Ingredients';
import Fridge from './pages/Fridge';

// Auth
import Login from './pages/user/Login';
import Register from './pages/user/Register';

// User
import Profile from './pages/user/Profile';



function App() {
  return (
    <Routes>

      {/* Auth */}
      <Route path='/login' element={<Login />} />
      <Route path='/register' element={<Register />} />

      {/* Main routes */}
        <Route path='/' element={<Layout><Home /></Layout>} />
        <Route path='/recipes' element={<Layout><Recipes /></Layout>} />
        <Route path='/ingredients' element={<Layout><Ingredients /></Layout>} />
        <Route path='/fridge' element={<Layout><Fridge /></Layout>} />


      {/* User */}
      <Route path='/profile' element={<Layout><Profile /></Layout>} />
      




    </Routes>
  );
}

export default App;

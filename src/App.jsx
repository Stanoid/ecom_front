import { useState,useEffect } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Register from './components/auth/Register';
import Admin from './components/admin';
import Login from './components/auth/Login';
import { useCookies } from 'react-cookie';
import OrderComfirmation from './components/orderConfirmation';
import Profile from './components/profile';
import NavBar from './components/layout/navbar';
import Orders from './components/orders';
import Checkout from './components/checkout';
import ProductDetails from './components/product';
function App() {
  const [count, setCount] = useState(0);
  const [email, setUsername] = useState('test@example.com');
  const [password, setPassword] = useState('password');
  const [loginError, setLoginError] = useState(null);

useEffect(() => {
  return () => {
  
  }
}, [])



  
  return (
<>
<BrowserRouter>
<NavBar/>
<Routes>
  <Route path='/' element={<Home/>}  ></Route>
  <Route path='/login' element={<Login/>}  ></Route>
  <Route path='/register' element={<Register/>}  ></Route>
  <Route path='/admin' element={<Admin/>}  ></Route>
  <Route path='/product' element={<ProductDetails/>}  ></Route>
  <Route path='/checkout' element={<Checkout/>}  ></Route>
  <Route path='/orders' element={<Orders/>}  ></Route>
  <Route path='/orderConfirmation' element={<OrderComfirmation/>}  ></Route>
  <Route path='/profile' element={<Profile/>}  ></Route>


</Routes>
</BrowserRouter>
</>
  )
}

export default App

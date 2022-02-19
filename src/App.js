import React, { useState } from 'react';
import {AppBar,TextField,Button} from '@material-ui/core'
import './App.css'
import im from './images/table.jpeg'
import Login from './components/Login'
import Register from './components/Register'
import Connections from './components/Connections'
import Jobs from './components/Jobs'
import {BrowserRouter,Routes,Route,Link,useNavigate} from 'react-router-dom'
import {useEffect} from 'react'
import { loadUser } from './actions/userActions';
import { useDispatch,useSelector } from 'react-redux';

const App = () => {
  const { isAuthenticated, user } = useSelector((state) => state.user);
  console.log(user)
 const dispatch=useDispatch()
useEffect(()=>{
  dispatch(loadUser())
},[])
  return (
<>
<BrowserRouter>
<Routes>
  <Route path='/' element={<Login/>}/>
  <Route path='/register' element={<Register/>}/>
  <Route path='/connections' element={<Connections/>}/>
  <Route path='/Jobs' element={<Jobs/>}/>
</Routes>
</BrowserRouter>
</>
  );
}
export default App
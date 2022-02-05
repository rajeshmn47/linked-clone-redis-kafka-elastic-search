import React, { useState } from 'react';
import {AppBar,TextField,Button} from '@material-ui/core'
import './App.css'
import im from './images/table.jpeg'
import Login from './components/Login'
import Register from './components/Register'
import {BrowserRouter,Routes,Route,Link,useNavigate} from 'react-router-dom'
import {useEffect} from 'react'

const App = () => {
 
  const [user,setUser]=useState(true)


 
  return (
<>
<BrowserRouter>
<Routes>
  <Route path='/' element={<Login/>}/>
  <Route path='/register' element={<Register/>}/>
</Routes>
</BrowserRouter>
</>
  );
}
export default App
import React, { useState } from 'react';
import {AppBar,TextField,Button} from '@material-ui/core'
import './App.css'
import im from './images/table.jpeg'
import Login from './components/Login'
import Register from './components/Register'
import Messaging from './components/Messaging'
import Connections from './components/Connections'
import Home from './components/Home'
import Jobs from './components/Jobs'
import {BrowserRouter,Routes,Route,Link,useNavigate} from 'react-router-dom'
import {useEffect} from 'react'
import { loadUser } from './actions/userActions';
import { useDispatch,useSelector } from 'react-redux';
import Navbar from './components/Navbar'
import Notifications from './components/Notifications';
import Editprofile from './components/Editprofile';
import store from './store'

const App = () => {
 
  const { isAuthenticated, user } = useSelector((state) => state.user);
  console.log(user)
 const dispatch=useDispatch()
 useEffect(async()=>{
  store.dispatch(loadUser());
      },[dispatch])
  return (
<>
<BrowserRouter>
<Navbar />
<Routes>
  <Route path='/' element={<Login/>}/>
  <Route path='/register' element={<Register/>}/>
  <Route path='/connections' element={<Connections/>}/>
  <Route path='/Jobs' element={<Jobs/>}/>
  <Route path='/home' element={<Home/>}/>
  <Route path='/messaging' element={<Messaging/>}/>
  <Route path='/jobs' element={<Jobs/>}/>
  <Route path='/editprofile' element={<Editprofile/>}/>
<Route path='/notifications' element={<Notifications/>}/>
</Routes>
</BrowserRouter>
</>
  );
}
export default App
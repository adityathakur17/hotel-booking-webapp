import React from 'react'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import IndexPage from './pages/IndexPage.jsx'
import LoginPage from './pages/LoginPage.jsx'
import Layout from './Layout.jsx'

import {createBrowserRouter, createRoutesFromElements, Route, RouterProvider} from 'react-router-dom'
import RegisterPage from './pages/RegisterPage.jsx'
import { UserContextProvider } from './UserContext.jsx'
import ProfilePage from './pages/ProfilePage.jsx'
import PlacesPage from './pages/PlacesPage.jsx'
import PlacesFormPage from './pages/PlacesFormPage.jsx'


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<Layout/>}>
      <Route path='' element={<IndexPage/>} />
      <Route path='login' element={<LoginPage/>}/>
      <Route path='register' element={<RegisterPage/>}/>
      <Route path='account' element={<ProfilePage/>}/>
      <Route path='/account/places' element={<PlacesPage/>}/>
      <Route path='/account/places/new' element={<PlacesFormPage/>}/> 
      <Route path='/account/places/:id' element={<PlacesFormPage/>}/> 
     
    </Route>
  )
)

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <UserContextProvider>
    <RouterProvider router={router} />
    <App/>
    </UserContextProvider>
  </React.StrictMode>,
    
  

  
)

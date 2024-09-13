import React from 'react'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import IndexPage from './pages/IndexPage.jsx'
import LoginPage from './pages/LoginPage.jsx'
import AccountPage from './pages/AccountPage.jsx'
import Layout from './Layout.jsx'

import {createBrowserRouter, createRoutesFromElements, Route, RouterProvider} from 'react-router-dom'
import RegisterPage from './pages/RegisterPage.jsx'
import { UserContextProvider } from './UserContext.jsx'


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<Layout/>}>
      <Route path='' element={<IndexPage/>} />
      <Route path='login' element={<LoginPage/>}/>
      <Route path='register'element={<RegisterPage/>}/>
      <Route path='account/:subpage?'element={<AccountPage/>}/>
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

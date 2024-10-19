import React, { useContext, useState } from 'react'
import { UserContext } from '../UserContext.jsx'
import axios from 'axios'
import { Navigate,Link, useParams } from 'react-router-dom'
import PlacesPage from './PlacesPage.jsx'
import AccountNav from './AccountNav.jsx'

export default function ProfilePage() {
  const [redirect, setRedirect] = useState(null)
  const {ready,user, setUser} = useContext(UserContext)
  let { subpage} = useParams(); // useParams should be called early to avoid re-ordering issues
  if(subpage === undefined){
    subpage = 'profile'
  }
  
  async function logout(){
    await axios.post('/logout',{},{ withCredentials: true })
    setRedirect('/')
    setUser(null)
  }

  if(!ready){
    return 'Loading...'
  }


  if(ready && !user && !redirect){
    return <Navigate to={'/login'} />
  }


  if(redirect){ 
    return <Navigate to={redirect} />
  }

  return (
    <div>
      <AccountNav />
      {subpage === 'profile' && (
        <div className='text-center max-w-lg mx-auto'>
          Logged in as {user.name} ({user.email})
          <button onClick={logout} className='primary max-w-md mt-2'>Logout</button>
        </div>
      )}

      {subpage === 'places' && (
        <div>
          <PlacesPage/>
        </div>
      )}
    </div>
  )
}

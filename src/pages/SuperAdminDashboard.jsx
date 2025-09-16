import React from 'react'
import LogoutButton from '../components/LogoutButton'
import SuperAdminNavbar from '../components/Navbar/SuperAdminNavbar'

const SuperAdminDashboard = () => {
  return (
    <div>
      <SuperAdminNavbar/>
      < LogoutButton />
    </div>
  )
}

export default SuperAdminDashboard

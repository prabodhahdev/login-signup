import React from 'react'
import AddUsers from '../../components/admin/AddUsers'

const AddUserPage = () => {
  return (
    <div>
      <AddUsers canAddRoles={["user"]} />  
    </div>
  )
}

export default AddUserPage

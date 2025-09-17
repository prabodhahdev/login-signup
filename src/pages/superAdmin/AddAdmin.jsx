import React from 'react'
import AddUsers from '../../components/admin/AddUsers'

const AddAdmin = () => {
  return (
    <div>
      <AddUsers canAddRoles={["superadmin","admin"]} />
    </div>
  )
}

export default AddAdmin

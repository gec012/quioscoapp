import SuperAdminLayout from '@/layout/SuperAdminLayout'
import React from 'react'
import Users from '@/components/Users'

function users() {
  return (
    <SuperAdminLayout>
        <Users></Users>
    </SuperAdminLayout>
  )
}

export default users
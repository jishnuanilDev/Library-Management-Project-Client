
import React from "react"

import AdminLoginForm from "../components/admin/forms/AdminLogin"
import ProtectedAdminLayout from "../utils/protectedAdminRoute"
function AdminLoginPage() {
  return (
    <div>
   
      <ProtectedAdminLayout>
      <AdminLoginForm/>
      </ProtectedAdminLayout>
      
    </div>
  )
}

export default AdminLoginPage

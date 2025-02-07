
import React from 'react'
import ProtectedLayout from "../utils/protectedRoute";
import LoginForm from '../components/user/forms/LoginForm'
function UserLoginForm() {
  return (
    <div>
      <ProtectedLayout>
      <LoginForm/>
      </ProtectedLayout>
 
    </div>
  )
}

export default UserLoginForm

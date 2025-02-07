
import React from 'react'
import ProtectedLayout from "../utils/protectedRoute";
import SignUpForm from '../components/user/forms/RegisterForm'
import PLayout from '../utils/protected';
function UserSignUpForm() {
  return (
    <div>
<PLayout>
<SignUpForm/>
</PLayout>
    
  
 
    </div>
  )
}

export default UserSignUpForm


import AdminDashNav from '../components/admin/layouts/AdminDashNav'
import BookListCard from '../components/user/cards/bookListCard'
import AdminDataTable from '../components/admin/tables/DashBoardTable'
import ProtectedAdminLayout from "../utils/protectedAdminRoute"
import React from 'react'
function AdminDashBoardPage() {

  return (

    <>
    <nav>
      <ProtectedAdminLayout>
      <AdminDashNav/>
      </ProtectedAdminLayout>
  
    </nav>



    </>
   
  )
}

export default AdminDashBoardPage

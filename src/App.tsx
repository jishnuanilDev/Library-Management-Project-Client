
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css'
;
import UserLoginForm from "./pages/UserLoginForm";
import UserSignUpForm from "./pages/UserRegisterForm";
import UserHomePage from "./pages/UserHomePage";
import AdminLoginPage from "./pages/AdminLoginForm";
import AdminDashBoardPage from "./pages/AdminDashBoard";
import BorrowedHistoryPage from "./pages/BorrowedHistoryPage";
import BorrowedBooksPage from "./pages/BorrowedBooksPage";
function App() {

  return (
    <>
      <Router>
      <Routes>
      <Route path="/" element={<UserHomePage/>} />
        <Route path="/login" element={<UserLoginForm/>} />
        <Route path="/sign-up" element={<UserSignUpForm/>} />
        <Route path="/dashboard" element={<UserHomePage/>} />
        <Route path="/dashboard/borrowed-history" element={<BorrowedHistoryPage/>} />
        <Route path="/dashboard/borrowed-books" element={<BorrowedBooksPage/>} />
        <Route path="/admin" element={<AdminLoginPage/>} />
        <Route path="/admin/dashboard" element={<AdminDashBoardPage/>} />
     
      </Routes>
    </Router>
    </>
  )
}

export default App

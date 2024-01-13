import { Navigate, Route, Routes } from "react-router-dom"
import { AdminPage, TraductorPage, UsersPage } from "../pages/"

export const TraductorRoutes = () => {
  return (
    <Routes>
        <Route path="/" element={<TraductorPage/>}/>
        <Route path="/admin" element={<AdminPage/>}/>
        <Route path="users" element={<UsersPage/>}/>
    </Routes>
  )
}

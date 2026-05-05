import {Routes, Route , Navigate } from 'react-router-dom'
import CompletedPage from './pages/About'
import Home from './pages/Home'

export const useRoutes = () =>{
    return(
        <Routes>
            <Route path= '/' element ={<Home/>}/>
            <Route path= '/completedpage' element ={<CompletedPage/>}/>
            <Route path= "*" element={<Navigate to="/"/>}/>
        </Routes>
    )
}
import React from 'react'
import {  Route, Routes, BrowserRouter } from "react-router-dom";
import Doctor from './pages/Doctor';
import DoctorDetails from './pages/DoctorDetails';
import DoctorSignUp from './pages/DoctorSignUp';
const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
            <Route path='/'  element = {<Doctor/>} ></Route>
            <Route path='/doctor/:doctorId' element = {<DoctorDetails/>} ></Route>
            <Route path='/signup' element = {<DoctorSignUp/>} />
        </Routes>
      </BrowserRouter>

    </div>
  )
}

export default App

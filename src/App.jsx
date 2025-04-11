import React from 'react'
import { BrowserRouter as Router, Route, Routes, BrowserRouter } from "react-router-dom";
import Doctor from './pages/Doctor';
import DoctorDetails from './pages/DoctorDetails';
const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
            <Route path='/'  element={<Doctor/>} ></Route>
            <Route path='/doctor/:doctorId' element= {<DoctorDetails/>} ></Route>
        </Routes>
      </BrowserRouter>

    </div>
  )
}

export default App

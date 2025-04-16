
import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Doctor from '../pages/Doctor';
import DoctorDetails from '../pages/DoctorDetails';
import Navbar from '../components/ui/Navbar';
import PatientSignUp from '../pages/PatientSignUp';
import Login from '../pages/Login';
import MyAppointment from '../pages/MyAppointment';

const hiddenNavbarRoutes = ['/signup', "/login"];

const Layout = () => {
  const { pathname } = useLocation();
  const shouldHideNavbar = hiddenNavbarRoutes.some(route => pathname.startsWith(route));

  return (
    <>
      {!shouldHideNavbar && <Navbar/>}
      <Routes>
        <Route path="/" element={<Doctor />} />
        <Route path="/doctor/:doctorId" element={<DoctorDetails />} />
        <Route path="/patient/signup" element={<PatientSignUp />} />
        <Route path='/login' element={<Login/>}/>
        <Route path='/myAppointments' element={<MyAppointment/>}/>
      </Routes>
    </>
  );
};

export default Layout;

// src/components/Layout.jsx
import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Doctor from '../pages/Doctor';
import DoctorDetails from '../pages/DoctorDetails';
import DoctorSignUp from '../pages/DoctorSignUp';
import Navbar from '../components/ui/Navbar';
import PatientSignUp from '../pages/PatientSignUp';

const hiddenNavbarRoutes = ['/signup', '/patient/signup'];

const Layout = () => {
  const { pathname } = useLocation();
  const shouldHideNavbar = hiddenNavbarRoutes.some(route => pathname.startsWith(route));

  return (
    <>
      {!shouldHideNavbar && <Navbar/>}
      <Routes>
        <Route path="/" element={<Doctor />} />
        <Route path="/doctor/:doctorId" element={<DoctorDetails />} />
        <Route path="/signup" element={<DoctorSignUp />} />
        <Route path="/patient/signup" element={<PatientSignUp />} />
      </Routes>
    </>
  );
};

export default Layout;

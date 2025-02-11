import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import './index.css';
import App from './App';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/User/Homepage';
import AboutUs from './pages/User/aboutus';
import Contact from './pages/User/contact';
import Doctors from './pages/User/doctors';
import News from './pages/User/news';
import Services from './pages/User/services';
import Login from './pages/User/login';
import Signup from './pages/User/signup';
import Appointment from './pages/User/appointment';
import DoctorProfile from './pages/User/doctorsprofile';
import Settings from './pages/User/settings';
import EditProfile from './pages/User/editprofile';
import ChangePassword from './pages/User/passwordchange';
import ForgotPassword from './pages/User/ForgotPassword';
import ResetPassword from './pages/User/ResetPassword';
import ProfilePage from './pages/User/ProfilePage';
import LaboratoryDetailsForm from './pages/Laboratory/laboratoryform';
import Laboratorypage from './pages/Laboratory/laboratory'
import Admin from './pages/Admin/admin';
import DoctorForm from './pages/Doctor/doctorform';
import Doctorlogin from './pages/Doctor/doctor-login';
import Chooseaccount from './pages/User/choose_account';
import Laboratorylogin from './pages/Laboratory/laboratory_login';
import AppointmentList from './pages/Doctor/appointments_list';
import DoctorSettingd from './pages/Doctor/doctor_settings';
import DoctorChangePassword from './pages/Doctor/doctor_passwordchange';
import DoctorForgotPassword from './pages/Doctor/doctor_ForgotPassword';
import DoctorResetPassword from './pages/Doctor/doctor_resetpassword';

const Layout = ({ children }) => {
  const location = useLocation();

  // Specify paths where Navbar and Footer should be hidden
  const hideNavbarFooter = location.pathname === '/passwordchange' || location.pathname === '/doctor_passwordchange' || location.pathname === '/editprofile' || location.pathname === '/ForgotPassword' || location.pathname === '/doctor_ForgotPassword' || location.pathname ==='/admin' || location.pathname.startsWith('/resetpassword/') || location.pathname.startsWith('/doctor_resetpassword/')  ;
  const hideFooter = location.pathname.startsWith('/ProfilePage/') || location.pathname === '/settings' || location.pathname === '/doctor_settings';
  return (
    <>
      {!hideNavbarFooter && <Navbar />}
      {children}
      {!hideNavbarFooter && !hideFooter && <Footer />}
      
    

    </>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
      <Layout>
        <Routes>
            <Route index element={<App />} />
            <Route path='Homepage' element={<Home />} />
            <Route path='aboutus' element={<AboutUs />} />
            <Route path='contact' element={<Contact />} />
            <Route path='doctors' element={<Doctors />} />
            <Route path='news' element={<News />} />
            <Route path='services' element={<Services />} />
            <Route path='login' element={<Login />} />
            <Route path='signup' element={<Signup />} />
            <Route path='appointment' element={<Appointment />} />
            <Route path='doctorsprofile' element={<DoctorProfile />} />
            <Route path='settings' element={<Settings />} />
            <Route path='editprofile' element={<EditProfile />} />
            <Route path='passwordchange' element={<ChangePassword />} />
            <Route path="forgotpassword" element={<ForgotPassword />} />
            <Route path="/resetpassword/:token" element={<ResetPassword />} />
            <Route path="/profilepage/:token" element={<ProfilePage />} />
            <Route path="/laboratoryform" element={<LaboratoryDetailsForm />} />
            <Route path="/laboratory" element={<Laboratorypage />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/doctorform" element={<DoctorForm />} />
            <Route path="/doctor-login" element={<Doctorlogin />} />
            <Route path="/choose_account" element={<Chooseaccount />} />
            <Route path="/laboratory_login" element={<Laboratorylogin />} />
            <Route path="/appointments_list" element={<AppointmentList />} />
            <Route path="/doctor_settings" element={<DoctorSettingd />} />
            <Route path="/doctor_passwordchange" element={<DoctorChangePassword />} />
            <Route path="/doctor_ForgotPassword" element={<DoctorForgotPassword />} />
            <Route path="/doctor_resetpassword/doctor/:token" element={<DoctorResetPassword />} />
        </Routes>
      </Layout>
    </Router>
  </React.StrictMode>
);

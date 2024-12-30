import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import './index.css';
import App from './App';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import AboutUs from './pages/aboutus';
import Contact from './pages/contact';
import Doctors from './pages/doctors';
import News from './pages/news';
import Services from './pages/services';
import Login from './pages/login';
import Signup from './pages/signup';
import Appointment from './pages/appointment';
import DoctorProfile from './pages/doctorsprofile';
import Settings from './pages/settings';
import EditProfile from './pages/editprofile';
import ChangePassword from './pages/passwordchange';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import ProfilePage from './pages/ProfilePage';
import LaboratoryDetailsForm from './pages/laboratoryform';
import Laboratorypage from './pages/laboratory'
import Admin from './pages/admin';
import DoctorForm from './pages/doctorform';

const Layout = ({ children }) => {
  const location = useLocation();

  // Specify paths where Navbar and Footer should be hidden
  const hideNavbarFooter = location.pathname === '/passwordchange' || location.pathname === '/editprofile' || location.pathname === '/ForgotPassword' || location.pathname ==='/admin'|| location.pathname.startsWith('/resetpassword/');
  const hideFooter = location.pathname.startsWith('/ProfilePage/') || location.pathname === '/settings' ;
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
        </Routes>
      </Layout>
    </Router>
  </React.StrictMode>
);

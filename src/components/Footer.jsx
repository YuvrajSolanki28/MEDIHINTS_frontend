import React from 'react';
import { Facebook, Instagram, Linkedin, Send } from "lucide-react"
import { useNavigate } from 'react-router-dom';

export default function Footer() {
  const navigate = useNavigate();
  return (
    <footer className="bg-blue-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h2 className="text-2xl font-bold mb-2">MEDIHINTS</h2>
            <p className="text-sm">
              Leading the Way in Medical Excellence, Trusted Care.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Important Links</h3>
            <ul className="space-y-2">
              <li><button onClick={()=>navigate("/appointment")} className="hover:text-blue-300">Appointment</button></li>
              <li><button onClick={()=>navigate("/doctors")} className="hover:text-blue-300">Doctors</button></li>
              <li><button onClick={()=>navigate("/services")} className="hover:text-blue-300">Services</button></li>
              <li><button onClick={()=>navigate("/aboutus")} className="hover:text-blue-300">About Us</button></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <p>Call: (237) 681-812-255</p>
            <p>Email: fildineesoe@gmail.com</p>
            <p>Address: 0123 Some place</p>
            <p>Some country</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Newsletter</h3>
            <div className="flex">
              <input
                type="email"
                placeholder="Enter your email address"
                className="bg-blue-800 text-white border-blue-700 flex-grow"
              />
              <button type="submit" variant="ghost" size="icon" className="ml-2">
                <Send className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
        <hr className="my-8 border-blue-800" />
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm">
            © 2024 Hospital's name All Rights Reserved by ABC-LTD
          </p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <a href="/" className="hover:text-blue-300">
              <Linkedin className="h-5 w-5" />
            </a>
            <a href="/" className="hover:text-blue-300">
              <Facebook className="h-5 w-5" />
            </a>
            <a href="/" className="hover:text-blue-300">
              <Instagram className="h-5 w-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
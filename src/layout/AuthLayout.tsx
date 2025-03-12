import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../components/Header';
import { isLoggedIn } from '../utils/authUtils';
import Footer from "../pages/Home/Footer";

export default function AuthLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div>
      {isLoggedIn() && (
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      )}
      <Outlet />
      <Footer />
    </div>
  );
}

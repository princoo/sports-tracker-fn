import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Header from "../components/Header";

export default function AuthLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div>
      <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <Outlet />
    </div>
  );
}

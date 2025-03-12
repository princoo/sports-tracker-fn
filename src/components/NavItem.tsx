import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { decodeToken } from '../utils/authUtils';

interface NavItemProps {
  label: string;
  path: string;
  pathName: string;
  requiredRole: string[];
  icon: React.ReactNode;
}

const NavItem: React.FC<NavItemProps> = ({
  label,
  path,
  pathName,
  requiredRole,
  icon,
}) => {
  const location = useLocation();
  const { pathname } = location;
  const decodedUser = decodeToken();
  // Render the nav item only if the user role matches the required role
  if (!requiredRole.includes(decodedUser?.role.roleName!)) {
    return null; // Don't render anything if the role doesn't match
  }

  return (
    <li>
      <NavLink
        to={path}
        className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-theme-secondary hover:text-white dark:hover:bg-meta-4 ${
          pathname.includes(pathName) && 'bg-white text-gray-800 dark:text-white dark:bg-meta-4'
        }`}
      >
        {icon}
        {label}
      </NavLink>
    </li>
  );
};

export default NavItem;

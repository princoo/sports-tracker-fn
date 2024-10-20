import { Navigate } from 'react-router-dom';
import { decodeToken } from '../../utils/authUtils';

interface ProtectedRouteProps {
  element: React.ReactElement;
  requiredRole: string[];
}

const ProtectedRoute = ({ element, requiredRole }: ProtectedRouteProps) => {
  const decodedUser = decodeToken();
  if (!requiredRole.includes(decodedUser?.role.roleName!)) {
    // Redirect to "Not Authorized" page if the user doesn't have the correct role
    return <Navigate to="/not-authorized" />;
  }
  // Render the route element if the user has the required role
  return element;
};

export default ProtectedRoute;

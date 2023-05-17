import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';

function ProtectedRoute({ component: Component }) {
  const { user } = useContext(AuthContext);

  return user ? <Component /> : <Navigate to="/login" />;
}

export default ProtectedRoute;
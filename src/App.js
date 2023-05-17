import { ChakraProvider } from '@chakra-ui/react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import AuthLayout from './layouts/AuthLayout';
import HomePage from './components/HomePage';
import LoginPage from './components/LoginPage';
import { AuthProvider } from './contexts/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <ChakraProvider>
      <AuthProvider>
        <Router>
          <Routes>
            <Route path="/*" element={<ProtectedRoute component={MainLayout} />}>
              <Route index element={<HomePage />} />
              <Route path="home" element={<HomePage />} />
              {/* ...其他主要页面的路由 */}
            </Route>
            <Route path="/login" element={<AuthLayout />}>
              <Route index element={<LoginPage />} />
              {/* ...其他认证页面的路由 */}
            </Route>
          </Routes>
        </Router>
      </AuthProvider>
    </ChakraProvider>
  );
}


export default App; 
import { Navigate } from 'react-router-dom';

const Protection = ({ children }) => {
  const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";
  return isAuthenticated ? children : <Navigate to="/login" />;
};

export default Protection;

import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

function AdminRoute({ children }) {

  const { admin } = useSelector((state) => state.auth);

  if (!admin) {
    return <Navigate to="/login" />;
  }

  return children;

}

export default AdminRoute;
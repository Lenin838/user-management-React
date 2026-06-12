import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

function PublicRoute({ children }) {

  const { user } = useSelector((state) => state.auth);

  if (user) {
    return <Navigate to="/" />;
  }

  return children;

}

export default PublicRoute;
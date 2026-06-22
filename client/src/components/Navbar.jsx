import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout, loginSuccess } from "../features/authSlice";
import { Link, useNavigate, useLocation } from "react-router-dom";
import API from "../services/api";
import { toast } from "react-toastify";

function Navbar() {

  const dispatch = useDispatch();
  const { user, token, admin, adminToken } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogoutUser = () => {
    dispatch(logout("user"));
    navigate("/login");
  };

  const handleLogoutAdmin = () => {
    dispatch(logout("admin"));
    navigate("/login");
  };

  useEffect(() => {
    const syncUserSession = async () => {
      if (token) {
        try {
          const res = await API.get("/users/profile", {
            headers: {
              Authorization: `Bearer ${token}`
            }
          });
          dispatch(loginSuccess({ user: res.data, token }));
        } catch (error) {
          if (error.response?.status === 401) {
            dispatch(logout("user"));
            toast.error("Your session has expired or your account has been deleted.");
            navigate("/login");
          }
        }
      }
    };

    const syncAdminSession = async () => {
      if (adminToken) {
        try {
          const res = await API.get("/users/profile", {
            headers: {
              Authorization: `Bearer ${adminToken}`
            }
          });
          dispatch(loginSuccess({ user: res.data, token: adminToken }));
        } catch (error) {
          if (error.response?.status === 401) {
            dispatch(logout("admin"));
            toast.error("Admin session has expired.");
            navigate("/login");
          }
        }
      }
    };

    syncUserSession();
    syncAdminSession();
  }, [location.pathname, token, adminToken, dispatch, navigate]);

  
  const showAdminNav = location.pathname.startsWith("/admin") && admin;

  const showUserNav = !showAdminNav && user;

  const showFallbackAdminNav = !showAdminNav && !user && admin;

  return (
    <nav className="bg-red-500 text-white px-6 py-3 shadow-md fixed top-0 w-full z-50">

      <div className="max-w-6xl mx-auto flex justify-between items-center">

        {/* Logo / Home */}
        <Link to="/" className="text-xl font-bold">
          BCE224
        </Link>

        <div className="flex items-center gap-6">

          {!showUserNav && !showAdminNav && !showFallbackAdminNav && (
            <>
              <Link
                to="/login"
                className="hover:text-gray-300 transition"
              >
                Login
              </Link>

              <Link
                to="/register"
                className="hover:text-gray-300 transition"
              >
                Register
              </Link>
            </>
          )}

          {showUserNav && (
            <>
              <img
                src={
                  user.profileImage
                    ? `http://localhost:5000/${user.profileImage}`
                    : "https://i.pravatar.cc/40"
                }
                className="w-8 h-8 rounded-full object-cover"
                alt="user avatar"
              />

              <span className="font-semibold">
                Hi, {user.name}
              </span>

              <Link
                to="/profile"
                className="hover:text-gray-300 transition"
              >
                Profile
              </Link>

              <button
                onClick={handleLogoutUser}
                className="bg-gray-500 px-3 py-1 rounded hover:bg-gray-600 transition"
              >
                Logout
              </button>
            </>
          )}

          {(showAdminNav || showFallbackAdminNav) && (
            <>
              <span className="font-semibold text-yellow-300">
                Admin: {admin.name}
              </span>

              <Link
                to="/admin"
                className="hover:text-gray-300 transition"
              >
                Admin Dashboard
              </Link>



              <button
                onClick={handleLogoutAdmin}
                className="bg-red-700 px-3 py-1 rounded hover:bg-red-800 transition"
              >
                Logout Admin
              </button>
            </>
          )}

        </div>

      </div>

    </nav>
  );

}

export default Navbar;
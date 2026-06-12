import { useDispatch, useSelector } from "react-redux";
import { logout } from "../features/authSlice";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function Navbar() {

  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <nav className="bg-red-500 text-white px-6 py-3 shadow-md fixed top-0 w-full z-50">

      <div className="max-w-6xl mx-auto flex justify-between items-center">

        {/* Logo / Home */}
        <Link to="/" className="text-xl font-bold">
          BCE224
        </Link>

        <div className="flex items-center gap-6">

          {!user && (
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

          {user && (
            <>

              <img
                src={
                  user.profileImage
                    ? `http://localhost:5000/${user.profileImage}`
                    : "https://i.pravatar.cc/40"
                }
                className="w-8 h-8 rounded-full"
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
              <Link
                to="/about"
                className="hover:text-gray-300 transition"
              >
                About
              </Link>

              <button
                onClick={handleLogout}
                className="bg-gray-500 px-3 py-1 rounded hover:bg-gray-600 transition"
              >
                Logout
              </button>
            </>
          )}

        </div>

      </div>

    </nav>
  );

}

export default Navbar;
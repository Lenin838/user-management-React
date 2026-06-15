import { useState } from "react";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../features/authSlice";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import { toast } from "react-toastify";

function Login() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async (e) => {

    e.preventDefault();

    try {

      setLoading(true);

      const { data } = await API.post("/users/login", {
        email,
        password
      });

      dispatch(loginSuccess(data));

      toast.success("Login successful")

      if (data.user.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/");
      }

    } catch (error) {

      if (error.response?.data?.errors) {
        setErrors(error.response.data.errors);
        toast.error(error.response.data.message || "Please fill the required fields");
      } else {
        toast.error(error.response?.data?.message || "Login failed");
      }

    } finally {
      setLoading(false);
    }

  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-300">

      <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-8">

        <h2 className="text-2xl font-bold text-center mb-6">
          Login
        </h2>

        <form onSubmit={handleLogin} className="space-y-4">

          <div>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (errors.email) setErrors((prev) => ({ ...prev, email: "" }));
              }}
              className={`w-full border rounded-md p-2 focus:outline-none focus:ring-2 ${
                errors.email
                  ? "border-red-600 focus:ring-red-600 bg-red-50"
                  : "border-red-300 focus:ring-red-500"
              }`}
            />
            {errors.email && (
              <p className="text-red-500 text-xs mt-1 pl-1 font-medium">{errors.email}</p>
            )}
          </div>

          <div>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                if (errors.password) setErrors((prev) => ({ ...prev, password: "" }));
              }}
              className={`w-full border rounded-md p-2 focus:outline-none focus:ring-2 ${
                errors.password
                  ? "border-red-600 focus:ring-red-600 bg-red-50"
                  : "border-red-300 focus:ring-red-500"
              }`}
            />
            {errors.password && (
              <p className="text-red-500 text-xs mt-1 pl-1 font-medium">{errors.password}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-red-500 text-white py-2 rounded-md hover:bg-red-600 transition"
          >
            {loading ? "Logging in..." : "Login"}
          </button>

        </form>

      </div>

    </div>
  )

}

export default Login;
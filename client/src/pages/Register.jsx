import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../services/api";
import { toast } from "react-toastify";

function Register() {

  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e) => {

    e.preventDefault();

    try {

      setLoading(true);

      await API.post("/users/register", {
        name,
        email,
        password
      });

      toast.success("Registration successful");

      navigate("/login");

    } catch (error) {

      if (error.response?.data?.errors) {
        setErrors(error.response.data.errors);
        toast.error(error.response.data.message || "Please fill the required fields");
      } else {
        toast.error(error.response?.data?.message || "Register Failed");
      }

    } finally {
      setLoading(false);
    }

  };

  return (

    <div className="min-h-screen flex items-center justify-center bg-gray-300">

      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">

        <h2 className="text-2xl font-bold text-center mb-6">
          Register
        </h2>

        <form onSubmit={handleRegister} className="space-y-4">

          <div>
            <input
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                if (errors.name) setErrors((prev) => ({ ...prev, name: "" }));
              }}
              className={`w-full border rounded-md p-2 focus:outline-none focus:ring-2 ${
                errors.name
                  ? "border-red-600 focus:ring-red-600 bg-red-50"
                  : "border-red-300 focus:ring-red-500"
              }`}
            />
            {errors.name && (
              <p className="text-red-500 text-xs mt-1 pl-1 font-medium">{errors.name}</p>
            )}
          </div>

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
            {loading ? "Registering..." : "Register"}
          </button>

        </form>

        <p className="text-center mt-4 text-sm">

          Already have an account?{" "}

          <Link
            to="/login"
            className="text-gray-500 hover:underline"
          >
            Login
          </Link>

        </p>

      </div>

    </div>

  );

}

export default Register;
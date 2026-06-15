import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

function Home() {

  const { user, admin } = useSelector((state) => state.auth);

  return (

    <div className="min-h-screen flex items-center justify-center bg-gray-300">

      <div className="bg-white shadow-lg rounded-lg p-10 text-center max-w-lg w-full">

        <h1 className="text-4xl font-bold text-gray-600 mb-4">
          Landing Page
        </h1>

        {user ? (

          <div className="space-y-4">

            {/* Avatar */}
            <img
              src={
                user.profileImage
                  ? `http://localhost:5000/${user.profileImage}`
                  : "https://i.pravatar.cc/150"
              }
              alt="avatar"
              className="w-24 h-24 rounded-full object-cover mx-auto border"
            />

            <h3 className="text-xl">
              Welcome <span className="font-semibold">{user.name}</span>
            </h3>

            {admin && (
              <div className="mt-4">
                <Link
                  to="/admin"
                  className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition inline-block"
                >
                  Go to Admin Dashboard
                </Link>
              </div>
            )}

          </div>

        ) : admin ? (

          <div className="space-y-4">

            <h3 className="text-xl">
              Welcome Admin <span className="font-semibold">{admin.name}</span>
            </h3>

            <div className="flex justify-center gap-4 mt-4">
              <Link
                to="/admin"
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
              >
                Admin Dashboard
              </Link>
            </div>

          </div>

        ) : (

          <div className="space-y-4">

            <h3 className="text-lg text-gray-600">
              Please login to continue
            </h3>

            <div className="flex justify-center gap-4">

              <Link
                to="/login"
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
              >
                Login
              </Link>

              <Link
                to="/register"
                className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition"
              >
                Register
              </Link>

            </div>

          </div>

        )}

      </div>

    </div>

  );

}

export default Home;
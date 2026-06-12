import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import API from "../services/api";
import { toast } from "react-toastify";


function AdminDashboard() {

  const { token } = useSelector((state) => state.auth);


  const [selectedUser, setSelectedUser] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState({});

  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);

  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");

  const fetchUsers = async () => {
    try {

      const res = await API.get(`/users?search=${search}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      setUsers(res.data);

    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [search]);

  const handleDelete = (id) => {
    setUserToDelete(id);
    setShowDeleteConfirm(true);
  };

  const confirmDelete = async () => {
    try {
      await API.delete(`/users/${userToDelete}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      toast.success("User deleted successfully");
      fetchUsers();
      setShowDeleteConfirm(false);
      setUserToDelete(null);

    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Failed to delete user");
    }
  };

  const handleEdit = (user) => {
    setSelectedUser(user);
    setName(user.name);
    setEmail(user.email);
    setErrors({});
    setShowModal(true);
  };

  const handleUpdate = async () => {

    try {

      await API.put(`/users/${selectedUser._id}`,
        { name, email },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      toast.success("User updated successfully");
      fetchUsers();
      setShowModal(false);

    } catch (error) {
      console.log(error);
      if (error.response?.data?.errors) {
        setErrors(error.response.data.errors);
        toast.error(error.response.data.message || "Please fill the required feilds");
      } else {
        toast.error(error.response?.data?.message || "Failed to update user");
      }
    }
  };

  return (

  

    <div className="min-h-screen bg-gray-300 p-6 pt-8">

      <div className="max-w-6xl mx-auto bg-white shadow-md rounded-lg p-6">

        <h2 className="text-2xl font-bold mb-6">
          Admin Dashboard
        </h2>

        {/* Search */}

        <input
          type="text"
          placeholder="Search users..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full md:w-80 border p-2 rounded mb-6"
        />

        {/* Table */}

        <div className="overflow-x-auto">

          <table className="min-w-full border border-gray-200">

            <thead className="bg-gray-100">

              <tr>
                <th className="py-3 px-4 border text-left">Image</th>
                <th className="py-3 px-4 border text-left">Name</th>
                <th className="py-3 px-4 border text-left">Email</th>
                <th className="py-3 px-4 border text-center">Actions</th>
              </tr>

            </thead>

            <tbody>

              {users.map((user) => (

                <tr
                  key={user._id}
                  className="hover:bg-gray-50"
                >

                  {/* Avatar */}

                  <td className="py-3 px-4 border">

                    <img
                      src={
                        user.profileImage
                          ? `http://localhost:5000/${user.profileImage}`
                          : "https://i.pravatar.cc/40"
                      }
                      alt="profile"
                      className="w-10 h-10 rounded-full object-cover"
                    />

                  </td>

                  <td className="py-3 px-4 border">
                    {user.name}
                  </td>

                  <td className="py-3 px-4 border">
                    {user.email}
                  </td>

                  <td className="py-3 px-4 border text-center space-x-2">

                    <button
                      onClick={() => handleEdit(user)}
                      className="bg-gray-500 px-3 py-1 rounded hover:bg-gray-600 transition"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => handleDelete(user._id)}
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
                    >
                      Delete
                    </button>

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

      </div>

      {/* Edit Modal */}

      {showModal && (

        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40">

          <div className="bg-white p-6 rounded-lg w-full max-w-md shadow-lg">

            <h2 className="text-xl font-bold mb-4">
              Edit User
            </h2>

            <div className="mb-3">
              <input
                type="text"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  if (errors.name) setErrors((prev) => ({ ...prev, name: "" }));
                }}
                className={`w-full border p-2 rounded focus:outline-none focus:ring-2 ${
                  errors.name
                    ? "border-red-600 focus:ring-red-600 bg-red-50"
                    : "border-gray-300 focus:ring-red-500"
                }`}
                placeholder="Name"
              />
              {errors.name && (
                <p className="text-red-500 text-xs mt-1 pl-1 font-medium">{errors.name}</p>
              )}
            </div>

            <div className="mb-4">
              <input
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (errors.email) setErrors((prev) => ({ ...prev, email: "" }));
                }}
                className={`w-full border p-2 rounded focus:outline-none focus:ring-2 ${
                  errors.email
                    ? "border-red-600 focus:ring-red-600 bg-red-50"
                    : "border-gray-300 focus:ring-red-500"
                }`}
                placeholder="Email"
              />
              {errors.email && (
                <p className="text-red-500 text-xs mt-1 pl-1 font-medium">{errors.email}</p>
              )}
            </div>

            <div className="flex justify-end space-x-2">

              <button
                onClick={() => {
                  setShowModal(false);
                  setErrors({});
                }}
                className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition cursor-pointer"
              >
                Cancel
              </button>

              <button
                onClick={handleUpdate}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition cursor-pointer"
              >
                Save
              </button>

            </div>

          </div>

        </div>

      )}

      {/* Delete Confirmation Modal */}

      {showDeleteConfirm && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
          <div className="bg-white p-6 rounded-lg w-full max-w-md shadow-lg">
            <h2 className="text-xl font-bold mb-4">Confirm Deletion</h2>
            <p className="mb-6 text-gray-600">
              Are you sure you want to delete this user? This action cannot be undone.
            </p>
            <div className="flex justify-end space-x-2">
              <button
                onClick={() => {
                  setShowDeleteConfirm(false);
                  setUserToDelete(null);
                }}
                className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition cursor-pointer"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

export default AdminDashboard;
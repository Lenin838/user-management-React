import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import API from "../services/api";
import { loginSuccess } from "../features/authSlice";
import { toast } from "react-toastify";

function Profile() {

  const { user, token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [error, setError] = useState("");

  const handleUpload = async (e) => {

    e.preventDefault();

    if (!image) {
      const msg = "Please select an image first";
      setError(msg);
      toast.error(msg);
      return;
    }

    const formData = new FormData();
    formData.append("profileImage", image);

    try {

      const res = await API.post("/users/upload", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data"
        }
      });

      dispatch(loginSuccess({
        user: {
          ...user,
          profileImage: res.data.profileImage
        },
        token
      }));

      toast.success("Profile image updated successfully");

    } catch (error) {

      const msg = error?.response?.data?.message || "Upload failed";
      setError(msg);
      toast.error(msg);

    }

  };

  const handleImageChange = (e) => {
    setError("");
    const file = e.target.files[0];

    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    } else {
      setImage(null);
      setPreview(null);
    }

  };

  return (

    <div className="min-h-screen flex items-center justify-center bg-gray-300">

      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">

        <h2 className="text-2xl font-bold text-center mb-6">
          Profile
        </h2>

        <div className="flex flex-col items-center mb-6">

          <img
            src={
              preview
                ? preview
                : user.profileImage
                ? `http://localhost:5000/${user.profileImage}`
                : "https://i.pravatar.cc/150"
            }
            alt="profile"
            className="w-32 h-32 rounded-full object-cover border"
          />

        </div>

        <div className="space-y-2 mb-6 text-center">

          <p className="font-semibold">
            Name: <span className="font-normal">{user.name}</span>
          </p>

          <p className="font-semibold">
            Email: <span className="font-normal">{user.email}</span>
          </p>

        </div>

        <form onSubmit={handleUpload} className="space-y-4">

          <div>
            <input
              type="file"
              onChange={handleImageChange}
              accept="image/jpeg,image/png,image/gif,image/webp"
              className={`w-full border p-2 rounded focus:outline-none focus:ring-2 ${
                error
                  ? "border-red-600 focus:ring-red-600 bg-red-50"
                  : "border-gray-300 focus:ring-red-500"
              }`}
            />
            {error && (
              <p className="text-red-500 text-xs mt-1 pl-1 font-medium">{error}</p>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-red-500 text-white py-2 rounded hover:bg-red-600 transition"
          >
            Upload Image
          </button>

        </form>

      </div>

    </div>

  );

}

export default Profile;
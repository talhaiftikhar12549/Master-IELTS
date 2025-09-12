import { useState, useEffect } from "react";
import api from "../../services/api";
import { useAuth } from "../../context/AuthContext";
import { FaEnvelope, FaUser } from "react-icons/fa6";
import { FaCheckCircle, FaShieldAlt, FaTimesCircle } from "react-icons/fa";

const MyProfile = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const {user} = useAuth()

  const getUser = async () => {
    try {
      const res = await api.get(`/users/${user.id}`);
      setUserData(res.data);
      
    } catch (err) {
      console.error("Failed to fetch user profile:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getUser();
  }, [user.id]);

    const getInitials = (name) => {
    if (!name) return "?";
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  if (loading) {
    return (
      <div className="max-w-3xl mx-auto p-6 bg-white mt-10 rounded shadow-sm">
        <h2 className="text-2xl font-bold mb-6">My Profile</h2>
        <p>Loading profile...</p>
      </div>
    );
  }

  if (!userData) {
    return (
      <div className="max-w-3xl mx-auto p-6 bg-white mt-10 rounded shadow-sm">
        <h2 className="text-2xl font-bold mb-6">My Profile</h2>
        <p className="text-red-500">Unable to load profile data.</p>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto p-8 bg-white mt-10 rounded-2xl shadow-lg">
      {/* Header with Avatar */}
      <div className="flex items-center gap-6 mb-8">
        <div className="w-20 h-20 flex items-center justify-center rounded-full bg-blue-100 text-blue-700 text-2xl font-bold shadow-inner">
          {getInitials(userData.name)}
        </div>
        <div>
          <h2 className="text-3xl font-bold text-gray-800">{userData.name}</h2>
          <p className="text-gray-500">{userData.email}</p>
        </div>
      </div>

      {/* Profile Details */}
      <div className="space-y-4 divide-y divide-gray-200">
        <div className="flex items-center gap-3 pb-4">
          <FaUser className="text-blue-600 w-5 h-5" />
          <span className="font-medium text-gray-700">Name:</span>
          <span className="text-gray-900">{userData.name}</span>
        </div>

        <div className="flex items-center gap-3 py-4">
          <FaEnvelope className="text-purple-600 w-5 h-5" />
          <span className="font-medium text-gray-700">Email:</span>
          <span className="text-gray-900">{userData.email}</span>
        </div>

        <div className="flex items-center gap-3 py-4">
          <FaShieldAlt className="text-green-600 w-5 h-5" />
          <span className="font-medium text-gray-700">Role:</span>
          <span
            className={`px-3 py-1 rounded-full text-sm font-semibold ${
              userData.role === "admin"
                ? "bg-red-100 text-red-700"
                : userData.role === "instructor"
                ? "bg-green-100 text-green-700"
                : "bg-blue-100 text-blue-700"
            }`}
          >
            {userData.role}
          </span>
        </div>

        <div className="flex items-center gap-3 pt-4">
          {userData.hasPaid ? (
            <>
              <FaCheckCircle className="text-green-600 w-5 h-5" />
              <span className="font-medium text-gray-700">Has Paid:</span>
              <span className="text-green-700 font-semibold">Yes</span>
            </>
          ) : (
            <>
              <FaTimesCircle className="text-red-600 w-5 h-5" />
              <span className="font-medium text-gray-700">Has Paid:</span>
              <span className="text-red-700 font-semibold">No</span>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
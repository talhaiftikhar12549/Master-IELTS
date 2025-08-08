import { useState } from "react";
import { useAuth } from "../../context/AuthContext";

const Login = () => {
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await login({
        email: email,
        password: password,
      });

    } catch (error) {
      setErrors({ submit: error.response?.data?.error || "An error occurred" });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-blue-400 to-blue-100 flex items-center justify-center px-4">
      <div className="bg-white shadow-xl rounded-lg p-8 max-w-md w-full animate-fade-in">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Welcome Back
        </h2>

        {errors.submit && (
          <div className="mb-4 p-2 bg-red-100 text-red-700 rounded">
            {errors.submit}
          </div>
        )}

        <form className="space-y-5" onSubmit={handleSubmit}>
          <div>
            <label className="block text-gray-600 mb-1">Email</label>
            <input
              type="email"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#ffd5a9] focus:outline-none"
              placeholder="you@example.com"
              onChange={(e) => setEmail(e.target.value)}
            />

            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email}</p>
            )}
          </div>
          <div>
            <label className="block text-gray-600 mb-1">Password</label>
            <input
              type="password"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#ffd5a9] focus:outline-none"
              placeholder="••••••••"
              onChange={(e) => setPassword(e.target.value)}
            />

            {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password}</p>
            )}
          </div>
          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full flex items-center text-[#ffffff] justify-center border border-blue-500 bg-blue-500 ${
              isSubmitting
                ? "opacity-60 cursor-not-allowed"
                : "hover:bg-blue-600 hover:border cursor-pointer border-blue-600 hover:border-blue-600"
            } text-white font-semibold py-2 rounded-md transition duration-300`}
          >
            {isSubmitting ? (
              <>
                <svg
                  className="animate-spin h-5 w-5 mr-2 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v8z"
                  ></path>
                </svg>
                Logging in...
              </>
            ) : (
              "Log In"
            )}
          </button>
          <p className="text-center text-sm text-gray-500">
            Don't have an account? <a href="/register" className="text-blue-500 hover:underline">Register</a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;

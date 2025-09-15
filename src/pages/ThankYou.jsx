import { Helmet } from "react-helmet";
import { IoCheckmarkCircleOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

export default function ThankYou() {
  const navigate = useNavigate();

  return (
    <div className="max-w-[1280px] lg:px-[40px] xl:px-0 px-[16px] mx-auto flex flex-col items-center pt-20 pb-[200px]">
      <Helmet>
        <title>Thank You</title>
      </Helmet>

      {/* HERO SECTION */}
      <div className="w-full flex flex-col text-center py-10 space-y-2">
        <IoCheckmarkCircleOutline className="text-green-500 text-7xl mx-auto" />
        <h1 className="font-bold text-[40px] text-green-600">
          Message Sent Successfully!
        </h1>
        <p className="text-gray-600">
          Thank you for reaching out to us. We’ve received your message and will
          get back to you shortly.
        </p>
      </div>

      {/* SUCCESS CARD */}
      <div className="w-full flex justify-center items-center bg-white shadow-xl rounded-md max-w-[700px] h-[380px]">
        <div className="w-full px-6 sm:px-10 py-10 flex flex-col items-center text-center space-y-6">
          <h2 className="font-bold text-2xl">📩 We Appreciate Your Contact!</h2>
          <p className="text-gray-600 max-w-[500px]">
            Our team will review your message and respond as soon as possible.
            In the meantime, feel free to explore more about us or head back to
            the homepage.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mt-6">
            <button
              onClick={() => navigate("/")}
              className="px-6 py-3 bg-blue-600 cursor-pointer text-white rounded-md shadow hover:bg-blue-700 transition"
            >
              Back to Home
            </button>
            <button
              onClick={() => navigate("/dashboard")}
              className="px-6 py-3 cursor-pointer bg-gray-200 text-gray-700 rounded-md shadow hover:bg-gray-300 transition"
            >
              View Courses
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

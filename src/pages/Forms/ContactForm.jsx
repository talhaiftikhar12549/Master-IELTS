import { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";


// Validation schema using Yup
const validationSchema = Yup.object({
  firstName: Yup.string().required("First name is required"),
  lastName: Yup.string().required("Last name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  message: Yup.string().required("Message is required"),
});

const ContactForm = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false); // loader state

  return (
    <Formik
      initialValues={{
        firstName: "",
        lastName: "",
        email: "",
        message: "",
      }}
      validationSchema={validationSchema}
      onSubmit={async (values, { resetForm }) => {
        setLoading(true);
        try {
          await api.post("/contact/form", values);
          resetForm();
          navigate("/thank-you");
        } catch (error) {
          console.error("Error submitting form:", error);
          alert("Something went wrong. Please try again later.");
        } finally {
          setLoading(false);
        }
      }}
    >
      {({ handleSubmit }) => (
        <Form onSubmit={handleSubmit} className="form-container w-full ">
          {/* First & Last Name */}
          <div className="flex flex-col lg:flex-row space-x-0 lg:space-x-5 space-y-5 lg:space-y-0">
            <div className="flex w-full flex-col">
              <label className="font-semibold">First Name</label>
              <Field
                type="text"
                name="firstName"
                className="border-b border-black bg-[#ffffff] py-1 px-2"
              />
              <ErrorMessage
                name="firstName"
                component="div"
                className="error text-xs text-red-500"
              />
            </div>

            <div className="flex w-full flex-col">
              <label className="font-semibold">Last Name</label>
              <Field
                type="text"
                name="lastName"
                className="border-b border-black py-1 px-2"
              />
              <ErrorMessage
                name="lastName"
                component="div"
                className="error text-xs text-red-500"
              />
            </div>
          </div>

          {/* Email */}
          <div className="flex flex-col mt-10">
            <label className="font-semibold">Email</label>
            <Field
              type="email"
              name="email"
              className="border-b border-black py-1 px-2"
            />
            <ErrorMessage
              name="email"
              component="div"
              className="error text-xs text-red-500"
            />
          </div>

          {/* Message */}
          <div className="flex flex-col mt-10">
            <label className="font-semibold">Message</label>
            <Field
              as="textarea"
              name="message"
              className="border-b border-black py-1 px-2"
            />
            <ErrorMessage
              name="message"
              component="div"
              className="error text-xs text-red-500"
            />
          </div>

          {/* Submit Button */}
          <div className="flex justify-end my-5">
            <button
              type="submit"
              className="bg-blue-500 py-[15px] px-[30px] rounded-md text-white font-semibold hover:bg-blue-600 border-[2px] border-blue-500 hover:border-blue-600 transition duration-700 cursor-pointer flex items-center justify-center gap-2"
              disabled={loading}
            >
              {loading && (
                <svg
                  className="animate-spin h-5 w-5 text-white"
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
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v8H4z"
                  />
                </svg>
              )}
              {loading ? "Sending..." : "Send Message"}
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default ContactForm;

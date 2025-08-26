import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import contactImage from "../../../assets/Home/laptop.jpg";

const validationSchema = Yup.object({
  name: Yup.string().required("Name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  phone: Yup.string()
    .matches(/^[0-9]+$/, "Phone number must be digits only")
    .min(10, "Phone number too short")
    .required("Phone number is required"),
  message: Yup.string().required("Message is required"),
});

const AnyQuestions = () => {
  return (
    <div className="w-full flex flex-col py-16 md:py-20 items-center justify-center bg-[#F3F8FF] px-4">
      {/* Heading */}
      <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-[48px] font-semibold mb-8 md:mb-10 text-center leading-tight">
        <span className="text-[#0554F2]">Any</span> Questions?
      </h2>

      {/* Form & Image Container */}
      <div className="w-full md:w-5/6 lg:w-2/3 flex flex-col md:flex-row items-center gap-8 md:gap-5">
        {/* Left Side - Form */}
        <div className="w-full md:w-1/2 bg-white p-6 md:p-8 rounded-xl shadow-md">
          <Formik
            initialValues={{ name: "", email: "", phone: "", message: "" }}
            validationSchema={validationSchema}
            onSubmit={(values, { resetForm }) => {
              console.log("Form submitted:", values);
              resetForm();
            }}
          >
            {({ isSubmitting }) => (
              <Form className="flex flex-col gap-5">
                {/* Name */}
                <div>
                  <Field
                    type="text"
                    name="name"
                    placeholder="Your Name"
                    className="w-full border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0554F2]"
                  />
                  <ErrorMessage
                    name="name"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>

                {/* Email */}
                <div>
                  <Field
                    type="email"
                    name="email"
                    placeholder="Your Email"
                    className="w-full border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0554F2]"
                  />
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>

                {/* Phone */}
                <div>
                  <Field
                    type="text"
                    name="phone"
                    placeholder="Your Phone Number"
                    className="w-full border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0554F2]"
                  />
                  <ErrorMessage
                    name="phone"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>

                {/* Message */}
                <div>
                  <Field
                    as="textarea"
                    name="message"
                    placeholder="Your Message"
                    rows="4"
                    className="w-full border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0554F2]"
                  />
                  <ErrorMessage
                    name="message"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-[#0554F2] text-white font-semibold py-3 rounded-lg hover:bg-blue-700 transition"
                >
                  {isSubmitting ? "Sending..." : "Send Message"}
                </button>
              </Form>
            )}
          </Formik>
        </div>

        {/* Right Side - Image */}
        <div className="w-full md:w-1/2 flex justify-center">
          <img
            src={contactImage}
            alt="Contact Us"
            className="w-full h-auto rounded-xl shadow-lg object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default AnyQuestions;

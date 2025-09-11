
import contactImage from "../../../assets/Home/laptop.jpg";
import ContactForm from "../../../pages/Forms/ContactForm";

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
         <ContactForm />
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

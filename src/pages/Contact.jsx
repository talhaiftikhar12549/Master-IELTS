import { IoMdCall, IoMdMail } from "react-icons/io";
import { Helmet } from "react-helmet";
import ContactForm from "./Forms/ContactForm";

const Contact = () => {
  return (
    <div className="max-w-[1280px] lg:px-[40px] xl:px-0 px-[16px] mx-auto flex flex-col items-center pt-20 pb-[200px] ">
      <Helmet>
        <title>Contact Us</title>
      </Helmet>
      
      {/* HERO SECTION  */}
      <div className="w-full flex flex-col text-center py-10 space-y-2">
        <h1 className="font-bold text-[40px]">Contact Us</h1>
        <p>Any question or remarks? Just write us a message!</p>
      </div>

      {/* CONTACT FORM CONTAINER  */}
      <div className="w-full flex justify-center h-[580px] items-center bg-white shadow-xl rounded-md">
        <div className="hidden md:block w-[40%] h-full bg-gradient-to-br from-blue-500 via-blue-400 to-blue-400 py-10 px-8 xl:px-10 rounded-md relative">
          {/* <img
            className="absolute bottom-0 left-0 z-2 rotate-180"
            src={cardPattren}
            alt=""
          /> */}

          <h3 className="!font-bold !text-2xl">Contact Information</h3>

          <p className="mt-2">Say something to start a chat!</p>

          <div className="mt-10 space-y-3">
            <div className="flex items-center space-x-2">
              <IoMdMail className="text-lg" />
              <p className="break-words texw whitespace-normal max-w-full">
                master.ieltsonline@gmail.com
              </p>
            </div>

             <div className="flex items-center space-x-2">
              <IoMdCall className="text-lg" />
              <p className="break-words whitespace-normal max-w-full">
                +447794886554
              </p>
            </div>
          </div>
        </div>

        <div className="w-[100%] md:w-[60%] px-5 sm:px-10  py-5 sm:py-10 flex items-center">
          <ContactForm />
        </div>
      </div>
    </div>
  );
};

export default Contact;

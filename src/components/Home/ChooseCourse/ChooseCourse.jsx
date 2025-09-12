import { useState } from "react";
import PaymentCard from "./PaymentCard";
import api from "../../../services/api";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ChooseCourse = ({ chooseCourseRef }) => {
  const [paymentCardData, setPaymentCardData] = useState([]);

  const location = useLocation()

  const queryParams = new URLSearchParams(location.search);

   const handleScroll = () => {
    chooseCourseRef.current?.scrollIntoView({ behavior: "smooth" });
  };


  useEffect(() => {
      const section = queryParams.get("sec");
      if (section === "card") {
        handleScroll()
      } 
    }, [location.search]);


  const FetchPlans = async () => {
    try {
      const res = await api.get("/plans");
      setPaymentCardData(res.data);
    } catch (error) {
      console.log("Plans failed to fetch", error);
    }
  };

  useEffect(() => {
    FetchPlans();
  }, []);

  return (
    <div
      ref={chooseCourseRef}
      id="choose-course"
      className="w-full flex flex-col py-16 px-4 md:px-8 items-center justify-center bg-[#F3F8FF]"
    >
      <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-[48px] font-semibold text-center">
        <span className="text-[#0554F2]">Choose</span> Your Course
      </h2>

      <div
        className="
          w-full sm:w-4/5 lg:w-2/3 
          flex flex-col md:flex-row 
          justify-center items-center 
          gap-6 mt-8
        "
      >
        {paymentCardData.map((card) => (
          <PaymentCard
            key={card._id}
            id={card._id}
            title={card.title}
            actualPrice={card.actualPrice}
            discPrice={card.discPrice}
            offer={card.offer}
            desc={card.desc}
            icon={card.icon}
          />
        ))}
      </div>
    </div>
  );
};

export default ChooseCourse;

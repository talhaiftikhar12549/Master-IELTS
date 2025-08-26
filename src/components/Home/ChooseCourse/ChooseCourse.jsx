import PaymentCard from "./PaymentCard";
import { IoIosCheckmarkCircleOutline } from "react-icons/io";

const paymentCardData = [
  {
    title: "Premium",
    actualPrice: "$40",
    discPrice: "$30",
    offer: "Special Offer",
    desc: [
      "All features from Standard",
      "Personal Progress tracker",
      "Weekly updated blogs",
      "Access to Q and A section",
      "Access to Community Page",
      "Assignments and Personal Feedback from Expert tutor",
    ],
    icon: <IoIosCheckmarkCircleOutline />,
  },

  {
    title: "Premium",
    actualPrice: "$35",
    discPrice: "",
    offer: "",
    desc: [
      "Full Access to video content",
      "Mock exams",
      " Personal Progress tracker",
      "Quizzes",
      "Weekly updated blogs",
    ],
    icon: <IoIosCheckmarkCircleOutline />,
  },
];

const ChooseCourse = () => {
  return (
    <div className="w-full flex flex-col py-20 items-center justify-center bg-[#F3F8FF]">
      <h2 className="text-[48px] font-semibold">
        <span className="text-[#0554F2]">Choose</span> Your Course
      </h2>

      <div className="w-2/3 flex justify-center items-start space-x-5 ">
        {paymentCardData.map((card, index) => {
          return (
            <PaymentCard
              title={card.title}
              actualPrice={card.actualPrice}
              discPrice={card.discPrice}
              offer={card.offer}
              desc={card.desc}
              icon={card.icon}
            />
          );
        })}
      </div>
    </div>
  );
};

export default ChooseCourse;

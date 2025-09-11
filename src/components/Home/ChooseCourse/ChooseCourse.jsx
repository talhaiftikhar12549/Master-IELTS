import PaymentCard from "./PaymentCard";
import { IoIosCheckmarkCircleOutline } from "react-icons/io";


const paymentCardData = [
  {
    id: 1,
    title: "Premium",
    actualPrice: "40",
    discPrice: "30",
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
    id: 2,
    title: "Standard",
    actualPrice: "35",
    discPrice: "",
    offer: "",
    desc: [
      "Full Access to video content",
      "Mock exams",
      "Personal Progress tracker",
      "Quizzes",
      "Weekly updated blogs",
    ],
    icon: <IoIosCheckmarkCircleOutline />,
  },
];

const ChooseCourse = ({chooseCourseRef}) => {
  return (
    <div ref={chooseCourseRef}  id="choose-course" className="w-full flex flex-col py-16 px-4 md:px-8 items-center justify-center bg-[#F3F8FF]">
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
            key={card.id}
            id={card.id}
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

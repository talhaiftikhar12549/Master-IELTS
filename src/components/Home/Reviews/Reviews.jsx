import { RiDoubleQuotesR } from "react-icons/ri";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import ReviewCard from "./ReviewCard";

const cardsData = [
  {
    id: 1,
    icon: <RiDoubleQuotesR />,
    name: "Omar",
    band: "8.5",
    desc: "Enrolling in the IELTS self-preparation course was a game-changer for me. As a busy professional, finding time to study seemed impossible, but this course allowed me to adapt my study schedule to fit my hectic routine seamlessly",
  },
  {
    id: 2,
    icon: <RiDoubleQuotesR />,
    name: "Hannah",
    band: "8.0",
    desc: "Thanks to this course, I achieved a band 9 score, exceeding my expectations and opening doors to new opportunities. I highly recommend it to anyone seeking success in their IELTS journey",
  },
  {
    id: 3,
    icon: <RiDoubleQuotesR />,
    name: "Oleksi",
    band: "8.5",
    desc: "The comprehensive materials and flexible learning approach empowered me to focus on my weaknesses and hone my skills at my own pace",
  },

   {
    id: 4,
    icon: <RiDoubleQuotesR />,
    name: "Omar",
    band: "8.5",
    desc: "Enrolling in the IELTS self-preparation course was a game-changer for me. As a busy professional, finding time to study seemed impossible, but this course allowed me to adapt my study schedule to fit my hectic routine seamlessly",
  },

   {
    id: 5,
    icon: <RiDoubleQuotesR />,
    name: "Hannah",
    band: "8.0",
    desc: "Thanks to this course, I achieved a band 9 score, exceeding my expectations and opening doors to new opportunities. I highly recommend it to anyone seeking success in their IELTS journey",
  },
];

const Reviews = () => {
  return (
    <div className="w-full flex flex-col py-20 items-center justify-center bg-[#DAE8FD]">
      <h2 className="text-2xl lg:text-[48px] font-semibold text-center">
        <span className="text-[#0554F2]">What</span> Our Students Say
      </h2>

      <div className="w-10/12 xl:w-10/12 2xl:w-2/3 mt-10 relative">
        <Swiper
          modules={[Navigation, Pagination]}
          spaceBetween={20}
          slidesPerView={3}
          navigation
          pagination={{ clickable: true }}
          breakpoints={{
            0: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
        >
          {cardsData.map((card) => (
            <SwiperSlide key={card.id}>
              <ReviewCard
                icon={card.icon}
                name={card.name}
                desc={card.desc}
                band={card.band}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Custom CSS for arrows */}
      <style jsx>{`
        .swiper-button-next,
        .swiper-button-prev {
          color: white !important;
          width: 25px !important;
          height: 25px !important;
        }
        .swiper-button-next::after,
        .swiper-button-prev::after {
          font-size: 20px !important;
        }
      `}</style>
    </div>
  );
};

export default Reviews;

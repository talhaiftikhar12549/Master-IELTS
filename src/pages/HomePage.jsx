import WhoFor from "../components/Home/WhoFor/WhoFor";
import Roadmap from "../components/Home/Roadmap/Roadmap";
import ChooseCourse from "../components/Home/ChooseCourse/ChooseCourse";
import WhyPopular from "../components/Home/WhyPopular/WhyPopular";
import Reviews from "../components/Home/Reviews/Reviews";
import AnyQuestions from "../components/Home/AnyQuestions/AnyQuestions";
import FAQs from "../components/Home/FAQs/FAQs";
import LessonOverview from "../components/Home/LessonCards/LessonOverview";
import HomeHero from "../components/HomeHero";
import { useOutletContext } from "react-router-dom";

export default function Homepage() {

  const chooseCourseRef = useOutletContext()  

  return (
    <>
      <HomeHero chooseCourseRef={chooseCourseRef} />

      {/* lesson description section  */}
      <LessonOverview />

      {/* who is it for section  */}
      <WhoFor chooseCourseRef={chooseCourseRef} />

      {/*Your roadmap to a 7+ IELTS Band */}
      <Roadmap />

      {/*Why IELTS is the most popular English proficiency test */}
      <WhyPopular />

      {/*Choose Your Course */}
      <ChooseCourse chooseCourseRef={chooseCourseRef} />

      {/* REVIEWS  */}
      <Reviews />

      {/* ANY QUESTIONS FORM  */}
      <AnyQuestions />

      {/* FAQS  */}
      <FAQs />
    </>
  );
}

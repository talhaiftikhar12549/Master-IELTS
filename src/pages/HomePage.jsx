import LessonCard from "../components/Home/LessonCards/LessonCard";
import HomeHero from "../components/HomeHero";
import students from "../assets/Home/students.jpg";
import writing from "../assets/Home/writing.jpg";
import notes from "../assets/Home/notes.jpg";
import laptop from "../assets/Home/laptop.jpg";
import WhoFor from "../components/Home/WhoFor/WhoFor";
import Roadmap from "../components/Home/Roadmap/Roadmap";
import ChooseCourse from "../components/Home/ChooseCourse/ChooseCourse";

export default function Homepage() {
  return (
    <>
      <HomeHero />

      {/* lesson description section  */}
      <div className="w-full flex justify-center p-20 space-x-5">
        <LessonCard
          imageURL={writing}
          title={"Over 150+ comprehensive lessons"}
          desc={[
            "Improve your grammar for better accuracy and fluency",
            "Understand grading criteria & IELTS question formats",
            "Learn techniques to score high in all four sections",
          ]}
        />

        <LessonCard
          imageURL={notes}
          title={"End-of-lesson quizzes"}
          desc={[
            "Each lesson comes with quizzes",
            "Quizes help you review, strengthen your concepts, and make learning more effective",
          ]}
        />

        <LessonCard
          imageURL={laptop}
          title={"Our Full Support"}
          desc={[
            "An expert tutor is available to answer all your lesson related questions within 48 hours.",
          ]}
        />
      </div>

      {/* who is it for section  */}
        <WhoFor />

        {/*Your roadmap to a 7+ IELTS Band */}
        <Roadmap />

         {/*Choose Your Course */}
        <ChooseCourse />

    </>
  );
}

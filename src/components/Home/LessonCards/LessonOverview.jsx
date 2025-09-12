import LessonCard from "./LessonCard";
import writing from "../../../assets/Home/writing.jpg";
import notes from "../../../assets/Home/notes.jpg";
import laptop from "../../../assets/Home/laptop.jpg";

const LessonOverview = () => {
  return (
    <div className="w-full flex justify-center px-6 py-20">
      <div className="xl:w-11/12 2xl:w-2/3 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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
            "Quizzes help you review, strengthen your concepts, and make learning more effective",
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
    </div>
  );
};

export default LessonOverview;

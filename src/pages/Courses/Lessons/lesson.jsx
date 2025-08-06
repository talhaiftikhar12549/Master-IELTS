import { NavLink, useParams } from "react-router-dom";
import { courseData } from "../CoursePage";
import { FaAngleLeft } from "react-icons/fa";

export const Lesson = () => {
  const { coursePage, lessonSlug } = useParams();

  const topics = courseData[coursePage] || [];

  let lesson = null;
  for (const topic of topics) {
    lesson = topic.lessons.find((l) => l.slug === lessonSlug);
    if (lesson) break;
  }

  if (!lesson) {
    return <p className="text-red-500">Lesson not found.</p>;
  }

  return (
    <div className="p-6 bg-white shadow rounded">
        <NavLink to={`/course/${coursePage}`} className="w-fit py-2 px-5 rounded-md bg-blue-500 flex items-center justify-center text-white capitalize">
            <FaAngleLeft className="mr-2" /> {coursePage}
            </NavLink>
      <h1 className="text-2xl font-bold my-4">{lesson.title}</h1>
      <p className="text-gray-600">Type: {lesson.type}</p>
      <p className="text-gray-600">Course: {coursePage}</p>

      {lesson.type === "video" && (
        <div className="mt-6 aspect-video w-full pr-5">
          <iframe
           className="w-full h-full rounded"
            src="https://www.youtube.com/embed/w_tIn3BGGPM?si=dHzaq0bIrS6ZZZWR"
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          ></iframe>
        </div>
      )}
    </div>
  );
};

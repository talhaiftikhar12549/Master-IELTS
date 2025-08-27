import { useEffect, useState } from "react";
import { NavLink, useParams, useOutletContext } from "react-router-dom";
import { FaAngleLeft } from "react-icons/fa";
import LessonComments from "../../../components/Courses/Lessons/LessonComments";
import api from "../../../services/api";

export const Lesson = () => {
  const { courseSlug } = useParams();
  const [activeTab, setActiveTab] = useState("lesson");

  const { desiredLesson, singleCourseID } = useOutletContext();

  let lesson = desiredLesson;

  console.log(desiredLesson);

  const getTopics = async () => {
    try {
      // const res = await api.get(`/lessons/${singleLesson._id}`);
      // console.log("getting single topic",res.data);
    } catch (err) {
      console.log("some error occured while getting Topics data", err);
    }
  };

  // /:courseId/:lessonId/:topicId

  //   useEffect(() => {
  //   getTopics();
  // }, [desiredLesson]);

  if (!lesson) {
    return <p className="text-blue-500">Loading...</p>;
  }

  return (
    <div className="p-6 bg-white shadow rounded">
      <NavLink
        to={`/course/${courseSlug}`}
        className="w-fit py-2 px-5 mb-4 rounded-md bg-blue-500 flex items-center justify-center text-white capitalize"
      >
        <FaAngleLeft className="mr-2" /> {courseSlug}
      </NavLink>

      {/* Tabs */}
      <div className="mb-6 border-b border-gray-200">
        <nav className="flex space-x-6">
          <button
            className={`py-2 px-4 text-sm font-medium cursor-pointer ${
              activeTab === "lesson"
                ? "border-b-2 border-blue-500 text-blue-600"
                : "text-gray-500 hover:text-blue-600"
            }`}
            onClick={() => setActiveTab("lesson")}
          >
            Lesson
          </button>
          <button
            className={`py-2 px-4 text-sm font-medium cursor-pointer ${
              activeTab === "qa"
                ? "border-b-2 border-blue-500 text-blue-600"
                : "text-gray-500 hover:text-blue-600"
            }`}
            onClick={() => setActiveTab("qa")}
          >
            Q & A
          </button>
        </nav>
      </div>

      {/* Tab Content */}
      {activeTab === "lesson" && (
        <div>
          <h1 className="text-2xl font-bold mb-4">{lesson.title}</h1>
          <p className="text-gray-600 mb-2">Type: {lesson.type}</p>
          <p className="text-gray-600 mb-4">Course: {courseSlug}</p>

          {lesson.videoUrl !== "" && (
            <div className="aspect-video w-full">
              <iframe
                className="w-full h-full rounded"
                src={lesson.videoUrl}
                title="YouTube video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              ></iframe>
            </div>
          )}

          <div className="mt-5">
            <h2 className="text-xl font-bold mb-2">Lesson Description:</h2>
           {lesson.content}
          </div>
        </div>
      )}

      {activeTab === "qa" && (
        <div>
          <LessonComments />
        </div>
      )}
    </div>
  );
};

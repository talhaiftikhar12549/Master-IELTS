import { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import { FaAngleLeft } from "react-icons/fa";
import LessonComments from "../../../components/Courses/Lessons/LessonComments";
import api from "../../../services/api";

export const Lesson = () => {
  const { courseSlug, lessonSlug } = useParams();
  const [activeTab, setActiveTab] = useState("lesson");
  const [singleLessonData, setSingleLessonData] = useState([]);

  const getLesson = async () => {
    // We are doing this to get the lesson data even when we reload the page
    const res = await api.get(`/lessons`);
    const filteredLessonData = res.data.find((lesson) => {
      return (
        lesson.title
          .toString()
          .toLowerCase()
          .trim()
          .replace(/\s+/g, "-")
          .replace(/[^\w\-]+/g, "")
          .replace(/\-\-+/g, "-") === lessonSlug
      );
    });

    setSingleLessonData(filteredLessonData);
    console.log(filteredLessonData);
    
  };


  useEffect(()=> {
    getLesson();
  }, [])

  if (!singleLessonData) {
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
          <h1 className="text-2xl font-bold mb-4">{singleLessonData.title}</h1>
          <p className="text-gray-600 mb-2">Type: {singleLessonData.type}</p>
          <p className="text-gray-600 mb-4">Course: {courseSlug}</p>

          {singleLessonData.videoUrl !== "" && (
            <div className="aspect-video w-full">
              <iframe
                className="w-full h-full rounded"
                src={singleLessonData.videoUrl}
                title="YouTube video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              ></iframe>
            </div>
          )}

          <div className="mt-5">
            <h2 className="text-xl font-bold mb-2">Lesson Description:</h2>
            <div
              dangerouslySetInnerHTML={{ __html: singleLessonData.content }}
            />
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

import { NavLink, Outlet, useParams } from "react-router-dom";
import api from "../services/api";
import { useEffect, useState } from "react";
import { FaChevronDown } from "react-icons/fa6";
import Navbar from "../components/NavBar";

export const CourseLayout = () => {
  const { courseSlug, lessonSlug } = useParams();
  const [coursesData, setCoursesData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [openIndex, setOpenIndex] = useState(null);

  const [completeCourseData, setCompleteCourseData] = useState([]);

  const getCourses = async () => {
    const res = await api.get("/courses");
    setCoursesData(res.data);
  };

  useEffect(() => {
    getCourses();
  }, []);

  const getSelectedCourse = async () => {
    setLoading(true);
    const desiredCourse = coursesData?.find(
      (c) => courseSlug === c.title.toLowerCase()
    );

    if (desiredCourse) {
      const res = await api.get(`/courses/${desiredCourse._id}`);
      setCompleteCourseData(res.data);
      setLoading(false);
    }
  };

  useEffect(() => {
    getSelectedCourse();
  }, [coursesData, courseSlug]);

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <>
    <Navbar />
    <div className="w-full min-h-screen bg-gray-50 flex justify-center mt-10 py-20">
      <div className="w-11/12 max-w-7xl flex gap-8">
        {/* Main Content */}
        <div className="flex-1 bg-white rounded-xl shadow-md p-6">
          <Outlet context={completeCourseData} />
        </div>

        {/* Popular Courses Sidebar */}
        <aside className="w-80 bg-white rounded-xl shadow-md p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4 border-b pb-2">
            {lessonSlug ? "Topics List" : "Popular Courses"}
          </h2>

          {!lessonSlug ? (
            <div className="space-y-4">
              {coursesData?.map((course) => (
                <NavLink
                  key={course._id}
                  to={`/course/${course.title.toLowerCase()}`}
                  className={({ isActive }) =>
                    `block p-4 rounded-lg shadow-sm border transition duration-200 
                  ${
                    isActive
                      ? "bg-blue-500 text-white border-blue-500"
                      : "bg-gray-50 hover:bg-gray-100 text-gray-800 border-gray-200"
                  }`
                  }
                >
                  <p className="capitalize font-medium">{course.title}</p>
                </NavLink>
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              {/* Topics */}
              <div className="w-full">
                {loading ? (
                  <div>Loading...</div>
                ) : (
                  <div className="space-y-4">
                    {completeCourseData.length !== 0 &&
                      completeCourseData.topics.map((topic, index) => (
                        <div
                          key={index}
                          className="border rounded-lg shadow-sm overflow-hidden"
                        >
                          {/* Accordion Header */}
                          <button
                            className="w-full flex justify-between items-center px-5 py-4 bg-gray-50 hover:bg-gray-100 text-gray-700 font-medium transition"
                            onClick={() => toggleAccordion(index)}
                          >
                            {topic.title}
                            <FaChevronDown
                              className={`transition-transform duration-300 ${
                                openIndex === index ? "rotate-180" : ""
                              }`}
                            />
                          </button>

                          {/* Lessons List */}
                          {openIndex === index && (
                            <div className="px-6 py-4 bg-white space-y-3 animate-fadeIn">
                              {topic.lessons.map((lesson) => {
                                const slugify = (text) =>
                                  text
                                    .toString()
                                    .toLowerCase()
                                    .trim()
                                    .replace(/\s+/g, "-")
                                    .replace(/[^\w\-]+/g, "")
                                    .replace(/\-\-+/g, "-");

                                return (
                                  <NavLink
                                    onClick={() => setSingleLesson(lesson)}
                                    to={`${courseSlug}/${slugify(lesson.title)}`}
                                    key={lesson._id}
                                    className="block px-3 py-2 rounded-md text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition"
                                  >
                                    {lesson.title}
                                  </NavLink>
                                );
                              })}
                            </div>
                          )}
                        </div>
                      ))}
                  </div>
                )}
              </div>
            </div>
          )}
        </aside>
      </div>
    </div>
    </>
  );
};
